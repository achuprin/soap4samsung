define(function() {
    /**
     * @param {Node} start
     * @constructor
     * @class Manager
     */
    var Manager = function(start) {
        if (start === null) {
            throw new Error("You should provide initial element to focus.")
        }

        this.current = start;
        this.current.focus();
    };

    Manager.prototype = {
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

    return Manager;
});