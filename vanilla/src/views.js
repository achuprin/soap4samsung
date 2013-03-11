var imports = [
    "views/app",
    "views/navigation"
];

define(imports, function(App, navigation) {
    return {
        "App": App,
        "navigation": navigation
    }
});