define(["backbone", "main", "views/login"], function(Backbone, app, LoginView) {
    var Router = Backbone.Router.extend({
        routes: {
            "my": "my",
            "all": "all",
            "settings": "settings",
            "login": "login"
        },

        my: function() {
        },

        login: function() {
//            var body = $("body");
//            app.view.append(new LoginView());
        }
    });

    return new Router();
});