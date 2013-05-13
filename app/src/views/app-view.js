define(["views/common"], function(CommonViews) {
    var AppView = CommonViews.VerticalView.extend({
        id: "root",
        className: "root",
        header: _.template($("#template-header").html()),
        content: new CommonViews.VerticalView({
            id: 'content',
            className: 'content'
        }),

        initialize: function() {
            CommonViews.VerticalView.prototype.initialize.call(this, arguments);
            console.log("Initialize AppView");
        },

        setHeader: function(view) {
            $(".header-content").html(view.render().$el);
            this.insert(view);
        },

        setContent: function(view) {
            this.content.html(view);
            return this;
        },

        render: function() {
            this.$el.append(this.header()).append(this.content.render().$el);
            return this;
        }
    });

    return new AppView();
});