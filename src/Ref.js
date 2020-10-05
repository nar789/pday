(() => {
  module.exports = function (_g) {
    var app = _g.app;

    function route() {
      app.get("/packagedetail", function (req, res) {
        res.render("packagedetail.html", {});
      });

      app.get("/estimate", function (req, res) {
        res.render("estimate.html", {});
      });

      app.get("/request", function (req, res) {
        res.render("request.html", {});
      });

      app.get("/history", function (req, res) {
        res.render("history.html", {});
      });

      app.get("/review", function (req, res) {
        res.render("review.html", {});
      });

      app.get("/home", function (req, res) {
        res.render("home.html", {});
      });
    }

    return {
      route: route,
    };
  };
})();
