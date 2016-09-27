# jkuester:bpmntools
Meteor Package (soon released on atmosphere) which wraps the bpmn  tools from http://bpmn.io / https://github.com/bpmn-io into a meteor package.

Provides templates to include the examples from https://github.com/bpmn-io/bpmn-js-examples.

### Important Note

This package is not stable and currently in a 'proof-of-concept' phase. Use at your own risk. Feel free to contribute and improve this package. 

### Install / Include

Add the package like any other:

```
$ meteor add jkuester:bpmntools
```

The npm dependencies are loaded via the package.
The templates can be included by simply using spacebars.

##### Example

Including the modeler is just using the spacebars

```
{{> bpmnmodeler}}
```

It should run out of the box. The template also provides a helper `getModeler` whcih returns the modeler object. From here you can further customize your modeler.

Other examples will follow.

### License

MIT (unless noted otherwise)
