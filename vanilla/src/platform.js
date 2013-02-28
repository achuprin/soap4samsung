define(function() {
    var storageAdapter;

    if ('localStorage' in window) {
        // Browser environment
        storageAdapter = {
            "get": function(key) {
                return window.localStorage.getItem(key);
            },

            "set": function(key, value) {
                window.localStorage.setItem(key, value);
            }
        }
    } else {
        // TV environment
    }

    return {
        "storage": {
            "get": function(key) {
                return storageAdapter.get(key)
            },

            "set": function(key, value) {
                storageAdapter.set(key, value);
            }
        }
    };
});