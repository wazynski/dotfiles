// Configs
S.cfga({
  "defaultToCurrentScreen" : true,
  "secondsBetweenRepeat" : 0.1,
  "checkDefaultsOnLoad" : true,
  "focusCheckWidthMax" : 3000,
  "orderScreensLeftToRight" : true
});

// Monitors
var monTbolt  = "2560x1440";
var monLaptop = "1440x900";

// Operations
var lapFull = S.op("move", {
  "screen" : monLaptop,
  "x" : "screenOriginX",
  "y" : "screenOriginY",
  "width" : "screenSizeX",
  "height" : "screenSizeY"
});

var tboltFull = S.op("move", {
  "screen" : monTbolt,
  "x" : "screenOriginX",
  "y" : "screenOriginY",
  "width" : "screenSizeX",
  "height" : "screenSizeY"
});


var tboltLeft = tboltFull.dup({ "width" : "screenSizeX/2" });
var tboltRight = tboltLeft.dup({ "x" : "screenOriginX+(screenSizeX/2)" });

var tboltThirdLeft = tboltFull.dup({ "width" : "screenSizeX/3" });
var tboltThirdMid = tboltThirdLeft.dup({ "x" : "screenOriginX+(screenSizeX/3)" });
var tboltThirdRight = tboltThirdLeft.dup({ "x" : "screenOriginX+((screenSizeX/3)*2)" });

var tboltTwoThirdsLeft = tboltFull.dup({ "width" : "(screenSizeX*2)/3" });
var tboltTwoThirdsRight =  tboltTwoThirdsLeft.dup({ "x" : "screenOriginX+((screenSizeX*2)/3)" });

var tboltQuaterLeft = tboltFull.dup({ "width" : "screenSizeX/4" });
var tboltQuaterMidL = tboltThirdLeft.dup({ "x" : "screenOriginX+(screenSizeX/4)" });
var tboltQuaterMidR = tboltThirdLeft.dup({ "x" : "screenOriginX+((screenSizeX/4)*2)" });
var tboltQuaterRight = tboltThirdLeft.dup({ "x" : "screenOriginX+((screenSizeX/3)*3)" });

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
    "operations" : [lapTwoThirdsLeft],
    "repeat" : true
  },
  "Atom" : {
    "operations" : [tboltRight],
    "repeat" : true
  },
  "Messages" : {
    "operations" : [tboltThirdRight],
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
  "Airmail" : {
    "operations" : [lapFull],
    "repeat" : true
  },
  "Terminal" : {
    "operations" : [lapFull],
    "repeat" : true
  },
  "Reeder" : {
    "operations" : [lapFull],
    "repeat" : true
  },
  "Slack" : {
    "operations" : [tboltTwoThirdsLeft],
    "repeat" : true
  },
  "SourceTree" : {
    "operations" : [tboltLeft],
    "repeat" : true
  },
  "Evernote" : {
    "operations" : [tboltQuaterRight],
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
  "Evernote" : {
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
  // "right:ctrl" : S.op("resize", { "width" : "+10%", "height" : "+0" }),
  // "left:ctrl" : S.op("resize", { "width" : "-10%", "height" : "+0" }),
  // "up:ctrl" : S.op("resize", { "width" : "+0", "height" : "-10%" }),
  // "down:ctrl" : S.op("resize", { "width" : "+0", "height" : "+10%" }),
  // "right:alt" : S.op("resize", { "width" : "-10%", "height" : "+0", "anchor" : "bottom-right" }),
  // "left:alt" : S.op("resize", { "width" : "+10%", "height" : "+0", "anchor" : "bottom-right" }),
  // "up:alt" : S.op("resize", { "width" : "+0", "height" : "+10%", "anchor" : "bottom-right" }),
  // "down:alt" : S.op("resize", { "width" : "+0", "height" : "-10%", "anchor" : "bottom-right" }),

  // Push Bindings
  // NOTE: some of these may *not* work if you have not removed the expose/spaces/mission control bindings
  // "right:ctrl;shift" : S.op("push", { "direction" : "right", "style" : "bar-resize:screenSizeX/2" }),
  // "left:ctrl;shift" : S.op("push", { "direction" : "left", "style" : "bar-resize:screenSizeX/2" }),
  // "up:ctrl;shift" : S.op("push", { "direction" : "up", "style" : "bar-resize:screenSizeY/2" }),
  // "down:ctrl;shift" : S.op("push", { "direction" : "down", "style" : "bar-resize:screenSizeY/2" }),

  // Nudge Bindings
  // NOTE: some of these may *not* work if you have not removed the expose/spaces/mission control bindings
  // "right:ctrl;alt" : S.op("nudge", { "x" : "+10%", "y" : "+0" }),
  // "left:ctrl;alt" : S.op("nudge", { "x" : "-10%", "y" : "+0" }),
  // "up:ctrl;alt" : S.op("nudge", { "x" : "+0", "y" : "-10%" }),
  // "down:ctrl;alt" : S.op("nudge", { "x" : "+0", "y" : "+10%" }),

  // Throw Bindings
  // NOTE: some of these may *not* work if you have not removed the expose/spaces/mission control bindings
  // "pad1:ctrl;alt" : S.op("throw", { "screen" : "2", "width" : "screenSizeX", "height" : "screenSizeY" }),
  // "pad2:ctrl;alt" : S.op("throw", { "screen" : "1", "width" : "screenSizeX", "height" : "screenSizeY" }),
  // "pad3:ctrl;alt" : S.op("throw", { "screen" : "0", "width" : "screenSizeX", "height" : "screenSizeY" }),
  // "right:ctrl;alt;cmd" : S.op("throw", { "screen" : "right", "width" : "screenSizeX", "height" : "screenSizeY" }),
  // "left:ctrl;alt;cmd" : S.op("throw", { "screen" : "left", "width" : "screenSizeX", "height" : "screenSizeY" }),
  // "up:ctrl;alt;cmd" : S.op("throw", { "screen" : "up", "width" : "screenSizeX", "height" : "screenSizeY" }),
  // "down:ctrl;alt;cmd" : S.op("throw", { "screen" : "down", "width" : "screenSizeX", "height" : "screenSizeY" }),

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
  "esc:cmd" : S.op("hint"),

  // Switch currently doesn't work well so I'm commenting it out until I fix it.
  "tab:cmd" : S.op("switch"),

  // Grid
  "esc:ctrl" : S.op("grid")
});

// Test Cases
S.src(".slate.test", true);
S.src(".slate.test.js", true);

// Log that we're done configuring
S.log("[SLATE] -------------- Finished Loading Config --------------");
