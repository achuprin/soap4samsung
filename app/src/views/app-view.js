define(["views/common"], function(CommonViews) {
    var Header = CommonViews.CompositeView.extend({
        setNavigation: function(navView) {
            $(".header-content", this.$el).html(navView.render().$el);
            this.insert(navView);
            return this;
        },

        render: function() {
            this.$el.html(_.template($("#template-header").html()));
            return this;
        }
    });

    var AppView = CommonViews.VerticalView.extend({
        id: "root",
        className: "root",
        header: new Header(),
        content: new CommonViews.VerticalView({
            id: 'content',
            className: 'content'
        }),

        initialize: function() {
            CommonViews.VerticalView.prototype.initialize.call(this, arguments);
            this.insert(this.header);
            this.insert(this.content);
            console.log("Initialized AppView");
        },

        setNavigation: function(view) {
            this.navigation = view;
            this.header.setNavigation(view);
            return this;
        },

        getNavigation: function() {
            return this.navigation;
        },

        setContent: function(view) {
            this.content.html(view);
            return this;
        },

        render: function() {
            this.$el
                .append(this.header.render().$el)
                .append(this.content.render().$el);
            return this;
        }
    });

    return new AppView();
});