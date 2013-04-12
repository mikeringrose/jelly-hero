requirejs.config({
    baseUrl: '..',
    paths: {
        app:    'app/javascripts',
        spec:   'spec'
    },
    shim: {
        'libs/underscore': {
            exports: '_'
        },
        'libs/processing': {
            exports: 'Processing'
        }
    }
});

requirejs(["spec/world", "spec/level", "spec/dude", "spec/hero"],
    function() {
        var jasmineEnv = jasmine.getEnv();
        jasmineEnv.updateInterval = 1000;

        var htmlReporter = new jasmine.HtmlReporter();

        jasmineEnv.addReporter(htmlReporter);

        jasmineEnv.specFilter = function(spec) {
            return htmlReporter.specFilter(spec);
        };

        jasmineEnv.execute();
    }
);