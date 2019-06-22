#!/bin/bash
      # Helper script for Gradle to call npm on macOS in case it is not found
      export PATH=$PATH:/usr/local/lib/node_modules/npm/node_modules/npm-lifecycle/node-gyp-bin:/Users/rajpatel/pokemon/Pokemon-Showdown/ShowdownApp/node_modules/nodejs-mobile-react-native/node_modules/.bin:/Users/rajpatel/pokemon/Pokemon-Showdown/ShowdownApp/node_modules/.bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/opt/X11/bin:/opt/gradle/gradle-4.8.1/bin
      npm $@
    