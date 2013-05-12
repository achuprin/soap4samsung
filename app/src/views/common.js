define(["backbone", "../nav-manager"], function(Backbone, navManager) {
    var direction = {
        LEFT: 0,
        TOP: 1,
        RIGHT: 2,
        BOTTOM: 3
    };

    var View = Backbone.View.extend({
        initialize: function() {
            this.parent = null;
            this.siblings = new Array(4);
            this.children = [];
        },

        setParent: function(parent) {
            this.parent = parent;
        },

        sibling: function(direction) {
            var siblingView = this.siblings[direction];

            if (siblingView) {
                return siblingView.firstChild();
            } else if (this.parent) {
                return this.parent.sibling(direction);
            }
        },

        firstChild: function() {
            if (this.children.length !== 0) {
                return this.children[0].firstChild();
            }

            return this;
        },

        connect: function(direction, view) {
            var oppositeDirection = direction - 2;
            var sibling = this.siblings[direction];

            if (sibling) {
                sibling.siblings[oppositeDirection] = view;
            }

            this.siblings[direction] = view;
            view.siblings[oppositeDirection] = this;

            return this;
        },

        connectionStrategy: function(nodes, newNode) {
            if (nodes.length !== 0) {
                var lastNode = nodes[nodes.length - 1];
                if (lastNode) {
                    lastNode.connect(direction.RIGHT, newNode);
                }
            }
        },

        html: function(view) {
            this.insert(view);
            this.$el.html(view.render().$el);
        },

        append: function(view) {
            this.insert(view);
            this.$el.append(view.render().$el);

            return this;
        },

        insert: function(view) {
            this.connectionStrategy.call(this, this.children, view);
            view.setParent(this);
            this.children.push(view);

            return this;
        },

        focus: function() {
            this.$el.addClass("active").focus();
        },

        blur: function() {
            this.$el.removeClass("active").blur();
        },

        unselect: function() {
            this.$el.removeClass("selected");
        },

        select: function(event) {
            this.$el.addClass("selected");
        },

        remove: function() {
            Backbone.View.prototype.remove.call(this, arguments);
            navManager.focus(this.parent);
            _.each(this.children, function(child) {
                child.remove()
            });
        }
    });

    return {
        "CompositeView": View,

        "VerticalView": View.extend({
            "connectionStrategy": function(nodes, newNode) {
                var lastNode = nodes[nodes.length - 1];
                if (lastNode) {
                    lastNode.connect(direction.BOTTOM, newNode);
                }
            }
        }),

        "GridView": View.extend({
            connectionStrategy: function(nodes, newNode) {
                var lastNode = nodes[nodes.length - 1];
                var cols = this.options.cols;

                if (lastNode) {
                    lastNode.connect(2, newNode);
                }

                if (nodes.length >= cols) {
                    var upperNode = nodes[nodes.length - cols];
                    upperNode.connect(3, newNode);
                }
            }
        })
    }
});