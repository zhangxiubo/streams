/*\
title: $:/plugins/sq/streams/filters/stream_ancestors.js
type: application/javascript
module-type: filteroperator
\*/
(function(){
"use strict";

exports.stream_ancestors = function(source,operator,options) {
	var results = [];
	source(function(tiddler,title) {
		var ancestors = [],
			visited = new Set([title]),
			parent = tiddler && options.wiki.getTiddler(tiddler.fields.parent);
		while(parent && !visited.has(parent.fields.title)) {
			visited.add(parent.fields.title);
			ancestors.unshift(parent.fields.title);
			parent = options.wiki.getTiddler(parent.fields.parent);
		}
		$tw.utils.pushTop(results,ancestors);
	});
	return results;
};
})();
