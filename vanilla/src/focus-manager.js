define(function() {
    /**
     * @param {Node} startView
     * @constructor
     * @class Manager
     */
    var Manager = function(startView) {
        if (startView) {
            this.focus(startView);
        }
    };

    Manager.prototype = {
        focus: function(view) {
            this.current = view;
            this.current.focus();
        },

        move: function(event) {
            var self = this;
            function next(event) {
                switch (event.keyCode) {
                    case 37:
                        return self.current.sibling(0);
                    case 38:
                        return self.current.sibling(1);
                    case 39:
                        return self.current.sibling(2);
                    case 40:
                        return self.current.sibling(3);
                    default:
                        return null;
                }
            }

            var nextNode = next(event);
            if (nextNode) {
                this.current.blur();
                this.current = nextNode;
                this.current.focus();
            }
        },

        click: function(event) {
            this.current.onClick(event);
        }
    };

    return new Manager();
});