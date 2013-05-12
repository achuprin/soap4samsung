define(["backbone", "views/common"], function(Backbone, Views) {
    var TVShowCard = Views.CompositeView.extend({
        className: "tvshow-card",
        template: _.template($("#template-show-card").html()),

        initialize: function() {
            Views.CompositeView.prototype.initialize.call(this, arguments);
            this.listenTo(this.model, "change", this.render);
        },

        render: function() {
            var tmplVars = _.extend(this.model.attributes, {
                "coverBig": this.model.get('coverBig'),
                "name": this.model.get('title')
            });

            this.$el.html(this.template(tmplVars));
            return this;
        }
    });

    var TVShowsList = Views.GridView.extend({
        tagName: "div",
        className: "shows-list",
        container: this.$el,

        initialize: function() {
            Views.CompositeView.prototype.initialize.call(this, arguments);
            this.collection.on('add', this.add, this);
            this.container = $('<ul/>');
            this.$el.append(this.container);
        },

        add: function(item) {
            var li = $("<li class='tvshow-card-w'/>");
            var card = new TVShowCard({model: item});
            card.setElement(li).render();
            this.container.append(li);

            this.insert(card);
        },

        render: function() {
            return this;
        }
    });

    return {
        "Card": TVShowCard,
        "List": TVShowsList
    }
});