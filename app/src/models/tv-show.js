define(["backbone", "api"], function(Backbone, api) {
    var TVShow = Backbone.Model.extend({
        initialize: function() {
            Backbone.Model.prototype.initialize.call(this, arguments);
            this.set('cover', "http://covers.soap4.me/soap/" + this.attributes.sid + ".jpg");
            this.set('coverBig', "http://covers.soap4.me/soap/big/" + this.attributes.sid + ".jpg");
        }
    });

    var TVShows = Backbone.Collection.extend({
        model: TVShow,

        sync: function(method, collection, options) {
            this.trigger('beforeLoad');
            api.shows.all().done(function(data) {
                _.each(data, function(item) {
                    collection.add(
                        new TVShow(item)
                    )
                });

                if (options.success) {
                    collection.trigger('sync');
                    options.success(collection, data, options);
                }
            });

            return this;
        },

        favorites: function(options) {
            var collection = this;
            this.trigger('beforeLoad');
            api.shows.favorites().done(function(data) {
                _.each(data, function(item) {
                    collection.add(
                        new TVShow(item)
                    )
                });

                if (options.success) {
                    collection.trigger('sync');
                    options.success(collection, data, options);
                }
            });

            return this;
        }
    });

    return {
        "Model": TVShow,
        "Collection": TVShows
    }
});