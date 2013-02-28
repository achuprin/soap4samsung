define(["backbone"], function(Backbone) {
    var api = {
        url: "/soap4me"
    };

    var TVShow = Backbone.Model.extend();
    var TVShows = Backbone.Collection.extend({
        model: TVShow,

        sync: function(method, collection, success, error) {

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