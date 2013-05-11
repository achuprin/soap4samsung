define(["backbone", "views/login", "views/app-view"], function(Backbone, LoginView, AppView) {
    var view = new LoginView();

    return {
        name: "login",
        show: function() {
            return AppView.append(view);
        },
        hide: function() {
            view.remove();
        }
    }
});