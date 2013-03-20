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

    $(function() {
        app.start();
        Backbone.history.start();
    });

    return app;
});
