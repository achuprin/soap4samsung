define(["backbone", "views/common"], function(Backbone, CommonViews) {
    var NavItem = CommonViews.CompositeView.extend({
        name: "",
        tagName: "li",

        render: function() {
            this.$el.html(_.template("<a href=''><%= name %></a>")(this.options));
            return this;
        }
    });


    var NavBar = CommonViews.CompositeView.extend({
        render: function() {
            var ul = $("<ul class='nav'/>");
            _.each(this.children, function(child) {
                var li = $("<li/>");
                child.setElement(li).render();
                ul.append(li);
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