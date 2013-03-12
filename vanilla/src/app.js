define(["views", "api", "exceptions", "router"], function(views, api, exceptions, router) {
    var body = $("body");
    return {
        createNavigation: function() {
            var navBar = new views.navigation.Navigation();

            navBar.add(router.routes.my, "Мои сериалы")
                .add(router.routes.all, "Все сериалы")
                .add(router.routes.settings, "Настройки");

            return navBar;
        },

        start: function() {
            var appView = this.view = views.App;

            body.html(appView.render().$el);
            appView.setHeader(this.createNavigation());

            try {
                // Показываем главный раздел "Мои сериалы"
                router.navigate(router.routes.my, {trigger: true});
            } catch (e) {
                if (e instanceof exceptions.NotLogginedException) {
                    router.navigate(router.routes.login, {trigger: true});
                } else {
                    throw e;
                }
            }
        }
    };
});