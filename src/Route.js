(function () {
  module.exports = function (_g) {
    var app = _g.app;
    var http = _g.http;
    const port = 7727;

    function route() {
      app.get("/", function (req, res) {
        loginCheckRouteHook(() => {
          res.render("index.html", {});
        });
      });

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

      //1. enetry point
      app.listen(port, function () {
        preLoad();
        console.log(`pday server listen on *:${port}`);
      });
    }

    function loginCheckRouteHook(doInLoginCheckRouteHook) {
      routeHook(
        () => {
          return { result: "success" };
        },
        (params) => {
          if (params == undefined || params.result == undefined) {
            return;
          }
          if (params.result === "success") {
            //to-do-something
            doInLoginCheckRouteHook();
          } else {
            //in case of not having session, or not login..etc..
            //to-do
          }
          return { result: "success" };
        },
        (params) => {
          return 1;
        }
      );
    }

    function routeHook(onPreExecute, doInRoute, onPostExecute) {
      var preReturn = onPreExecute();
      var doReturn = doInRoute(preReturn);
      return onPostExecute(doReturn);
    }

    function preLoad() {
      //to-do
    }

    var publicReturn = { route: route };
    return publicReturn;
  };
})();
