var module = function($, Backbone, views, navController) {
    var router = require("router");

    var app = {
        createNavigation: function() {
            var navBar = new views.navigation.Navigation();

            navBar.add(router.routes.my, "Мои сериалы")
                .add(router.routes.all, "Все сериалы")
                .add(router.routes.settings, "Настройки");

            return navBar;
        },

        start: function() {
            var appView = new views.App();

            $("body").html(appView.render().$el);
            appView.setHeader(this.createNavigation());

            navController.focus(appView);
            Backbone.history.start();
            router.navigate(router.routes.my, {trigger: true});
        }
    };

    $(function() {
        app.start();
    });
};

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

require(
    [
        "jquery",
        "backbone",
        "views",
        "nav-manager"
    ],
    module
);
