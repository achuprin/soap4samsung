define(["storage"], function(storage) {
    var endpoint = "/soap4me";
    var SESSION_STORAGE_KEY = "session_token";
    var SESSION_EXPIRATION_KEY = "session_expire_date";
    var USERNAME_KEY = "username";
    var PASSWORD_KEY = "password";

    function getSessionToken() {
        var now = new Date().getTime();
        var expirationTime = parseFloat(storage.get(SESSION_EXPIRATION_KEY));

        if (expirationTime && now > (expirationTime - 5 * 60 * 1000)) {
            var username = storage.get(USERNAME_KEY);
            var password = storage.get(PASSWORD_KEY);

            if (username && password) {
                api.user.login(username, password);
            }
        }

        return storage.get(SESSION_STORAGE_KEY) || "";
    }

    function setSession(token, expirationTime, username, password) {
        storage.set(SESSION_STORAGE_KEY, token);
        storage.set(SESSION_EXPIRATION_KEY, new Date().getTime() + expirationTime);
        storage.set(USERNAME_KEY, username);
        storage.set(PASSWORD_KEY, password);
    }

    $.ajaxSetup({
        beforeSend: function(request) {
            request.setRequestHeader("x-api-token", getSessionToken());
        }
    });

    var api = {
        user: {
            login: function(username, password) {
                var now = new Date().getTime();
                var expirationTime = parseFloat(storage.get(SESSION_EXPIRATION_KEY));

                if (!expirationTime || now >= expirationTime) {
                    var data = {
                        "login": username,
                        "password": password
                    };

                    $.post(
                        endpoint + "/login",
                        data,
                        function(data) {
                            if (data["ok"] === 1) {
                                var sessionToken = data["token"];
                                var till = data["till"];

                                if (sessionToken && till) {
                                    setSession(sessionToken, parseFloat(till), username, password)
                                }
                            }
                        },
                        "json"
                    );
                }
            }
        },

        shows: {
            all: function() {

            },

            favorites: function() {

            }
        }
    };

    return api;
});