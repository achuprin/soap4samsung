var deps = ["backbone", "api", "exceptions", "nav-manager", "states/login-state", "states/myshows-state", "states/allshows-state"];
define(deps, function(Backbone, api, exceptions, navManager, LoginState, MyShowsState, AllShowsState) {
    _.extend(Backbone.Router.prototype, {
        /**
         * Переопределен метод навигации, чтобы отлавливать исключение и редиректить на логин-стейт.
         */
        route: function(route, name, callback) {
            var self = this;
            if (!_.isRegExp(route)) route = this._routeToRegExp(route);
            if (!callback) callback = this[name];
            Backbone.history.route(route, _.bind(function(fragment) {
                try {
                    var args = this._extractParameters(route, fragment);
                    this.trigger.apply(this, ['route:' + name].concat(args));
                    this.trigger('route', name, args);
                    Backbone.history.trigger('route', this, name, args);
                    callback && callback.apply(this, args);
                } catch (e) {
                    if (e instanceof exceptions.NotLogginedException) {
                        console.log("NotLogginedException occured");
                        router.navigate(router.routes.login, {trigger: true});
                    } else {
                        throw e;
                    }
                }
            }, this));
            return this;
        }
    });

    var currentState;
    var Router = Backbone.Router.extend({
        routes: {
            "my": "my",
            "all": "all",
            "settings": "settings",
            "login": "login"
        },

        my: function() {
            changeState(MyShowsState);
        },

        all: function() {
            changeState(AllShowsState);
        },

        login: function() {
            changeState(LoginState);
        }
    });
    var router = new Router();

    function changeState(newState) {
        console.log("Changing state: current is", currentState, newState);
        if (currentState) {
            currentState.hide();
        }
        newState.show();
        currentState = newState;
    }
    return router;
});