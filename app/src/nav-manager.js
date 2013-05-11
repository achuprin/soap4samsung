define(function() {
    /**
     * @constructor
     * @class Manager
     */
    var Manager = function() {
        var self = this;
        $(document).keydown(function(e) {
            switch (e.keyCode) {
                case 37:
                case 38:
                case 39:
                case 40:
                    self.move(e);
                    e.preventDefault();
                    break;
                case 13:
                    self.select(self.current);
                    e.preventDefault();
                    break;
            }
        });
    };

    Manager.prototype = {
        focus: function(view) {
            var self = this;
            if (this.current) {
                this.current.blur();
            }
            this.current = view.firstChild();
            setTimeout(function(){
                self.current.$el.focus();
            }, 0)
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
                this.focus(nextNode);
            }
        },

        select: function(view) {
            if (this.selected) {
                this.selected.unselect();
            }

            this.focus(view);
            this.selected = this.current;
            this.selected.onClick(event);
        }
    };

    return new Manager();
});