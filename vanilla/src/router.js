define(["backbone", "api", "nav-manager", "views/app-view", "views/login", "views/tv-show", "models/tv-show"], function(Backbone, api, navManager, AppView, LoginView, tvshows, tvshowmodels) {
    var Router = Backbone.Router.extend({
        routes: {
            "my": "my",
            "all": "all",
            "settings": "settings",
            "login": "login"
        },

        my: function() {
            console.log("Dispatching #my");
            var shows = new tvshowmodels.Collection();
            var view = new tvshows.List({
                collection: shows,
                cols: 8
            });
            AppView.setContent(view);
            shows.fetch();
            navManager.focus(view);
        },

        login: function() {
            AppView.append(new LoginView());
        }
    });

    return new Router();
});