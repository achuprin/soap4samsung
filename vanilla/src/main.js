/**
 * @param {jQuery} $
 * @param {Node} Widget
 * @param {Manager} FocusManager
 */
var module = function($, Widget, FocusManager, tvshow, views) {
    $(function() {
        //        var root = new Widget($("#root"));
        //        var header = new Widget($("header"));
        //        var main = new Widget($("#main"));
        //        var footer = $("footer");

        var navigation = new views.Navigation({el: $("#nav")});
        var myNavItem = new views.NavItem({"name": "Мои сериалы"});
        var allNavItem = new views.NavItem({"name": "Все сериалы"});
        var settingNavItem = new views.NavItem({"name": "Настройки"});

        navigation.insert(myNavItem)
            .insert(allNavItem)
            .insert(settingNavItem)
            .render();


        var focusManager = new FocusManager(myNavItem);

        $(document).keydown(function(e) {
            switch (e.keyCode) {
                case 37:
                case 38:
                case 39:
                case 40:
                    focusManager.move(e);
                    e.preventDefault();
                    break;
                case 13:
                    focusManager.click(e);
                    e.preventDefault();
                    break;
            }

        });
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
        "node",
        "focus-manager",
        "models/tv-show",
        "views/navigation"
    ],
    module
);
