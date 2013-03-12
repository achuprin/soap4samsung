define(function() {
    function NotLogginedException() {
        var self = this;
        this.name = "NotLogginedException";
        this.message = "User is not loggined.";

        this.toString = function() {
            return self.message;
        }
    }

    return {
        "NotLogginedException": NotLogginedException
    }
});