define(["views/common"], function(views) {
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
                    self.select(e);
                    e.preventDefault();
                    break;
            }
        });
    };

    Manager.prototype = {
        focus: function(view) {
            if (this.current) {
                this.current.blur();
            }
            this.current = view.firstChild();
            this.current.focus();
        },

        move: function(event) {
            var self = this;
            function next(event) {
                switch (event.keyCode) {
                    case 37:
                        return self.current.sibling(views.directions.LEFT);
                    case 38:
                        return self.current.sibling(views.directions.TOP);
                    case 39:
                        return self.current.sibling(views.directions.RIGHT);
                    case 40:
                        return self.current.sibling(views.directions.BOTTOM);
                    default:
                        return null;
                }
            }

            var nextNode = next(event);
            if (nextNode) {
                this.focus(nextNode);
            }
        },

        select: function(event) {
            if (this.selected) {
                this.selected.unselect();
            }

            this.selected = this.current;
            this.current.onClick(event);
            this.focus(this.selected);
        }
    };

    return new Manager();
});