define(["backbone", "nav-manager", "views/app-view", "views/tv-show", "models/tv-show"], function(Backbone, NavManager, AppView, views, models) {
    var shows = new models.Collection();
    var view = new views.List({
        collection: shows,
        cols: 8
    });

    return {
        name: "My Shows",
        show: function() {
            console.log("Showing #my");
            AppView.setContent(view);
            shows.fetch({
                success: function() {
                    NavManager.focus(view);
                }
            });

            return view;
        },
        hide: function() {
            view.remove();
        }
    }
});