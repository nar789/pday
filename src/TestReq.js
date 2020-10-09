(function () {
  module.exports = function (_g) {
    var app = _g.app;
    var mysql = _g.mysql;
    const config = _g.config;

    function route() {
      app.get("/test/req_create", (req, res) => {
        res.render("test_req_create.html", {});
      });

      app.get("/test/req_list", (req, res) => {
        let uid = req.query.uid;
        let qry = `select request.*,count(suggest.request_id) as cnt from request left join suggest on request.id = suggest.request_id group by request.id`;
        if (uid != null) {
          qry = `select request.*,count(suggest.request_id) as cnt from request left join suggest on request.id = suggest.request_id where uid = ${uid} group by request.id`;
        }
        let conn = mysql.createConnection(config);
        conn.connect();
        conn.query(qry, (err, rows, fields) => {
          if (!err) {
            for (var i = 0; i < rows.length; i++) {
              rows[i].info2 = JSON.parse(decodeURIComponent(rows[i].info));
            }
            res.render("test_req_list.html", { rows: rows });
          } else {
            res.send("fail");
          }
        });
        conn.end();
      });

      app.get("/test/req_detail", async (req, res) => {
        var id = req.query.id;
        if (id == null) {
          res.send("fail");
          return;
        }

        const row = await select_req_detail(id);
        const sug_list = await select_sug_list(id);

        res.render("test_req_detail.html", {
          row: row,
          sug_list: sug_list,
        });
      });
    }

    function select_req_detail(id) {
      return new Promise((resolve, reject) => {
        let qry = `select * from request where id = ${id}`;
        let conn = mysql.createConnection(config);
        conn.connect();
        conn.query(qry, (err, rows, fields) => {
          if (!err && rows.length == 1) {
            rows[0].info2 = JSON.parse(decodeURIComponent(rows[0].info));
            resolve(rows[0]);
          } else {
            return;
          }
        });
        conn.end();
      });
    }

    function select_sug_list(rid) {
      if (rid == null) {
        return;
      }

      return new Promise((resolve, reject) => {
        let qry = `select * from suggest where request_id = ${rid}`;
        let conn = mysql.createConnection(config);
        conn.connect();
        conn.query(qry, (err, rows, fields) => {
          if (!err) {
            for (var i = 0; i < rows.length; i++) {
              rows[i].info2 = JSON.parse(decodeURIComponent(rows[i].info));
            }
            resolve(rows);
          } else {
            return;
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
