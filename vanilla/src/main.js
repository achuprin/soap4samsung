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

require(["jquery", "backbone", "app"], function($, Backbone, app) {
    Backbone.history.start();

    $(function() {
        app.start();
    });

    return app;
});
