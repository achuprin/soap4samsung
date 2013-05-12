define(["backbone", "views/common", "router", "nav-manager"], function(Backbone, CommonViews, router, navManager) {
    var NavItem = CommonViews.CompositeView.extend({
        tagName: "li",
        template: _.template("<a href='#<%= url %>'><%= name %></a>"),

        initialize: function() {
            CommonViews.CompositeView.prototype.initialize.apply(this, arguments);
            var view = this;

            router.on("route:" + this.options.url, function() {
                // TODO: добавить выделение активного пункта при создании, а не только при сменен урла
                console.log("Selecting menu item", view);
                navManager.select(view);
            })
        },

        select: function(event) {
            console.log("Nav item clicked", this);
            CommonViews.CompositeView.prototype.select.apply(this, arguments);
            router.navigate(this.options.url, {trigger: true});
        },

        render: function() {
            this.$el.html(this.template(this.options));
            return this;
        }
    });


    var NavBar = CommonViews.CompositeView.extend({
        add: function(url, title) {
            return this.insert(new NavItem({
                url: url,
                name: title
            }));
        },

        render: function() {
            var ul = $("<ul class='nav'/>");
            _.each(this.children, function(child) {
                ul.append(child.render().$el);
            });
            this.$el.append(ul);

            return this;
        }
    });

    return {
        "Navigation": NavBar
    }
});