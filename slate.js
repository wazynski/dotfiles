// Configs
S.cfga({
  "defaultToCurrentScreen" : true,
  "secondsBetweenRepeat" : 0.1,
  "checkDefaultsOnLoad" : true,
  "focusCheckWidthMax" : 3000,
  "orderScreensLeftToRight" : true
});

// Monitors
var monDell  = "2560x1440";
var monTbolt  = "2560x1440";

var leftScreenRef = "0";
var rightScreenRef = "1";

var monLaptop = "1440x900";

// Operations
var lapFull = S.op("move", {
  "screen" : monLaptop,
  "x" : "screenOriginX",
  "y" : "screenOriginY",
  "width" : "screenSizeX",
  "height" : "screenSizeY"
});

var dellFull = S.op("move", {
  "screen" : leftScreenRef,
  "x" : "screenOriginX",
  "y" : "screenOriginY",
  "width" : "screenSizeX",
  "height" : "screenSizeY"
});

var tboltFull = S.op("move", {
  "screen" : rightScreenRef,
  "x" : "screenOriginX",
  "y" : "screenOriginY",
  "width" : "screenSizeX",
  "height" : "screenSizeY"
});

var sourceTreeMain = S.op("move", {
  "screen" : leftScreenRef,
  "x" : "screenOriginX+(screenSizeX/4)",
  "y" : "screenOriginY",
  "width" : "(screenSizeX/12)*5",
  "height" : "screenSizeY"
});

var jabber = S.op("move", {
  "screen" : leftScreenRef,
  "x" : "screenOriginX+(screenSizeX/4)",
  "y" : "screenOriginY",
  "width" : "688",
  "height" : "1417"
});

var calendar = S.op("move", {
  "screen" : leftScreenRef,
  "x" : "screenOriginX+688",
  "y" : "screenOriginY",
  "width" : "1231",
  "height" : "screenSizeY"
});

var notes = S.op("move", {
  "screen" : leftScreenRef,
  "x" : "screenOriginX+853",
  "y" : "screenOriginY",
  "width" : "807",
  "height" : "screenSizeY"
});

var reader = S.op("move", {
  "screen" : leftScreenRef,
  "x" : "screenOriginX+1660",
  "y" : "screenOriginY",
  "width" : "900",
  "height" : "screenSizeY"
});

// Thunderbolt

var tboltLeft = tboltFull.dup({ "width" : "screenSizeX/2" });
var tboltRight = tboltLeft.dup({ "x" : "screenOriginX+(screenSizeX/2)" });

var tboltThirdLeft = tboltFull.dup({ "width" : "screenSizeX/3" });
var tboltThirdMid = tboltThirdLeft.dup({ "x" : "screenOriginX+(screenSizeX/3)" });
var tboltThirdRight = tboltThirdLeft.dup({ "x" : "screenOriginX+((screenSizeX/3)*2)" });

var tboltTwoThirdsLeft = tboltFull.dup({ "width" : "(screenSizeX*2)/3" });
var tboltTwoThirdsRight =  tboltTwoThirdsLeft.dup({ "x" : "screenOriginX+((screenSizeX*2)/3)" });

var tboltQuaterLeft = tboltFull.dup({ "width" : "screenSizeX/4" });
var tboltQuaterMidL = tboltQuaterLeft.dup({ "x" : "screenOriginX+(screenSizeX/4)" });
var tboltQuaterMidR = tboltQuaterLeft.dup({ "x" : "screenOriginX+((screenSizeX/4)*2)" });
var tboltQuaterRight = tboltQuaterLeft.dup({ "x" : "screenOriginX+((screenSizeX/4)*3)" });

// Dell

var dellLeft = dellFull.dup({ "width" : "screenSizeX/2" });
var dellRight = dellLeft.dup({ "x" : "screenOriginX+(screenSizeX/2)" });

var dellThirdLeft = dellFull.dup({ "width" : "screenSizeX/3" });
var dellThirdMid = dellThirdLeft.dup({ "x" : "screenOriginX+(screenSizeX/3)" });
var dellThirdRight = dellThirdLeft.dup({ "x" : "screenOriginX+((screenSizeX/3)*2)" });

var dellTwoThirdsLeft = dellFull.dup({ "width" : "(screenSizeX*2)/3" });
var dellTwoThirdsRight =  dellTwoThirdsLeft.dup({ "x" : "screenOriginX+((screenSizeX*2)/3)" });

var dellQuaterLeft = dellFull.dup({ "width" : "screenSizeX/4" });
var dellQuaterMidL = dellQuaterLeft.dup({ "x" : "screenOriginX+(screenSizeX/4)" });
var dellQuaterMidR = dellQuaterLeft.dup({ "x" : "screenOriginX+((screenSizeX/4)*2)" });
var dellQuaterRight = dellQuaterLeft.dup({ "x" : "screenOriginX+((screenSizeX/4)*3)" });

// Laptop

var lapLeft = lapFull.dup({ "width" : "screenSizeX/2" });
var lapRight = lapLeft.dup({ "x" : "screenOriginX+(screenSizeX/2)" });

var lapThirdLeft = lapFull.dup({ "width" : "screenSizeX/3" });
var lapThirdMid = lapThirdLeft.dup({ "x" : "screenOriginX+(screenSizeX/3)" });
var lapThirdRight =  lapThirdLeft.dup({ "x" : "screenOriginX+((screenSizeX/3)*2)" });

var lapTwoThirdsLeft = lapFull.dup({ "width" : "(screenSizeX*2)/3" });
var lapTwoThirdsRight =  lapTwoThirdsLeft.dup({ "x" : "screenOriginX+((screenSizeX*2)/3)" });

var lapQuaterLeft = lapFull.dup({ "width" : "screenSizeX/4" });
var lapQuaterMidL = lapQuaterLeft.dup({ "x" : "screenOriginX+(screenSizeX/4)" });
var lapQuaterMidR = lapQuaterLeft.dup({ "x" : "screenOriginX+((screenSizeX/4)*2)" });
var lapQuaterRight = lapQuaterLeft.dup({ "x" : "screenOriginX+((screenSizeX/4)*3)" });


// 2 monitor layout
var twoMonitorLayout = S.lay("twoMonitor", {
  "Google Chrome" : {
    "operations" : [tboltLeft],
    "repeat" : true
  },
  "Safari" : {
    "operations" : [tboltLeft],
    "repeat" : true
  },
  "Firefox" : {
    "operations" : [tboltLeft],
    "repeat" : true
  },
  "Calendar" : {
    "operations" : [calendar],
    "repeat" : true
  },
  "Atom" : {
    "operations" : [tboltRight],
    "repeat" : true
  },
  "Messages" : {
    "operations" : [dellThirdLeft],
    "repeat" : true
  },
  "Things" : {
    "operations" : [dellQuaterRight],
    "repeat" : true
  },
  "Mail" : {
    "operations" : [dellRight],
    "repeat" : true
  },
  "Microsoft Outlook" : {
    "operations" : [dellLeft],
    "repeat" : true
  },
  "Airmail" : {
    "operations" : [dellLeft],
    "repeat" : true
  },
  "Terminal" : {
    "operations" : [dellThirdRight],
    "repeat" : true
  },
  "Reeder" : {
    "operations" : [reader],
    "repeat" : true
  },
  "Slack" : {
    "operations" : [dellThirdLeft],
    "repeat" : true
  },
  "Cisco Jabber" : {
    "operations" : [jabber],
    "repeat" : true
  },
  "SourceTree" : {
    // "operations" : [dellQuaterMidR],
    "operations" : [function(windowObject) {
      var title = windowObject.title();
      if (title !== undefined && title.match("SourceTree")) {
        windowObject.doOperation(dellQuaterLeft);
      } else {
        windowObject.doOperation(sourceTreeMain);
      }
    }],
    "ignore-fail" : true,
    "repeat" : true
  },
  "Notes" : {
    "operations" : [notes],
    "repeat" : true
  }
});

// 1 monitor layout
var oneMonitorLayout = S.lay("oneMonitor", {
  "Google Chrome" : {
    "operations" : [lapFull],
    "repeat" : true
  },
  "Safari" : {
    "operations" : [lapFull],
    "repeat" : true
  },
  "Firefox" : {
    "operations" : [lapFull],
    "repeat" : true
  },
  "Calendar" : {
    "operations" : [lapTwoThirdsLeft],
    "repeat" : true
  },
  "Atom" : {
    "operations" : [lapRight],
    "repeat" : true
  },
  "Messages" : {
    "operations" : [lapThirdRight],
    "repeat" : true
  },
  "Things" : {
    "operations" : [lapThirdRight],
    "repeat" : true
  },
  "Mail" : {
    "operations" : [lapFull],
    "repeat" : true
  },
  "Microsoft Outlook" : {
    "operations" : [lapFull],
    "repeat" : true
  },
  "Airmail" : {
    "operations" : [lapFull],
    "repeat" : true
  },
  "Terminal" : {
    "operations" : [lapLeft],
    "repeat" : true
  },
  "Reeder" : {
    "operations" : [lapFull],
    "repeat" : true
  },
  "Slack" : {
    "operations" : [lapFull],
    "repeat" : true
  },
  "SourceTree" : {
    "operations" : [lapLeft],
    "repeat" : true
  },
  "Notes" : {
    "operations" : [lapRight],
    "repeat" : true
  }
});

// Defaults
S.def(2, twoMonitorLayout);
S.def(1, oneMonitorLayout);

// Layout Operations
var twoMonitor = S.op("layout", { "name" : twoMonitorLayout });
var oneMonitor = S.op("layout", { "name" : oneMonitorLayout });
var universalLayout = function() {
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
  "space:ctrl" : universalLayout,

  // Basic Location Bindings
  // "pad0:ctrl" : lapLeft,
  // "[:ctrl" : lapLeft,
  // "pad.:ctrl" : lapFull,
  // "]:ctrl" : lapFull,
  // "pad1:ctrl" : tboltLeftBot,
  // "pad2:ctrl" : tboltMidBot,
  // "pad3:ctrl" : tboltRightBot,
  // "pad4:ctrl" : tboltLeftTop,
  // "pad5:ctrl" : tboltMidTop,
  // "pad6:ctrl" : tboltRightTop,
  // "pad7:ctrl" : tboltLeft,
  // "pad8:ctrl" : tboltMid,
  // "pad9:ctrl" : tboltRight,
  // "pad=:ctrl" : tboltFull,

  // Resize Bindings
  // NOTE: some of these may *not* work if you have not removed the expose/spaces/mission control bindings
  "right:ctrl,shift,alt" : S.op("resize", { "width" : "+10%", "height" : "+0" }),
  "left:ctrl,shift,alt" : S.op("resize", { "width" : "-10%", "height" : "+0" }),
  "up:ctrl,shift,alt" : S.op("resize", { "width" : "+0", "height" : "-10%" }),
  "down:ctrl,shift,alt" : S.op("resize", { "width" : "+0", "height" : "+10%" }),

  "right:ctrl,shift,cmd" : S.op("resize", { "width" : "-10%", "height" : "+0", "anchor" : "bottom-right" }),
  "left:ctrl,shift,cmd" : S.op("resize", { "width" : "+10%", "height" : "+0", "anchor" : "bottom-right" }),
  "up:ctrl,shift,cmd" : S.op("resize", { "width" : "+0", "height" : "+10%", "anchor" : "bottom-right" }),
  "down:ctrl,shift,cmd" : S.op("resize", { "width" : "+0", "height" : "-10%", "anchor" : "bottom-right" }),

  // Push Bindings
  // NOTE: some of these may *not* work if you have not removed the expose/spaces/mission control bindings
  "right:ctrl,alt" : S.op("push", { "direction" : "right", "style" : "bar-resize:screenSizeX/2" }),
  "left:ctrl,alt" : S.op("push", { "direction" : "left", "style" : "bar-resize:screenSizeX/2" }),
  // "up:ctrl;shift" : S.op("push", { "direction" : "up", "style" : "bar-resize:screenSizeY/2" }),
  // "down:ctrl;shift" : S.op("push", { "direction" : "down", "style" : "bar-resize:screenSizeY/2" }),

  // Nudge Bindings
  // NOTE: some of these may *not* work if you have not removed the expose/spaces/mission control bindings
  "right:ctrl,alt,cmd,shift" : S.op("nudge", { "x" : "+10%", "y" : "+0" }),
  "left:ctrl,alt,cmd,shift" : S.op("nudge", { "x" : "-10%", "y" : "+0" }),
  "up:ctrl,alt,cmd,shift" : S.op("nudge", { "x" : "+0", "y" : "-10%" }),
  "down:ctrl,alt,cmd,shift" : S.op("nudge", { "x" : "+0", "y" : "+10%" }),

  // Throw Bindings
  // NOTE: some of these may *not* work if you have not removed the expose/spaces/mission control bindings
  "left:ctrl,alt,cmd" : S.op("throw", { "screen" : leftScreenRef, "width" : "screenSizeX/2", "height" : "screenSizeY" }),
  "right:ctrl,alt,cmd" : S.op("throw", { "screen" : rightScreenRef, "width" : "screenSizeX/2", "height" : "screenSizeY" }),
  // "pad3:ctrl;alt" : S.op("throw", { "screen" : "0", "width" : "screenSizeX/2", "height" : "screenSizeY" }),

  // Focus Bindings
  // NOTE: some of these may *not* work if you have not removed the expose/spaces/mission control bindings
  // "l:cmd" : S.op("focus", { "direction" : "right" }),
  // "h:cmd" : S.op("focus", { "direction" : "left" }),
  // "k:cmd" : S.op("focus", { "direction" : "up" }),
  // "j:cmd" : S.op("focus", { "direction" : "down" }),
  // "k:cmd;alt" : S.op("focus", { "direction" : "behind" }),
  // "j:cmd;alt" : S.op("focus", { "direction" : "behind" }),
  // "right:cmd" : S.op("focus", { "direction" : "right" }),
  // "left:cmd" : S.op("focus", { "direction" : "left" }),
  // "up:cmd" : S.op("focus", { "direction" : "up" }),
  // "down:cmd" : S.op("focus", { "direction" : "down" }),
  // "up:cmd;alt" : S.op("focus", { "direction" : "behind" }),
  // "down:cmd;alt" : S.op("focus", { "direction" : "behind" }),

  // Window Hints
  // "esc:cmd" : S.op("hint"),

  // Switch currently doesn't work well so I'm commenting it out until I fix it.
  // "tab:cmd" : S.op("switch"),

  // Grid
  "esc:ctrl" : S.op("grid")
});

// Test Cases
S.src(".slate.test", true);
S.src(".slate.test.js", true);

// Log that we're done configuring
S.log("[SLATE] -------------- Finished Loading Config --------------");
