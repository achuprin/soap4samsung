var imports = [
    "views/app",
    "views/common",
    "views/navigation"
];

define(imports, function(App, common, navigation) {
    return {
        "App": App,
        "common": common,
        "navigation": navigation
    }
});