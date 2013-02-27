define(["backbone"], function(Backbone) {
    var TVShow = Backbone.Model.extend();
    var TVShows = Backbone.Collection.extend({
        model: TVShow
    });

    return {
        "model": TVShow,
        "collection": TVShows
    }
});