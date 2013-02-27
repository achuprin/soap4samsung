function Layout() {
    var rootElement = $("#root");
    this.root = new Node(rootElement);
}

Layout.prototype = {
    getRoot: function() {
        return this.root;
    }
};