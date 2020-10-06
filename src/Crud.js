(function () {
  module.exports = function (_g) {
    var app = _g.app;
    var mysql = _g.mysql;
    const config = _g.config;

    function route() {
      //request start
      app.get("/request/db/select", function (req, res) {
        let uid = req.query.uid;
        let qry = `select * from request`;
        if (uid != null) {
          qry = qry + ` where uid=${uid}`;
        }
        let conn = mysql.createConnection(config);
        conn.connect();
        conn.query(qry, (err, rows, fields) => {
          if (!err) {
            res.send(JSON.stringify(rows));
          } else {
            res.send("fail");
          }
        });
        conn.end();
      });

      app.post("/request/db/insert", function (req, res) {
        const uid = 1;
        let infostr = req.body.info;
        //let infostr = `{"test":"value is hi"}`;
        let info = JSON.parse(infostr); //  for test;
        //console.log(`json test, info = ${info.test}`);

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
        const qry = `update request set info = '${infostr}' where id = ${id}`;
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
      //request end

      //suggest start
      app.get("/suggest/db/select", function (req, res) {
        let rid = req.query.rid;
        let qry = `select * from suggest`;
        if (rid != null) {
          qry = qry + ` where request_id=${rid}`;
        }
        let conn = mysql.createConnection(config);
        conn.connect();
        conn.query(qry, (err, rows, fields) => {
          if (!err) {
            res.send(JSON.stringify(rows));
          } else {
            res.send("fail");
          }
        });
        conn.end();
      });

      app.post("/suggest/db/insert", function (req, res) {
        const plannerId = 1;
        const requestId = req.body.requestId;
        //const requestId = 1; // for test

        let infostr = req.body.info;
        //let infostr = `{"test":"value is hi"}`;
        //let info = JSON.parse(infostr); //  for test;
        //console.log(`json test, info = ${info.test}`);

        if (plannerId == null || requestId == null || infostr == null) {
          console.log("input is wrong.");
          res.send("fail");
        }

        infostr = encodeURIComponent(infostr);
        let conn = mysql.createConnection(config);

        const qry = `insert suggest values(null, ${plannerId}, ${requestId}, now(), '${infostr}', null)`;
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

      app.get("/suggest/db/update", function (req, res) {
        const id = 1;
        //const id = req.body.id;

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
        const qry = `update suggest set info = '${infostr}' where id = ${id}`;
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

      app.get("/suggest/db/delete", function (req, res) {
        const id = req.query.id;
        if (id == null) {
          console.log("no id, id = " + id);
          res.send("fail");
          return;
        }
        const qry = `delete from suggest where id = ${id}`;
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
      //suggest end
    }

    return {
      route: route,
    };
  };
})();
