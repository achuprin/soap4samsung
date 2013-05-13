require.config({
    paths: {
        'underscore': '../lib/underscore',
        'backbone': '../lib/backbone'
    },
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ["underscore"],
            exports: "Backbone"
        }
    }
});

require(["jquery", "backbone", "app", 'debugger'], function($, Backbone, app, debug) {
    $(function() {
        Backbone.history.start();
        app.start();
        debug.init();
    });

    return app;
});
