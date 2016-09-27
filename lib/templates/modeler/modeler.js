import _ from 'lodash';
import BpmnModeler from 'bpmn-js/lib/Modeler';  //this is the modeler
import { Template } from 'meteor/templating';   //just blaze right now

import 'diagram-js/assets/diagram-js.css';      //import the proper css
import 'bpmn-js/assets/bpmn-font/css/bpmn-embedded.css';    //import icon font
import './modeler.html'; //import our template

////////////////////////////////////////////////////////////////////////////////

let modeler;    //bpmnmodeler variable
let container;  //wrapping everything
let canvas;     //drawing takes place here


const newDiagramXML =
'<?xml version="1.0" encoding="UTF-8"?>' +
'<bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' +
    'xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" '+
    'xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" '+
    'xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" '+
    'xmlns:di="http://www.omg.org/spec/DD/20100524/DI" '+
    'xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd" '+
    'id="sample-diagram" targetNamespace="http://bpmn.io/schema/bpmn">'+
  '<bpmn2:process id="Process_1" isExecutable="false">'+
    '<bpmn2:startEvent id="StartEvent_1"/>'+
  '</bpmn2:process>'+
  '<bpmndi:BPMNDiagram id="BPMNDiagram_1">'+
    '<bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">'+
      '<bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">'+
        '<dc:Bounds height="36.0" width="36.0" x="412.0" y="240.0"/>'+
      '</bpmndi:BPMNShape>'+
    '</bpmndi:BPMNPlane>'+
  '</bpmndi:BPMNDiagram>'+
'</bpmn2:definitions>';

////////////////////////////////////////////////////////////////////////////////

Template.bpmnmodeler.onCreated(function onCreated() {
    //nothing to do here yet
});

Template.bpmnmodeler.onRendered(function onRendered() {
    container = $('#js-drop-zone');
    canvas = $('#js-canvas');
    modeler = new BpmnModeler({container:canvas});
    let downloadLink = $('#js-download-diagram');
    let downloadSvgLink = $('#js-download-svg');

    $('.buttons a').click(function(e) {
        if (!$(this).is('.active')) {
            e.preventDefault();
            e.stopPropagation();
        }
    });

    let  setEncoded = function(link, name, data) {
        let encodedData = encodeURIComponent(data);
        if (data) {
            link.addClass('active').attr({
                'href': 'data:application/bpmn20-xml;charset=UTF-8,' + encodedData,
                'download': name
            });
        } else {
            link.removeClass('active');
        }
    };

    let exportArtifacts = _.debounce(function() {
        saveSVG(function(err, svg) {
            setEncoded(downloadSvgLink, 'diagram.svg', err ? null : svg);
        });
        saveDiagram(function(err, xml) {
            setEncoded(downloadLink, 'diagram.bpmn', err ? null : xml);
        });
    }, 500);
    modeler.on('commandStack.changed', exportArtifacts);
});


Template.bpmnmodeler.helpers({
    getModeler(){
        return modeler;
    }
});

Template.bpmnmodeler.events({
    'click #js-create-diagram':function(event, templateInstance){
        event.stopPropagation();
        event.preventDefault();
        createNewDiagram();
    },
});

////////////////////////////////////////////////////////////////////////////////

//  CREATE / IMPORT

function createNewDiagram() {
    openDiagram(newDiagramXML);
}

function openDiagram(xml) {
      modeler.importXML(xml, function(err) {
            if (err) {
                container
                    .removeClass('with-diagram')
                    .addClass('with-error');
                container.find('.error pre').text(err.message);
                console.error(err);
            } else {
                container
                    .removeClass('with-error')
                    .addClass('with-diagram');
            }
      });
}

////////////////////////////////////////////////////////////////////////////////

//  EXPORT

function saveSVG(done) {
    modeler.saveSVG(done);
}

function saveDiagram(done) {
    modeler.saveXML({ format: true }, function(err, xml) {
        done(err, xml);
    });
}

////////////////////////////////////////////////////////////////////////////////
