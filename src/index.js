(function () {
    let express = require("express");
    let cors = require("cors");
    let bodyParser = require("body-parser");
    let mongoClient = require("mongodb").MongoClient;
    let morgan = require("morgan");
    let config = require("./config.js");
    let app = express();
    let dbHostUrl = "mongodb://" + config.server + ":" + config.db_port + "/";

    app.use(cors());
    app.use(morgan("common"));
    app.use(
        bodyParser.urlencoded({
            extended: true,
        })
    );
    app.use(bodyParser.json());

    mongoClient.connect(
        dbHostUrl + config.db_name,
        { useUnifiedTopology: true },
        runApp
    );

    server = app.listen(config.port);
    console.log("Server starting at http://localhost:" + config.port);

    function runApp(err, client) {
        console.log("MongoDB Connected");
        db = client.db(config.db_name);
        let AdssApi = require("./routes/AdssApi.js")(app, express, db);
        let AdssAdmin = require("./routes/AdssAdmin.js")(app, express, db);
        let AdssServer = require("./routes/AdssServer.js")(app, express, db);
        app.use("/", AdssApi);
        app.use("/", AdssAdmin);
        app.use("/", AdssServer);
    }
})();
