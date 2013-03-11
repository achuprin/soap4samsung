define(["backbone"], function(Backbone) {
    var Router = Backbone.Router.extend({
        routes: {
            "my": "my",
            "all": "all",
            "settings": "settings",
            "login": "login"
        },

        my: function() {
            console.log("here");
        },

        login: function() {
            alert('login');
        }
    });

    return new Router();
});