define(["backbone", "nav-manager", "views/app-view", "views/tv-show", "models/tv-show"], function(Backbone, NavManager, AppView, views, models) {
    var shows = new models.Collection(),
        view = new views.List({
            collection: shows,
            cols: 6
        });

    return {
        name: "All Shows",
        show: function() {
            console.log("Showing #all");
            AppView.setContent(view);
            shows.fetch({
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