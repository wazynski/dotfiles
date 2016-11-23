// Configs
S.cfga({
  "defaultToCurrentScreen" : true,
  "secondsBetweenRepeat" : 0.1,
  "checkDefaultsOnLoad" : true,
  "focusCheckWidthMax" : 3000,
  "orderScreensLeftToRight" : true
});

// Monitors

var leftMonitor = "0";
var rightMonitor = "1";
var apps = [];
var openWindows = [];

// Position Function
function position(w, h, x, y, screen) {
  width = slate.screenForRef(screen).visibleRect().width * (w / 100);
  height = slate.screenForRef(screen).visibleRect().height * (h / 100);
  xPos = slate.screenForRef(screen).visibleRect().width * (x / 100);
  yPos = slate.screenForRef(screen).visibleRect().height * (y / 100);

  return S.op("move", {
    "screen" : screen,
    "x" : "screenOriginX + " + xPos,
    "y" : "screenOriginY + " + yPos,
    "width" : width,
    "height" : height
   });
}

function hideApp(app) {
  return S.op("hide", { "app" : app });
}

function matchInArray (array, value) {
  var i;
  for (i=0; i < array.length; i++) {
    slate.log(array[i] + " - " + " (" + value + ") " + array[i].match(value));
    if (array[i].match(value)) {
      return true;
    }
  }
  return false;
}


// 2 monitor layout
var twoMonitorLayout = S.lay("twoMonitor", {
  "_before_" : { "operations" : [hideApp('MAMP'), hideApp('MAMP Pro')]},
  // Right
  "Finder" : {
    "operations" : [position(40, 100, 0, 0, rightMonitor)],
    "repeat" : true
  },
  "Google Chrome" : {
    "operations" : [function(windowObject) {
      // I want all Google Chrome windows to use the rightMain operation *unless* it is a Developer Tools window.
      // In that case I want it to use the leftRight operation. I can't use title-order-regex here because if it
      // doesn't see the regex, it won't skip the leftRight operation and that will cause one of my other Chrome
      // windows to use it which I don't want. Also, I could have multiple Developer Tools windows which also
      // makes title-order-regex unusable. So instead I just write my own free form operation.
      var title = windowObject.title();
      if (title !== undefined && title.match(/^Developer\sTools\s-\s.+$/)) {
        if ( _.contains(apps, "Terminal") )  {
          windowObject.doOperation( position(40, 50, 60, 50, leftMonitor) );
        } else {
          windowObject.doOperation( position(40, 100, 60, 0, leftMonitor) );
        }
      } else {
        windowObject.doOperation( position(50, 100, 0, 0, rightMonitor) );
      }
    }],
    "ignore-fail" : true,
    "repeat" : true
  },
  "Safari" : {
    "operations" : [position(50, 100, 0, 0, rightMonitor)],
    "repeat" : true
  },
  "Firefox" : {
    "operations" : [position(50, 100, 0, 0, rightMonitor)],
    "repeat" : true
  },
  "Atom" : {
    "operations" : [position(50, 100, 50, 0, rightMonitor)],
    "repeat" : true
  },
  // Left
  "Photoshop CC" : {
    "operations" : [position(100, 100, 0, 0, leftMonitor)],
    "repeat" : true
  },
  "InDesign CC" : {
    "operations" : [position(100, 100, 0, 0, leftMonitor)],
    "repeat" : true
  },
  "Adobe Illustrator CC 2017" : {
    "operations" : [position(100, 100, 0, 0, leftMonitor)],
    "repeat" : true
  },
  // Left
  "Calendar" : {
    "operations" : [position(50, 100, 25, 0, leftMonitor)],
    "repeat" : true
  },
  "Messages" : {
    "operations" : [position(25, 100, 0, 0, leftMonitor)],
    "repeat" : true
  },
  "Things" : {
    "operations" : [position(25, 100, 75, 0, leftMonitor)],
    "repeat" : true
  },
  "Jabber" : {
    "operations" : [function(windowObject) {
      var title = windowObject.title();
      if (title !== undefined && title.match("Cisco Jabber")) {
        windowObject.doOperation(position(25, 100, 0, 0, leftMonitor));
      } else {
        windowObject.doOperation(position(25, 100, 0, 0, leftMonitor));
      }
    }],
    "repeat" : true
  },
  // Left
  "Mail" : {
    "operations" : [position(50, 100, 50, 0, leftMonitor)],
    "repeat" : true
  },
  "Microsoft Outlook" : {
    "operations" : [position(50, 100, 0, 0, leftMonitor)],
    "repeat" : true
  },
  "Airmail" : {
    "operations" : [position(50, 100, 0, 0, leftMonitor)],
    "repeat" : true
  },
  // Left
  "Terminal" : {
    "operations" : [ function(windowObject) {
      if (matchInArray(openWindows, /^Developer\sTools\s-\s.+$/))  {
        windowObject.doOperation(position(40, 50, 60, 0, leftMonitor));
      } else {
        windowObject.doOperation(position(40, 100, 60, 0, leftMonitor));
      }
    }
  ],
    "repeat" : true
  },
  "SourceTree" : {
    "operations" : [function(windowObject) {
      var title = windowObject.title();
      if (title !== undefined && title.match("SourceTree")) {
        windowObject.doOperation(position(20, 100, 0, 0, leftMonitor));
      } else {
        if (_.contains(apps, "CodeKit"))  {
          windowObject.doOperation(position(40, 60, 20, 0, leftMonitor));
        } else {
          windowObject.doOperation(position(40, 100, 20, 0, leftMonitor));
        }
      }
    }],
    "ignore-fail" : true,
    "repeat" : true
  },
  "CodeKit" : {
    "operations" : [position(40, 40, 20, 60, leftMonitor)],
    "repeat" : true
  },
  "Reeder" : {
    "operations" : [position(35, 100, 65, 0, leftMonitor)],
    "repeat" : true
  },
  // Left 4
  "Slack" : {
    "operations" : [position(35, 100, 0, 0, leftMonitor)],
    "repeat" : true
  },
  "Notes" : {
    "operations" : [position(30, 100, 35, 0, leftMonitor)],
    "repeat" : true
  },
});

// 1 monitor layout
var oneMonitorLayout = S.lay("oneMonitor", {

});

var laptopExternalLayout = S.lay("oneMonitor", {

});

var laptopLayout = S.lay("oneMonitor", {

});

// Defaults
S.def(2, twoMonitorLayout);
S.def(1, oneMonitorLayout);
S.def(1, laptopLayout);
S.def(1, laptopExternalLayout);
//
// // Layout Operations
var twoMonitor = S.op("layout", { "name" : twoMonitorLayout });
var oneMonitor = S.op("layout", { "name" : oneMonitorLayout });
var laptopMonitor = S.op("layout", { "name" : laptopLayout });
var laptopExternalMonitor = S.op("layout", { "name" : laptopExternalLayout });



var universalLayout = function() {
  apps = [];
  openWindows = [];

  slate.eachApp(function(appObject) {
    apps.push(appObject.name());
    appObject.eachWindow(function(windowObject) {
      openWindows.push(windowObject.title());
      // slate.log(appObject.name() + " - " + windowObject.title());
    });
  });

  slate.log(apps);
  slate.log(openWindows);

  // slate.default(["2560x1440", "2560x1440"], twoMonitor);
  // slate.default(["2560x1440"], oneMonitor);
  // slate.default(["2560x1440", "1280x800"], oneMonitor);
  // slate.default(["1280x800"], laptopMonitor);

  // Should probably make sure the resolutions match but w/e
  S.log("SCREEN COUNT: "+S.screenCount());
  if (S.screenCount() === 2) {
    twoMonitor.run();
  } else if (S.screenCount() === 1) {
    oneMonitor.run();
  }
};

// Batch bind everything. Less typing.
S.bnda({
  // Layout Bindings
  "padEnter:ctrl" : universalLayout,

  // Resize Bindings
  // NOTE: some of these may *not* work if you have not removed the expose/spaces/mission control bindings
  "right:ctrl,shift,alt" : S.op("resize", { "width" : "+5%", "height" : "+0" }),
  "left:ctrl,shift,alt" : S.op("resize", { "width" : "-5%", "height" : "+0" }),
  "up:ctrl,shift,alt" : S.op("resize", { "width" : "+0", "height" : "-5%" }),
  "down:ctrl,shift,alt" : S.op("resize", { "width" : "+0", "height" : "+5%" }),

  "right:ctrl,shift,cmd" : S.op("resize", { "width" : "-5%", "height" : "+0", "anchor" : "bottom-right" }),
  "left:ctrl,shift,cmd" : S.op("resize", { "width" : "+5%", "height" : "+0", "anchor" : "bottom-right" }),
  "up:ctrl,shift,cmd" : S.op("resize", { "width" : "+0", "height" : "+5%", "anchor" : "bottom-right" }),
  "down:ctrl,shift,cmd" : S.op("resize", { "width" : "+0", "height" : "-5%", "anchor" : "bottom-right" }),

  // Push Bindings
  // NOTE: some of these may *not* work if you have not removed the expose/spaces/mission control bindings
  "right:ctrl,alt" : S.op("push", { "direction" : "right" }),
  "left:ctrl,alt" : S.op("push", { "direction" : "left" }),
  "up:ctrl;alt" : S.op("push", { "direction" : "up" }),
  "down:ctrl;alt" : S.op("push", { "direction" : "down" }),

  // Nudge Bindings
  // NOTE: some of these may *not* work if you have not removed the expose/spaces/mission control bindings
  "right:ctrl,alt,cmd,shift" : S.op("nudge", { "x" : "+5%", "y" : "+0" }),
  "left:ctrl,alt,cmd,shift" : S.op("nudge", { "x" : "-5%", "y" : "+0" }),
  "up:ctrl,alt,cmd,shift" : S.op("nudge", { "x" : "+0", "y" : "-5%" }),
  "down:ctrl,alt,cmd,shift" : S.op("nudge", { "x" : "+0", "y" : "+5%" }),

  // Throw Bindings
  // NOTE: some of these may *not* work if you have not removed the expose/spaces/mission control bindings
  "left:ctrl,alt,cmd" : S.op("throw", { "screen" : leftMonitor }),
  "right:ctrl,alt,cmd" : S.op("throw", { "screen" : rightMonitor }),

  "esc:ctrl" : S.op("grid"),
  "pad.:ctrl" : S.op("hint")
});

universalLayout();

// Test Cases
S.src(".slate.test", true);
S.src(".slate.test.js", true);

// Log that we're done configuring
S.log("[SLATE] -------------- Finished Loading Config --------------");
