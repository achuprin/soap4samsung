define(["views/common"], function(CommonViews) {
    return CommonViews.VerticalView.extend({
        id: "root",
        className: "root",
        header: _.template($("#template-header").html()),
        content: $("<div/>").addClass("content"),

        setHeader: function(view) {
            $(".header-content").html(view.render().$el);
            this.insert(view);
        },

        setContent: function(view) {
            this.content.html(view.render().$el);
            this.insert(view);
        },

        render: function() {
            this.$el.append(this.header()).append(this.content);
            return this;
        }
    });
});