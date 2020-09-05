(function () {
  module.exports = function (_g) {
    var app = _g.app;
    var mysql = _g.mysql;
    const config = _g.config;

    function route() {
      app.get("/request/db/insert", function (req, res) {
        const uid = 1;
        //infostr = req.body.info;
        let infostr = `{"test":"value is hi"}`;
        let info = JSON.parse(infostr); //  for test;
        console.log(`json test, info = ${info.test}`);

        if (uid == null || infostr == null) {
          console.log("input is wrong.");
          res.send("fail");
        }

        infostr = encodeURIComponent(infostr);
        let conn = mysql.createConnection(config);
        const qry = `insert request values(null, ${uid}, now(), '${infostr}')`;
        conn.connect();
        conn.query(qry, (err, rows, fields) => {
          if (!err) {
            res.send("success");
          } else {
            res.send("fail");
          }
        });
        conn.end();
      });

      app.get("/request/db/update", function (req, res) {
        const id = req.body.id;

        //infostr = req.body.info;
        let infostr = `{"test":"value is hi"}`;
        let info = JSON.parse(infostr); //  for test;
        console.log(`json test, info = ${info.test}`);

        //null check
        if (id == null || infostr == null) {
          console.log("input is wrong.");
          res.send("fail");
        }

        infostr = encodeURIComponent(infostr);
        let conn = mysql.createConnection(config);
        const qry = `update request set infostr = '${infostr}' where id = ${id}`;
        conn.connect();
        conn.query(qry, (err, rows, fields) => {
          if (!err) {
            res.send("success");
          } else {
            res.send("fail");
          }
        });
        conn.end();
      });

      app.get("/request/db/delete", function (req, res) {
        const id = req.query.id;
        if (id == null) {
          console.log("no id, id = " + id);
          res.send("fail");
          return;
        }
        const qry = `delete from request where id = ${id}`;
        let conn = mysql.createConnection(config);
        conn.connect();
        conn.query(qry, (err, rows, fields) => {
          if (!err) {
            res.send("success");
          } else {
            res.send("fail");
          }
        });
        conn.end();
      });
    }

    return {
      route: route,
    };
  };
})();
