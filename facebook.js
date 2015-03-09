  Accounts.oauth.registerService('facebook');
  Meteor.loginWithFacebook = function(options, callback) {
    // support a callback without options
    if (! callback && typeof options === "function") {
      callback = options;
      options = null;
    }

    var credentialRequestCompleteCallback = Accounts.oauth.credentialRequestCompleteHandler(callback);

    var fbLoginSuccess = function (data) {
      data.cordova = true;
      Accounts.callLoginMethod({
        methodArguments: [data],
        userCallback: callback
      });
    }

    if (typeof facebookConnectPlugin != "undefined" && Meteor.isCordova) {
      facebookConnectPlugin.getLoginStatus(
        function (response) {
          if (response.status != "connected") {
            facebookConnectPlugin.login(options.requestPermissions,
                fbLoginSuccess,
                function (error) {
                  console.log("" + error)
                }
            );
          } else {
            fbLoginSuccess(response);
          }
        },
        function (error) { console.log("" + error) }
      );
    } else {
      Facebook.requestCredential(options, credentialRequestCompleteCallback);
    }
  };
