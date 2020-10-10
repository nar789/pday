(() => {
  module.exports = function (_g) {
    var app = _g.app;
    var mysql = _g.mysql;
    const config = _g.config;

    function route() {
      app.get("/test/sug_create", (req, res) => {
        let rid = req.query.rid;
        if (rid == null) {
          res.send("fail");
          return;
        }
        res.render("test_sug_create.html", { rid: rid });
      });

      app.get("/test/sug_list", (req, res) => {
        let rid = req.query.rid;
        if (rid == null) {
          res.send("fail");
          return;
        }
        let qry = `select * from suggest where request_id = ${rid}`;
        let conn = mysql.createConnection(config);
        conn.connect();
        conn.query(qry, (err, rows, fields) => {
          if (!err) {
            for (var i = 0; i < rows.length; i++) {
              rows[i].info2 = JSON.parse(decodeURIComponent(rows[i].info));
            }
            res.render("test_sug_list.html", { rows: rows });
          } else {
            res.send("fail");
          }
        });
        conn.end();
      });

      app.get("/test/sug_detail", (req, res) => {
        const id = req.query.id;
        if (id == null) {
          res.send("fail");
          return;
        }

        let qry = `select * from suggest where id = ${id}`;
        let conn = mysql.createConnection(config);
        conn.connect();
        conn.query(qry, (err, rows, fields) => {
          if (!err && rows.length == 1) {
            rows[0].info2 = JSON.parse(decodeURIComponent(rows[0].info));
            res.render("test_sug_detail.html", { row: rows[0] });
          } else {
            res.send("fail");
          }
        });
        conn.end();
      });

      app.get("/test/sug_accept", (req, res) => {
        const id = req.query.id;
        if (id == null) {
          res.send("fail");
          return;
        }

        let qry = `update suggest set accept = now() where id = ${id}`;
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

      app.get("/test/sug_accept_cancel", (req, res) => {
        const id = req.query.id;
        if (id == null) {
          res.send("fail");
          return;
        }

        let qry = `update suggest set accept = null where id = ${id}`;
        console.log(qry);
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
