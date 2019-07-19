
// Initialize some variables before react-native code would access them
var onmessage=null, self=global;
// Cache Node's original require as __debug__.require
global.__debug__={require: require};
// avoid Node's GLOBAL deprecation warning
Object.defineProperty(global, "GLOBAL", {
    configurable: true,
    writable: true,
    enumerable: true,
    value: global
});
// Prevent leaking process.versions from debugger process to
// worker because pure React Native doesn't do that and some packages as js-md5 rely on this behavior
Object.defineProperty(process, "versions", {
    value: undefined
});
function getNativeModules() {
    var NativeModules;
    try {
        // This approach is for old RN versions
        NativeModules = global.require('NativeModules');
    } catch (err) {
        // ignore error and try another way for more recent RN versions
        try {
            var nativeModuleId;
            var modules = global.__r.getModules();
            var ids = Object.keys(modules);
            for (var i = 0; i < ids.length; i++) {
              if (modules[ids[i]].verboseName) {
                 var packagePath = new String(modules[ids[i]].verboseName);
                 if (packagePath.indexOf("react-native/Libraries/BatchedBridge/NativeModules.js") > 0) {
                   nativeModuleId = parseInt(ids[i], 10);
                   break;
                 }
              }
            }
          if (nativeModuleId) {
            NativeModules = global.__r(nativeModuleId);
          }
        }
        catch (err) {
            // suppress errors
        }
    }
    return NativeModules;
}
// Originally, this was made for iOS only
var vscodeHandlers = {
    'vscode_reloadApp': function () {
        var NativeModules = getNativeModules();
        if (NativeModules) {
            NativeModules.DevMenu.reload();
        }
    },
    'vscode_showDevMenu': function () {
        var NativeModules = getNativeModules();
        if (NativeModules) {
            NativeModules.DevMenu.show();
        }
    }
};
process.on("message", function (message) {
    if (message.data && vscodeHandlers[message.data.method]) {
        vscodeHandlers[message.data.method]();
    } else if(onmessage) {
        onmessage(message);
    }
});
var postMessage = function(message){
    process.send(message);
};
if (!self.postMessage) {
    self.postMessage = postMessage;
}
var importScripts = (function(){
    var fs=require('fs'), vm=require('vm');
    return function(scriptUrl){
        var scriptCode = fs.readFileSync(scriptUrl, "utf8");
        vm.runInThisContext(scriptCode, {filename: scriptUrl});
    };
})();
// Worker is ran as nodejs process, so console.trace() writes to stderr and it leads to error in native app
// To avoid this console.trace() is overridden to print stacktrace via console.log()
// Please, see Node JS implementation: https://github.com/nodejs/node/blob/master/lib/internal/console/constructor.js
console.trace = (function() {
    return function() {
        try {
            var err = {
                name: 'Trace',
                message: require('util').format.apply(null, arguments)
                };
            // Node uses 10, but usually it's not enough for RN app trace
            Error.stackTraceLimit = 30;
            Error.captureStackTrace(err, console.trace);
            console.log(err.stack);
        } catch (e) {
            console.error(e);
        }
    };
})();

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

/* global __fbBatchedBridge, self, importScripts, postMessage, onmessage: true */

/* eslint no-unused-vars: 0 */
'use strict';

onmessage = function () {
  var visibilityState;

  var showVisibilityWarning = function () {
    var hasWarned = false;
    return function () {
      // Wait until `YellowBox` gets initialized before displaying the warning.
      if (hasWarned || console.warn.toString().includes('[native code]')) {
        return;
      }

      hasWarned = true;
      console.warn('Remote debugger is in a background tab which may cause apps to ' + 'perform slowly. Fix this by foregrounding the tab (or opening it in ' + 'a separate window).');
    };
  }();

  var messageHandlers = {
    executeApplicationScript: function (message, sendReply) {
      for (var key in message.inject) {
        self[key] = JSON.parse(message.inject[key]);
      }

      var error;

      try {
        importScripts(message.url);
      } catch (err) {
        error = err.message;
      }

      sendReply(null
      /* result */
      , error);
    },
    setDebuggerVisibility: function (message) {
      visibilityState = message.visibilityState;
    }
  };
  return function (message) {
    if (visibilityState === 'hidden') {
      showVisibilityWarning();
    }

    var object = message.data;

    var sendReply = function (result, error) {
      postMessage({
        replyID: object.id,
        result: result,
        error: error
      });
    };

    var handler = messageHandlers[object.method];

    if (handler) {
      // Special cased handlers
      handler(object, sendReply);
    } else {
      // Other methods get called on the bridge
      var returnValue = [[], [], [], 0];
      var error;

      try {
        if (typeof __fbBatchedBridge === 'object') {
          returnValue = __fbBatchedBridge[object.method].apply(null, object.arguments);
        } else {
          error = 'Failed to call function, __fbBatchedBridge is undefined';
        }
      } catch (err) {
        error = err.message;
      } finally {
        sendReply(JSON.stringify(returnValue), error);
      }
    }
  };
}();
// Notify debugger that we're done with loading
// and started listening for IPC messages
postMessage({workerLoaded:true});