'use strict';
var ann, data;

data = JSON.parse(localStorage.getItem("annotatorData"));

console.log(data);

Annotator.Plugin.localsave = function(element) {
                return {
                    pluginInit : function () {
                        this.annotator.subscribe("annotationCreated", function (annotation) {
                            console.log("The annotation: %o has just been created!", annotation);

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

// ann("loadAnnotations", comments);  