define(["views", "api", "exceptions", "router"], function(views, api, exceptions, router) {
    var body = $("body");

    function createNavigation() {
        var navBar = new views.navigation.Navigation();

        navBar.add(router.routes.my, "Мои сериалы")
            .add(router.routes.all, "Все сериалы")
            .add(router.routes.settings, "Настройки");

        return navBar;
    }

    return {
        start: function() {
            var appView = this.view = views.App;

            body.html(appView.render().$el);
            appView.setNavigation(createNavigation());

            // Показываем главный раздел "Мои сериалы"
            router.navigate(router.routes.my, {trigger: true});
        }
    };
});