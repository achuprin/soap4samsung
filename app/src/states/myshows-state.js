define(["backbone", "nav-manager", "views/app-view", "views/tv-show", "models/tv-show"], function(Backbone, NavManager, AppView, views, models) {
    var shows = new models.Collection(),
        view = new views.List({
            collection: shows,
            cols: 6,
            emptyText: $('#myshows-empty-text').html()
        });

    return {
        name: "My Shows",
        show: function() {
            console.log("Showing #my");
            var router = require('router');

            AppView.setContent(view);
            NavManager.focus(AppView.getNavigation().getItem(router.routes.my));

            shows.favorites({
                success: function(collection, data, options) {
                    if (data.length !== 0) {
                        NavManager.focus(view);
                    }
                }
            });

            return view;
        },
        hide: function() {
            view.remove();
        }
    }
});