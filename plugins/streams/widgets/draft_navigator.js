/*\
title: $:/plugins/sq/streams/widgets/draft_navigator.js
type: application/javascript
module-type: widget-subclass
\*/
(function(){
"use strict";

var Navigator = require("$:/core/modules/widgets/navigator.js").navigator,
	structure = require("$:/plugins/sq/streams/draft_structure.js");

exports.baseClass = "navigator";
exports.constructor = function(parseTreeNode,options) {
	this.initialise(parseTreeNode,options);
};
exports.prototype = {
	makeDraftTiddler: function(title) {
		var existing = this.wiki.findDraft(title),
			draft = Navigator.prototype.makeDraftTiddler.call(this,title);
		if(!existing && this.wiki.getTiddlerText("$:/config/sq/streams/enable_edit_mode") === "yes") {
			draft = structure.capture(draft);
			this.wiki.addTiddler(draft);
		}
		return draft;
	}
};
})();
