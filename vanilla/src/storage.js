define(function() {
    var storageAdapter;

    if ('localStorage' in window) {
        storageAdapter = {
            "get": function(key) {
                return window.localStorage.getItem(key);
            },

            "set": function(key, value) {
                window.localStorage.setItem(key, value);
            }
        }
    }

    return {
        "get": function(key) {
            return storageAdapter.get(key)
        },

        "set": function(key, value) {
            storageAdapter.set(key, value);
        }
    };
});