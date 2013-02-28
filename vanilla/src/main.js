/**
 * @param {jQuery} $
 * @param {Manager} FocusManager
 */
var module = function($, FocusManager, api, tvshow, views, TvShowViews, navigation) {
    $(function() {
        var root = new views.VerticalView({el: $("#root")});
        var header = new views.CompositeView({el: $("header")});
        var main = new views.CompositeView({el: $("#main")});
        var footer = $("footer");

        root.insert(header).insert(main);

        var navBar = new navigation.Navigation({el: $("#nav")});
        var myNavItem = new navigation.NavItem({"name": "Мои сериалы"});
        var allNavItem = new navigation.NavItem({"name": "Все сериалы"});
        var settingNavItem = new navigation.NavItem({"name": "Настройки"});

        header.insert(navBar);
        navBar.insert(myNavItem)
            .insert(allNavItem)
            .insert(settingNavItem)
            .render();

        var focusManager = new FocusManager(myNavItem);

        var tvshows = new tvshow.Collection();
        var tvShowsList = new TvShowViews.List({
            "cols": 2,
            "el": main.$el,
            "collection": tvshows
        });

//        tvshows.fetch();
        tvShowsList.render();
        main.insert(tvShowsList);

        api.user.login("Chupa", "235707");

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
        "focus-manager",
        "api",
        "models/tv-show",
        "views/common",
        "views/tv-show",
        "views/navigation"
    ],
    module
);
