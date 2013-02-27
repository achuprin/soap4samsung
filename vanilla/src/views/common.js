define(["backbone"], function(Backbone) {
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
            var lastNode = nodes[nodes.length - 1];
            if (lastNode) {
                lastNode.connect(2, newNode);
            }
        },

        /**
         * @param {View} view
         */
        insert: function(view) {
            this.connectionStrategy.call(this, this.children, view);
            view.setParent(this);
            this.children.push(view);

            return this;
        },

        focus: function() {
            this.$el.addClass("active")
        },

        blur: function() {
            this.$el.removeClass("active");
        },

        onClick: function() {
            console.log("click");
        }
    });

    return {
        "CompositeView": View,

        "VerticalView": View.extend({
            "connectionStrategy": function(nodes, newNode) {
                var lastNode = nodes[nodes.length - 1];
                if (lastNode) {
                    lastNode.connect(3, newNode);
                }
            }
        })
    }
});