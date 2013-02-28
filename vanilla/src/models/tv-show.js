define(["backbone", "api"], function(Backbone, api) {
    var TVShow = Backbone.Model.extend();
    var TVShows = Backbone.Collection.extend({
        model: TVShow,

        sync: function(method, collection, success, error) {
            api.shows.all().done(function(data) {
                _.each(data, function(item) {
                    collection.add(
                        new TVShow(item)
                    )
                });
            });

            return this;
        },

        success: function() {
            console.log("onsuccess");
        }
    });

    return {
        "Model": TVShow,
        "Collection": TVShows
    }
});