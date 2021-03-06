define(["backbone", "api", "views/common", "nav-manager"], function(Backbone, api, common, navManager) {
    var SubmitButton = common.CompositeView.extend({
        select: function() {
            common.CompositeView.prototype.select.call(this, arguments);
            this.$el.parents('.modal').find('form').submit();
        }
    });

    return common.VerticalView.extend({
        className: "fullscreen-view",
        template: _.template($("#template-login").html()),

        events: {
            "submit form": "submit"
        },

        initialize: function() {
            common.VerticalView.prototype.initialize.call(this, arguments);
        },

        render: function() {
            common.VerticalView.prototype.render.call(this, arguments);
            this.$el.html(this.template());
            this.username = new common.CompositeView({el: this.$('#username')});
            this.password = new common.CompositeView({el: this.$('#password')});
            this.submitButton = new SubmitButton({el: this.$('#submit')});

            this.insert(this.username)
                .insert(this.password)
                .insert(this.submitButton);

            navManager.focus(this);

            return this;
        },

        submit: function(e) {
            var self = this;
            var username = this.username.$el.val();
            var password = this.password.$el.val();
            var error = $("#login-error", self.$el);

            error.hide();
            api.user.login(username, password).done(function(data) {
                if (data["ok"] == 0) {
                    navManager.focus(self.username);
                    error.show();
                } else {
                    self.remove();
                    window.history.back();
                }
            });

            return false;
        }
    });
});