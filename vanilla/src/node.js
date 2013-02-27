define(function() {
    /**
     * @param element {Element}
     * @constructor
     * @class Widget
     */
    var Widget = function(element) {
        this.element = element;

        this.leftNode = null;
        this.topNode = null;
        this.rightNode = null;
        this.bottomNode = null;
        this.childNodes = [];
        this.parentNode = window.document;
    };

    Widget.prototype = {
        left: function() {
            var leftNode = this.leftNode;

            if (leftNode) {
                if (leftNode.childNodes.length !== 0) {
                    return leftNode.childNodes[0];
                }

                return leftNode;
            } else if (this.parentNode) {
                return this.parentNode.left();
            }
        },

        top: function() {
            var topNode = this.topNode;

            if (topNode) {
                if (topNode.children().length !== 0) {
                    return topNode.children()[0];
                }
                return topNode;
            } else if (this.parentNode) {
                return this.parentNode.top();
            }
        },

        right: function() {
            var rightNode = this.rightNode;

            console.log(rightNode, this);
            if (rightNode) {
                if (rightNode.childNodes.length !== 0) {
                    return rightNode.childNodes[0];
                }
                return rightNode;
            } else if (this.parentNode) {
                return this.parentNode.right();
            }
        },

        bottom: function() {
            var bottomNode = this.bottomNode;

            if (bottomNode) {
                if (bottomNode.children().length !== 0) {
                    return bottomNode.children()[0];
                }
                return bottomNode;
            } else if (this.parentNode) {
                return this.parentNode.bottom();
            }
        },

        child: function() {
            if (this.childNodes.length === 1) {
                return this.childNodes[0].children();
            }

            return this.childNodes[0];
        },

        children: function() {
            if (this.childNodes.length === 1) {
                return this.childNodes[0].children();
            }

            return this.childNodes;
        },

        parent: function() {
            return this.parentNode;
        },

        /**
         * @param node {Widget}
         */
        append: function(node) {
            node.parentNode = this;

            if (this.childNodes.length === 0) {
                this.childNodes[0] = node;
            } else {
                this.childNodes[this.childNodes.length - 1].appendToRight(node);
                this.childNodes[this.childNodes.length] = node;
            }

            return this;
        },

        /**
         * @param anotherNode {Widget}
         */
        appendBefore: function(anotherNode) {
            if (anotherNode.leftNode) {
                anotherNode.leftNode.rightNode = this;
            }
            anotherNode.leftNode = this;
            this.rightNode = anotherNode;
        },

        /**
         * @param anotherNode {Widget}
         */
        appendToRight: function(anotherNode) {
            console.log("add to right from", this.element, anotherNode.element);
            if (this.rightNode) {
                this.rightNode.leftNode = anotherNode;
            }

            this.rightNode = anotherNode;
            anotherNode.leftNode = this;

            return this;
        },

        appendToBottom: function(anotherNode) {
            console.log("add to bottom of", this.element, anotherNode.element);
            if (this.bottomNode) {
                this.bottomNode.topNode = anotherNode;
            }

            this.bottomNode = anotherNode;
            anotherNode.topNode = this;
            anotherNode.parentNode = this.parentNode;

            return this;
        },

        insert: function(anotherNode) {
            if (this.childNode) {
                anotherNode.appendBefore(this.childNode);
            }

            this.childNode = anotherNode;
            anotherNode.parentNode = this;

            return this;
        },

        focus: function() {
            this.element.addClass("focus");
        },

        blur: function() {
            this.element.removeClass("focus");
        },

        onClick: function(event) {
            console.log("click");
        }
    };

    return Widget;
});