inspiration from meteor-accounts-facebook-cordova (andrewreedy)

Accounts Facebook Cordova
================

## Introduction

This packages replaces the accounts-facebook package. It works with [phonegap-facebook-plugin](https://github.com/phonegap/phonegap-facebook-plugin) when using cordova and falls back to the facebook package when in a browser.

*Note: Currently only tested with iOS. Will test the other platforms asap.*

*Current status: Login works great! Working on abstracting the graph api calls so they work from both native sdk or http request .. although it may be better to just stick with http.*

================

## Installation / Setup

##### Requirements
* [Cordova: 3.5](http://cordova.apache.org/)
* [phonegap-facebook-plugin](https://github.com/phonegap/phonegap-facebook-plugin)

================

##### Package Installation
Meteor 0.9.0 and up
````
meteor add particle4dev:cordova-fb
````
Meteor 0.8.3
````
mrt add accounts-facebook-cordova
````

You must also remove Meteor's default accounts-facebook package:
```
meteor remove accounts-facebook
```

*Note: For testing you can also add accounts-ui package.*



================

##### Meteor settings file (settings.json)
````
{
    "cordova": {
        "com.phonegap.plugins.facebookconnect": {
           "APP_ID": ***,
           "APP_NAME": ***,
           "secret": ***
        }
    },
    "public": {
        "facebook": {
            "permissions": [
                "public_profile",
                "user_interests",
                "user_activities",
                "read_friendlists"
            ],
            "profileFields": [
                "name",
                "gender",
                "location"
            ]
        }
    }
}
````
================

### Cordova Setup Guide
Refer to the [phonegap-facebook-plugin readme](https://github.com/phonegap/phonegap-facebook-plugin)

## Final Notes

##### Running your app with settings

````
meteor run android-device -p 192.168.1.103:3000 --verbose --settings settings.json
````

````
mrt --settings settings.json
````
================
### Example
[https://github.com/particle4dev/meteor-cordova-facebook-login](https://github.com/particle4dev/meteor-cordova-facebook-login)

If you want more features than this provides, file an issue. Feature requests/contributions are welcome.
