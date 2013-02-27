/**
 * @param {jQuery} $
 * @param {Node} Widget
 * @param {Manager} FocusManager
 */
var module = function($, Widget, FocusManager, tvshow, views, TvShowViews, navigation) {
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

        var pp = new tvshow.Model({
            "id": 1,
            "name": "Private Practice",
            "code": "pp"
        });
        var house = new tvshow.Model({
            "id": 2,
            "name": "House M.D.",
            "code": "house"
        });
        var wire = new tvshow.Model({
            "id": 3,
            "name": "The Wire",
            "code": "wire"
        });
        var misfits = new tvshow.Model({
            "id": 4,
            "name": "Msfits",
            "code": "misfits"
        });
        var tvshows = new tvshow.Collection();
        var tvShowsList = new TvShowViews.List({
            "cols": 2,
            "el": main.$el,
            "collection": tvshows
        });
        tvShowsList.render();
        tvshows.add(pp);
        tvshows.add(house);
        tvshows.add(wire);
        tvshows.add(misfits);
        main.insert(tvShowsList);

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
        "views/common",
        "views/tv-show",
        "views/navigation"
    ],
    module
);
