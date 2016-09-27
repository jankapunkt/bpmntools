Package.describe({
  name: 'jkuester:bpmntools',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Integrate the bpmn.io tools into a meteor package with templates.',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/jankapunkt/bpmntools',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.4.1.1');
  api.use('ecmascript');
  api.use('jquery');
  api.use('less');
  api.use(['templating'], 'client');
  api.addFiles( 'lib/stylesheets/app.css', [ 'client' ]);
  api.addFiles( 'lib/stylesheets/properties-panel.less', [ 'client' ], {isImport:false});
  api.addFiles( 'lib/templates/modeler/modeler.js', [ 'client' ] );
  api.addFiles( 'lib/templates/properties-panel/properties-panel.js', [ 'client' ] );
  api.mainModule('bpmntools.js');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('jkuester:bpmntools');
  api.mainModule('bpmntools-tests.js');
});

Npm.depends({
    "bpmn-js"       : "0.17.0",
    "diagram-js"    : "0.17.0",
    "lodash"        : "3.0.0",
    "matches-selector"  :   "1.0.0",
    "bpmn-js-properties-panel": "0.9.0",
    "camunda-bpmn-moddle": "0.8.1",
});
