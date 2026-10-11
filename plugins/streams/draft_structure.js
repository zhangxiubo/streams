/*\
title: $:/plugins/sq/streams/draft_structure.js
type: application/javascript
module-type: library
\*/
(function(){
"use strict";

var structure_fields = ["parent","stream-list","stream-type"];

exports.capture = function(draft) {
	var baseline = {};
	structure_fields.forEach(function(field) {
		baseline[field] = draft.getFieldString(field);
	});
	return new $tw.Tiddler(draft,{"draft.streams": JSON.stringify(baseline)});
};

exports.merge = function(wiki,saved,draft) {
	var fields = {"draft.streams": undefined},
		baseline = $tw.utils.parseJSONSafe(draft.fields["draft.streams"],null),
		current = wiki.getTiddler(draft.fields["draft.of"]);
	if(baseline && current) {
		structure_fields.forEach(function(field) {
			if(draft.getFieldString(field) === baseline[field]) {
				fields[field] = current.fields[field];
			}
		});
	}
	return new $tw.Tiddler(saved,fields);
};
})();
