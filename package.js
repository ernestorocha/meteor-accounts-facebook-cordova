Package.describe({
    summary: "Login service for Facebook accounts (works with cordova)",
    version: "1.1.8",
    name: "vicentealencar:cordova-fb",
    git: "https://github.com/vicentealencar/meteor-accounts-facebook-cordova.git"
});

// meteor test-packages ./
var both = ['client', 'server'];
var client = ['client'];
var server = ['server'];

Package.on_use(function(api) {
  api.versionsFrom("METEOR@0.9.0");
  api.use(['accounts-base', 'accounts-oauth', 'facebook', 'service-configuration'], both);
  // Export Accounts (etc) to packages using this one.
  api.imply('accounts-base', both);
  api.use(['http', 'underscore'], server);

  api.add_files('facebook_server.js', server);
  api.add_files('facebook.js', 'web');
});
