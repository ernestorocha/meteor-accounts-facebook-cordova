Accounts.registerLoginHandler(function(loginRequest) {
  if(!loginRequest.cordova) {
    return undefined;
  }

  var identity = getIdentity(loginRequest.accessToken);

  var serviceData = {
    accessToken: loginRequest.accessToken,
    expiresAt: (+new Date) + (1000 * loginRequest.expiresIn)
  };

  var whitelisted = ['id', 'email', 'name', 'first_name',
      'last_name', 'link', 'username', 'gender', 'locale', 'age_range'];

  var fields = _.pick(identity, whitelisted);
  _.extend(serviceData, fields);

  var options = {profile: {}};
  var profileFields = _.pick(identity, Meteor.settings.public.facebook.profileFields);
  _.extend(options.profile, profileFields);

  return Accounts.updateOrCreateUserFromExternalService("facebook", serviceData, options);

});

var getIdentity = function (accessToken) {
  try {
    return HTTP.get("https://graph.facebook.com/me", {
      params: {access_token: accessToken}}).data;
  } catch (err) {
    throw _.extend(new Error("Failed to fetch identity from Facebook. " + err.message),
                   {response: err.response});
  }
};

Accounts.addAutopublishFields({
  // publish all fields including access token, which can legitimately
  // be used from the client (if transmitted over ssl or on
  // localhost). https://developers.facebook.com/docs/concepts/login/access-tokens-and-types/,
  // "Sharing of Access Tokens"
  forLoggedInUser: ['services.facebook'],
  forOtherUsers: [
    // https://www.facebook.com/help/167709519956542
    'services.facebook.id', 'services.facebook.username', 'services.facebook.gender'
  ]
});
