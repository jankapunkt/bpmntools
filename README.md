# jkuester:bpmntools

[![Build Status](https://travis-ci.org/jankapunkt/bpmntools.svg?branch=master)](https://travis-ci.org/jankapunkt/bpmntools)

Meteor Package which wraps the bpmn  tools from http://bpmn.io / https://github.com/bpmn-io into a meteor package.

Provides templates to include the examples from https://github.com/bpmn-io/bpmn-js-examples.

### Important Note

This package is working but still in a 'proof-of-concept' phase. Use at your own risk. Feel free to contribute and improve this package. 

### Install / Include

Add the package like any other:

```
$ meteor add jkuester:bpmntools
```

The npm dependencies are loaded via the package.
The templates can be included by simply using spacebars.

##### Using the Examples

Including the examples is easy by just including the spacebar templates. The following templates are currently available:

###### Modeler

```
{{> bpmnmodeler}}
```

It should run out of the box. The template also provides a helper `getModeler` which returns the modeler object. From here you can further customize your modeler.


###### Modeler with Properties-Panel

```
{{> propertiespanel}}
```

The modeler itself runs out of the box. The properties Panel is also working. There is an issue left - the .less Code is still not loaded, since this is related to a Meteor problem with loading external less in a package from a node_module.

###### Colors

```
{{> bpmncolors}}
```

Includes a static viewer with a loaded bpmn schema and highlights some elements.


### License

MIT (unless noted otherwise)
