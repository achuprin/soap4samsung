define(["backbone", "views/common"], function(Backbone, CommonViews) {
    var NavItem = CommonViews.CompositeView.extend({
        name: "",
        tagName: "li",

        render: function() {
            return this.$el.html(_.template("<a href=''><%= name %></a>")(this.options));
        },

        focus: function(e) {
            CommonViews.CompositeView.prototype.focus.call(this, arguments);
            this.onClick(e);
        }
    });


    var NavBar = CommonViews.CompositeView.extend({
        render: function() {
            var ul = $("<ul class='nav'/>");
            _.each(this.children, function(child) {
                ul.append(child.render())
            });
            this.$el.append(ul);

            return this;
        }
    });

    return {
        "NavItem": NavItem,
        "Navigation": NavBar
    }
});