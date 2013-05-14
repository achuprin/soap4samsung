define(["views", "api", "exceptions", "router"], function(views, api, exceptions, router) {
    var body = $("body"),
        navBar = new views.navigation.Navigation();

    navBar.add(router.routes.my, "Мои сериалы")
        .add(router.routes.all, "Все сериалы");
        // .add(router.routes.settings, "Настройки");

    return {
        start: function() {
            var appView = this.view = views.App;

            body.html(appView.render().$el);
            appView.setNavigation(navBar);

            // Показываем главный раздел "Мои сериалы"
            router.navigate(router.routes.my, {trigger: true});
        }
    };
});