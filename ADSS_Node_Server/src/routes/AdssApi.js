(function () {
    module.exports = AdssApi;
    function AdssApi(app, express, db) {
        let apiRouter = express.Router();

        //paths

        //get civic user warning : geotagged
        apiRouter.post("/civic/warning", getcivicWarning);
        // get warning from ai sources precrime symptoms
        apiRouter.post("/ai/warning", getaiWarning);
        // get civic call for help
        apiRouter.post("/civic/cfh", getcivicCfh);
        //get ai cfh: sure fire detected violence ongoing crime detection
        apiRouter.post("/ai/cfh", getaiCfh);
        // get civic detailed report
        apiRouter.post("/civic/detailedreport", getdetailedReport);

        // warning schema
        // email, location coords, type(high priority civ=1, low priority civ=0,
        // high priority machine=3, low priority machine=2 )

        const lpc = 0;
        const hpc = 1;
        const lpa = 2;
        const hpa = 3;
        const hpcd = 4;

        function getcivicWarning(req, res) {
            let id = req.body.email;
            let coordinates = req.body.coords;
            let type = lpc;
            db.collection("warnings").insertOne(
                {
                    id: id,
                    type: type,
                    location: {
                        type: "Point",
                        coordinates: [coordinates.x, coordinates.y],
                    },
                },
                (err, docs) => {
                    if (err) {
                        console.log(err);
                        res.status(500).json({ message: "server error" });
                        return;
                    } else {
                        res.status(200).json({ message: "accepted" });
                        return;
                    }
                }
            );
        }

        function getaiWarning(req, res) {
            console.log(req.body);
            let id = req.body.email;
            let coordinates = req.body.coords;
            let type = lpa;
            db.collection("warnings").insertOne(
                {
                    id: id,
                    type: type,
                    location: {
                        type: "Point",
                        coordinates: [
                            parseFloat(coordinates[0]),
                            parseFloat(coordinates[1]),
                        ],
                    },
                },
                (err, docs) => {
                    if (err) {
                        console.log(err);
                        res.status(500).json({ message: "server error" });
                        return;
                    } else {
                        res.status(200).json({ message: "accepted" });
                        return;
                    }
                }
            );
        }

        function getcivicCfh(req, res) {
            console.log(req.body);
            let id = req.body.email;
            let coordinates = req.body.coords;
            let type = hpc;
            db.collection("warnings").insertOne(
                {
                    id: id,
                    type: type,
                    location: {
                        type: "Point",
                        coordinates: [coordinates.x, coordinates.y],
                    },
                },
                (err, docs) => {
                    if (err) {
                        console.log(err);
                        res.status(500).json({ message: "server error" });
                        return;
                    } else {
                        res.status(200).json({ message: "accepted" });
                        return;
                    }
                }
            );
        }

        function getaiCfh(req, res) {
            console.log(req.body);
            let id = req.body.email;
            let coordinates = req.body.coords;
            let type = hpa;
            db.collection("warnings").insertOne(
                {
                    id: id,
                    type: type,
                    location: {
                        type: "Point",
                        coordinates: [
                            parseFloat(coordinates[0]),
                            parseFloat(coordinates[1]),
                        ],
                    },
                },
                (err, docs) => {
                    if (err) {
                        console.log(err);
                        res.status(500).json({ message: "server error" });
                        return;
                    } else {
                        res.status(200).json({ message: "accepted" });
                        return;
                    }
                }
            );
        }

        function getdetailedReport(req, res) {
            let id = req.body.email;
            let coordinates = req.body.coords;
            let type = hpcd;
            let details = req.body.details;
            let view = req.body.view;
            db.collection("warnings").insertOne(
                {
                    id: id,
                    type: type,
                    location: {
                        type: "Point",
                        coordinates: [coordinates.x, coordinates.y],
                    },
                    details: details,
                    view: view,
                },
                (err, docs) => {
                    if (err) {
                        console.log(err);
                        res.status(500).json({ message: "server error" });
                        return;
                    } else {
                        res.status(200).json({ message: "accepted" });
                        return;
                    }
                }
            );
        }

        return apiRouter;
    }
})();
