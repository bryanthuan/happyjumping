; (function (window) {

    'use strict';

    var getParameterByName = function (name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
            results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    var popjam = {};

    popjam.version = '2.0.0';

    popjam.utils = {
        HTTPMethod: {
            'GET': 'get',
            'POST': 'post',
            'DELETE': 'delete'
        }
    };

    popjam.config = {
        name: 'popjam-api',
        version: '2.0.0', // backwards compatible
        richId: getParameterByName('RichId'),
        userId: getParameterByName('UserID'),
        username: '',
        appVersion: getParameterByName('AppVersion'),
        sessionStartTimestamp: getParameterByName('sessionStartTimestamp'),
        isDebug: getParameterByName('isDebug') === '1',
        environment: getParameterByName('env').toLowerCase(),
        parseId: getParameterByName('parseId'),
        parseKey: getParameterByName('parseKey'),
        userAgent: navigator.userAgent.substring(0, Math.min(250, navigator.userAgent.length))
    };

    window.popjam = popjam;

})(window);


(function (popjam) {

    'use strict';

    var _isAvailable = false;
    var _jsBridge = null;
    var _config = popjam.config;
    var isMobile = null;
    window.brigde = null;

    var createMockBridge = function () {
        var mockBridge = {

            callHandler: function (name, params, callback) {
                var fn = this[name];
                if (typeof fn === 'function') {
                    fn(params, callback);
                }
            },

            getUsernameFor: function (userId, callback) {
                console.log('Requesting Username for: ' + userId);
                callback('mock-username');
            },

            shareToFeed: function (image) {
                console.log('Sharing to feed');
            },


            challengeShareToFeed: function (image) {
                console.log('Sharing challenge to feed');
            },

            copyLinkAction: function () {
                console.log('Copy Link Action fired');
            },

            eventHandler: function (data) {
                console.log('Call event ' + JSON.stringify(data));
            },

            getGiphyID: function (id) {
                console.log('selected giphy id: ' + id);
            },

            showProfileForUserWithId: function (userId) {
                console.log('requesting profile for user with id %s', userId);
            },

            requestProfileImage: function (userId, callback) {
                console.log('requesting profile image for user with id %s', userId);
                callback('http://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm&f=y&userId' + userId);
            },

            requestProfileImageForUsers: function (userIds, callback) {
                console.log('sending \'requestProfileImageForUsers\' request via jdBridge with payload: %s', userIds);
                var profileImageUrls = userIds.map(function (userId) {
                    return 'http://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm&f=y&userId' + userId;
                });

                // null first URL to be able to test missing images
                if (profileImageUrls.length > 0) {
                    profileImageUrls[0] = null;
                }

                callback(JSON.stringify(profileImageUrls));
            },

            awardBadgeToCurrentUser: function (badge, callback) {
                console.log('sending \'awardBadgeToCurrentUser\' request via jsBridge with payload: %s', JSON.stringify(badge));
                callback();
            },

            requestBadgeData: function (badge, callback) {
                console.log('sending \'requestBadgeData\' request via jsBridge with payload: %s', JSON.stringify(badge));
                var badgeData = {
                    badges: [
                        {
                            badgeId: badge.badgeId,
                            badgeGroupId: badge.badgeGroupId,
                            imgUrl: "http://intjuc.mindcandy.com/badges/mindcandy/score_apps_quiz/2015/5/8/1.png",
                            level: 1,
                            requiredPoints: 5
                        },
                        {
                            badgeId: badge.badgeId,
                            badgeGroupId: badge.badgeGroupId,
                            imgUrl: "http://intjuc.mindcandy.com/badges/mindcandy/score_apps_quiz/2015/5/8/2.png",
                            level: 2,
                            requiredPoints: 10
                        },
                        {
                            badgeId: badge.badgeId,
                            badgeGroupId: badge.badgeGroupId,
                            imgUrl: "http://intjuc.mindcandy.com/badges/mindcandy/score_apps_quiz/2015/5/8/3.png",
                            level: 3,
                            requiredPoints: 15
                        },
                    ],
                    currentLevel: 1
                };
                callback(JSON.stringify(badgeData));
            }
        };

        return mockBridge;
    };

    var checkIfInitialised = function () {
        if (!_isAvailable) {
            throw new Error('Trying to use PopJam API Method when it is not available, has "init" been called?');
        }
    };

    function _bridgeGetUsernameFor(userId, callback) {
        _jsBridge.callHandler('getUsernameFor', userId, callback);
    }

    popjam.init = function (successCallback, errorCallback) {

        isMobile = {
            Android: function () {
                return navigator.userAgent.match(/Android/i);
            },
            iOS: function () {
                return navigator.userAgent.match(/iPhone|iPad|iPod/i);
            },
            any: function () {
                return (isMobile.Android() || isMobile.iOS());
            }
        };

        var initialisationError = function () {
            _isAvailable = false;
            if (errorCallback) {
                errorCallback();
            }

            _jsBridge = createMockBridge();
            requestInitData();
        }.bind(this);

        function shouldLeaderboardBeInitialised(parseId, parseKey) {
            return typeof parseId === 'string' && typeof parseKey === 'string' && parseId !== '' && parseKey !== '';
        }

        var requestInitData = function () {
            // get username
            _bridgeGetUsernameFor(_config.userId, function (username) {
                _config.username = username;

                var finishInit = function () {
                    _isAvailable = true;
                    successCallback();
                };

                finishInit();

            });
        }.bind(this);


        if (isMobile.iOS()) {
            if (window.WebViewJavascriptBridge) {

                _jsBridge = WebViewJavascriptBridge;
                _jsBridge.init();

                requestInitData();
            } else {

                // If the bridge is not found on iOS it is possible that they are using a version prior to the api being
                // implemented, if this is the case the api is not ready but we can carry on without certain features.
                var initialisationTimeout = setTimeout(initialisationError, 5000);

                document.addEventListener('WebViewJavascriptBridgeReady', function () {

                    _jsBridge = WebViewJavascriptBridge;
                    _jsBridge.init();

                    // We don't want to call initialise it twice, so clear the timeout.
                    clearTimeout(initialisationTimeout);

                    requestInitData();
                }, false);
            }
        } else if (isMobile.Android()) {
            if (window.bridge && bridge !== null) {
                _jsBridge = bridge;
            } else {
                _jsBridge = new createMockBridge();
            }
            requestInitData();
        } else {
            _jsBridge = createMockBridge();
            requestInitData();
        }
    };

    popjam.isAvailable = function () {
        return _isAvailable;
    };

    popjam.requestClose = function () {
        try {
            _jsBridge.callHandler('close', null, null);
        }
        catch (err) {
            var actionType = 'close';
            var actionParameters = {};
            var myAppName = 'popjam';

            // separating the actionType from parameters makes it easier to parse in ObjC.
            var jsonString = JSON.stringify(actionParameters);
            var escapedJsonParameters = escape(jsonString);
            var url = myAppName + '://' + actionType + '#' + escapedJsonParameters;
            document.location.href = url;
        }
    };

    popjam.userId = function () {
        checkIfInitialised();
        return _config.userId;
    };

    popjam.requestUsernameByUserId = function (userId, callback) {
        checkIfInitialised();
        _bridgeGetUsernameFor(userId, callback);
    };

    popjam.requestUsername = function (callback) {
        checkIfInitialised();

        // we already got the username in init() so just supply it to the callback
        if (callback !== undefined) {
            callback(_config.username);
        }
    };

    popjam.shareImageToFeed = function (image) {
        checkIfInitialised();

        if (isMobile.iOS()) {
            _jsBridge.callHandler('shareToFeed', image, null);
        } else {
            _jsBridge.callHandler('challengeShareToFeed', image, null);
        }

    };

    popjam.copyLinkAction = function () {
        checkIfInitialised();
        _jsBridge.callHandler('copyLinkAction', null, null);
    }


    popjam.tracking = function (data) {
        checkIfInitialised();

        // if (!isMobile.iOS()) {
        _jsBridge.callHandler('eventHandler', data, null);
        // }

    };

    popjam.selectGiphySticker = function (giphyId) {
        checkIfInitialised();
        _jsBridge.callHandler('getGiphyID', giphyId, null);
    };

    popjam.showProfileForUserWithId = function (userId) {
        checkIfInitialised();
        _jsBridge.callHandler('showProfileForUserWithId', userId, null);
    };

    popjam.requestProfileImage = function (callback) {
        checkIfInitialised();
        _jsBridge.callHandler('requestProfileImage', _config.userId, callback);
    };

    popjam.requestProfileImageForUsers = function (userIds, callback) {
        checkIfInitialised();
        _jsBridge.callHandler('requestProfileImageForUsers', userIds, callback);
    };

    popjam.awardBadgeToCurrentUser = function (badge, callback) {
        checkIfInitialised();
        _jsBridge.callHandler('awardBadgeToCurrentUser', badge, callback);
    };

    popjam.requestBadgeData = function (badge, callback) {
        checkIfInitialised();
        _jsBridge.callHandler('requestBadgeData', badge, callback);
    };

})(popjam || {});
