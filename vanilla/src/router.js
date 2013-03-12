define(["backbone", "api", "views/app-view", "views/login"], function(Backbone, api, AppView, LoginView) {
    var Router = Backbone.Router.extend({
        routes: {
            "my": "my",
            "all": "all",
            "settings": "settings",
            "login": "login"
        },

        my: function() {
            console.log("Dispatching #my");
            api.shows.all();
        },

        login: function() {
            AppView.append(new LoginView());
        }
    });

    return new Router();
});