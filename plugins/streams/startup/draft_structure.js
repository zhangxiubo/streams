/*\
title: $:/plugins/sq/streams/startup/draft_structure.js
type: application/javascript
module-type: startup
\*/
(function(){
"use strict";

exports.name = "streams-draft-structure";
exports.after = ["startup"];
exports.synchronous = true;
exports.startup = function() {
	var structure = require("$:/plugins/sq/streams/draft_structure.js");
	$tw.hooks.addHook("th-saving-tiddler",function(saved,draft) {
		return structure.merge($tw.wiki,saved,draft);
	});
};
})();
