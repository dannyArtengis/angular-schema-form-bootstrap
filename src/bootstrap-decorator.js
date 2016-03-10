angular.module('schemaForm').config(['schemaFormDecoratorsProvider', 'sfBuilderProvider', 'sfPathProvider',
  function(decoratorsProvider, sfBuilderProvider, sfPathProvider) {
    var base = 'decorators/bootstrap/';

    var simpleTransclusion  = sfBuilderProvider.builders.simpleTransclusion;
    var ngModelOptions      = sfBuilderProvider.builders.ngModelOptions;
    var ngModel             = sfBuilderProvider.builders.ngModel;
    var sfField             = sfBuilderProvider.builders.sfField;
    var condition           = sfBuilderProvider.builders.condition;
    var array               = sfBuilderProvider.builders.array;

    var defaults = [sfField, ngModel, ngModelOptions, condition];

    var mdTabs              = mdTabsBuilder;

    decoratorsProvider.defineDecorator('bootstrapDecorator', {
      actions: {template: base + 'actions.html', builder: defaults},
      array: {template: base + 'array.html', builder: [sfField, ngModelOptions, ngModel, array, condition]},
      button: {template: base + 'submit.html', builder: defaults},
      checkbox: { template: base + 'checkbox.html', builder: defaults },
      checkboxes: {template: base + 'checkboxes.html', builder: [sfField, ngModelOptions, ngModel, array, condition]},
      conditional: {template: base + 'section.html', builder: [sfField, simpleTransclusion, condition]},
      'default': {template: base + 'default.html', builder: defaults},
      fieldset: {template: base + 'fieldset.html', builder: [sfField, simpleTransclusion, condition]},
      help: {template: base + 'help.html', builder: defaults},
      number: {template: base + 'default.html', builder: defaults},
      password: {template: base + 'default.html', builder: defaults},
      radiobuttons: {template: base + 'radio-buttons.html', builder: defaults},
      radios: {template: base + 'radios.html', builder: defaults},
      'radios-inline': {template: base + 'radios-inline.html', builder: defaults},
      section: {template: base + 'section.html', builder: [sfField, simpleTransclusion, condition]},
      select: {template: base + 'select.html', builder: defaults},
      submit: {template: base + 'submit.html', builder: defaults},
      tabarray: {template: base + 'tabarray.html', builder: [sfField, ngModelOptions, ngModel, array, condition]},
      tabs: {template: base + 'tabs.html', builder: [sfField, mdTabs, condition]},
      textarea: {template: base + 'textarea.html', builder: defaults}
    }, []);

    function mdTabsBuilder(args) {
      if (args.form.tabs && args.form.tabs.length > 0) {
        var mdTabsFrag = args.fieldFrag.querySelector('md-tabs');

        args.form.tabs.forEach(function(tab, index) {
          var mdTab = document.createElement('md-tab');
          mdTab.setAttribute('label', '{{' + args.path + '.tabs[' + index + '].title}}');
          var mdTabBody = document.createElement('md-tab-body');
          var childFrag = args.build(tab.items, args.path + '.tabs[' + index + '].items', args.state);
          mdTabBody.appendChild(childFrag);
          mdTab.appendChild(mdTabBody);
          mdTabsFrag.appendChild(mdTab);
        });
      }
    };

  }
]);