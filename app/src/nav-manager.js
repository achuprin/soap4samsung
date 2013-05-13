         * @param event —Б–Њ–±—Л—В–Є–µ –љ–∞–∂–∞—В–Є—П –Ї–ї–∞–≤–Є—И–Є
         * @return 0 - –≤–ї–µ–≤–Њ, 1 - –≤–≤–µ—А—Е, 2 - –≤–њ—А–∞–≤–Њ, 3 - –≤–љ–Є–Ј.
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
            var parent = view,
                firstChild = view.firstChild();

            if (this.current) {
                this.current.blur();
            }
            this.current = firstChild;

            setTimeout(function(){
                // TODO: Оптимизировать это
                firstChild.focus();
                while (parent) {
                    var deltaTop = firstChild.$el.offset().top - (parent.$el.offset().top) - parseInt(parent.$el.css('paddingTop'), 10),
                        deltaRight = (parent.$el.offset().left + parent.$el.width()) - (firstChild.$el.offset().left + firstChild.$el.width()),
                        deltaBottom = (parent.$el.offset().top + parent.$el.height()) - (firstChild.$el.offset().top + firstChild.$el.height()),
                        deltaLeft = firstChild.$el.offset().left - (parent.$el.offset().left) - parseInt(parent.$el.css('paddingLeft'), 10);

                    if (deltaTop < 0) {
                        parent.$el.scrollTop(parent.$el.scrollTop() + deltaTop);
                    } else if (deltaBottom < 0) {
                        parent.$el.scrollTop(parent.$el.scrollTop() - deltaBottom);
                    } else if (deltaLeft < 0) {
                        parent.$el.scrollLeft(parent.$el.scrollLeft() + deltaLeft);
                    } else if (deltaRight < 0) {
                        parent.$el.scrollLeft(parent.$el.scrollLeft() - deltaRight);
                    }

                    parent = parent.parent;
                }
            }, 0)
        },

        /**
         *
         * @param event событие нажатия клавиши
         * @return 0 - вверх, 1 - вправо, 2 - вниз, 3 - влево.
         */
        direction: function(event) {
            return event.keyCode - 37;
        },

        move: function(event) {
            var direction = this.direction(event),
                nextNode = this.current.sibling(direction);

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
            this.selected.select(event);
        }
    };

    return new Manager();
});