import BpmnViewer from 'bpmn-js/lib/Viewer';  //this is the viewer
import { Template } from 'meteor/templating';   //just blaze right now

import './colors.html';

let viever;

Template.bpmncolors.onCreated(function onCreated() {
    //nothing to do here yet
    console.log("created colors");

});

Template.bpmncolors.onRendered(function onRendered() {
    viewer = new BpmnViewer({ container: $('#diagram') });
    $.get('/packages/jkuester_bpmntools/lib/resources/pizza-collaboration.bpmn', showDiagram);
});

Template.bpmncolors.helpers({
    getViewer(){
        return viewer;
    }
});

function showDiagram(diagramXML) {
    viewer.importXML(diagramXML, function() {
        let overlays = viewer.get('overlays'),
            canvas = viewer.get('canvas'),
            elementRegistry = viewer.get('elementRegistry');

        // option 1: highlight via CSS class
        canvas.addMarker('OrderReceivedEvent', 'highlight');

        // option 2: highlight via overlay
        let shape = elementRegistry.get('CalmCustomerTask');
        let $overlayHtml = $('<div class="highlight-overlay">')
            .css({
                width: shape.width,
                height: shape.height
            });

        overlays.add('CalmCustomerTask', {
            position: {
                top: 0,
                left: 0
            },
            html: $overlayHtml
        });
    });
}
