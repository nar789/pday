(function () {
  module.exports = function (_g) {
    var app = _g.app;
    const port = 7727;
    const ref = require("./Ref")(_g);
    const crud = require("./Crud")(_g);
    const testReq = require("./TestReq")(_g);
    const testSug = require("./TestSug")(_g);

    function route() {
      app.get("/", function (req, res) {
        res.render("index.html", {});
      });

      ref.route();
      crud.route();
      testReq.route();
      testSug.route();

      app.listen(port, function () {
        console.log(`pday server listen on *:${port}`);
      });
    }

    return {
      route: route,
    };
  };
})();
