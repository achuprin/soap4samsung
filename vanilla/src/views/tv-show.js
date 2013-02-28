define(["backbone", "views/common"], function(Backbone, Views) {
    var TVShowCard = Views.CompositeView.extend({
        className: "tvshow-card",

        initialize: function() {
            Views.CompositeView.prototype.initialize.call(this, arguments);
            this.listenTo(this.model, "change", this.render);
        },

        render: function() {
            this.$el.html(_.template("<div><%= attributes.name %></div>")(this.model));
            return this;
        }
    });

    var TVShowsList = Views.GridView.extend({
        initialize: function() {
            Views.CompositeView.prototype.initialize.call(this, arguments);
            this.collection.on('add', this.add, this);
        },

        add: function(item) {
            var li = $("<li class='tvshow-card-w'/>");
            var card = new TVShowCard({model: item});
            card.setElement(li).render();
            this.$el.append(li);

            this.insert(card);
        },

        render: function() {
            var ul = $("<ul class='tvshow-list'/>");
            this.$el.append(ul);
            this.setElement(ul);
            return this;
        }
    });

    return {
        "Card": TVShowCard,
        "List": TVShowsList
    }
});