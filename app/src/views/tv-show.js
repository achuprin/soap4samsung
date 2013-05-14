define(["backbone", "views/common"], function(Backbone, Views) {
    var TVShowCard = Views.CompositeView.extend({
        className: "tvshow-card",
        template: _.template($("#template-show-card").html()),

        initialize: function() {
            Views.CompositeView.prototype.initialize.call(this, arguments);
            this.listenTo(this.model, "change", this.render);
        },

        render: function() {
            this.$el.html(this.template(this.model.attributes));
            return this;
        }
    });

    var TVShowsList = Views.GridView.extend({
        tagName: "div",
        className: "shows-list-w",
        emptyClassName: 'shows-list-empty',
        progressClassName: 'shows-list-progress',
        errorClassName: 'shows-list-error',
        container: this.$el,

        defaults: {
            emptyText: $(),
            progressText: $('#progress-text')
        },

        initialize: function() {
            Views.CompositeView.prototype.initialize.call(this, arguments);
            this.options = _.extend(this.defaults, this.options);
            this.emptyText = _.template(this.options.emptyText.html());
            this.progressText = _.template(this.options.progressText.html());
            this.collection
                .on('add', this.add, this)
                .on('beforeLoad', this.beforeLoad, this)
                .on('sync', this.afterSync, this);

            this.container = $('<ul class="shows-list"/>');
            this.$el.append(this.container);
        },

        beforeLoad: function() {
            console.log('TVShowsList: adding progressClass');
            this.$el.addClass(this.progressClassName);
        },

        afterSync: function() {
            console.log('TVShowsList: removing progressClass');
            this.$el.removeClass(this.progressClassName);
        },

        add: function(item) {
            this.$el.removeClass(this.emptyClassName);
            var li = $("<li class='tvshow-card-w'/>");
            var card = new TVShowCard({model: item});
            card.setElement(li).render();
            this.container.append(li);

            this.insert(card);
        },

        render: function() {
            this.$el
                .addClass(this.emptyClassName)
                .addClass(this.progressClassName)
                .append(this.emptyText())
                .append(this.progressText());
            return this;
        }
    });

    return {
        "Card": TVShowCard,
        "List": TVShowsList
    }
});