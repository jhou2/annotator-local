'use strict';
var ann, data, annotations, temp, count = 0;

var save = function(annotations) {
  var convert = function(annotation, id){
    var comment;

    comment = {
        id: id,
        annotator_schema_version: "v1.0",
        text: annotation.text,
        quote: annotation.quote,
        ranges: [{
          end: annotation.ranges[0].end,
          endOffset: annotation.ranges[0].endOffset,
          start: annotation.ranges[0].start,
          startOffset: annotation.ranges[0].startOffset
        }],
        uri: Location.href,
    };
    return comment;
  }

  var result = {};

  for (var i = 0; i < annotations.length; i++) {
    result[i] = convert(annotations[i], i);
  }

  localStorage.setItem('annData', JSON.stringify(result));
}

try {
  data = JSON.parse(localStorage.getItem("annData"));
} catch (e) {
  console.log(e);
  data = {};
}


console.log(data);

annotations = [];

for (var i in data) {
  annotations.push(data[i]);
  count++;
}

console.log(annotations);

Annotator.Plugin.localsave = function(element) {
                return {
                    pluginInit : function () {
                        this.annotator.subscribe("annotationCreated", function (annotation) {
                            console.log("The annotation: %o has just been created!", annotation);
                            annotations.push(annotation);
                            save(annotations);
                            count++;
                          })
                          .subscribe("annotationUpdated", function (annotation) {
                            console.log("The annotation: %o has just been updated!", annotation);

                          })
                          .subscribe("annotationDeleted", function (annotation) {
                            console.log("The annotation: %o has just been deleted!", annotation);
                          })
                    }
                }
};

ann = $('body').annotator();
ann.annotator("addPlugin", "localsave"); 

if (annotations.length)
  ann.annotator("loadAnnotations", annotations);

// ann("loadAnnotations", comments);  