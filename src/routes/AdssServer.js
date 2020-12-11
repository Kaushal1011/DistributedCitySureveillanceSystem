const { response } = require("express");

(function () {
    module.exports = AdssApi;
    function AdssApi(app, express, db) {
        let apiRouter = express.Router();

        //paths

        // const lpc = 0;
        // const hpc = 1;
        // const lpa = 2;
        // const hpa = 3;
        // const hpcd = 4;

        //get all warnings
        apiRouter.get("/civic/warning", getWarnings);
        // get all reports
        apiRouter.get("/ai/warning", getaiWarnings);
        // get serious cfh calls
        apiRouter.get("/adss/serious", getseriousCfhs);
        // get warnings combined
        apiRouter.get("/adss/warning", getwarningNotifs);
        // get detailed reports
        apiRouter.get("/adss/reports", getReports);
        // get closest police station,public & private surveillance details
        apiRouter.post("/adss/coords", getPPPSD);

        function getWarnings(req, res) {
            db.collection("warnings")
                .find({ type: { $in: [0] } })
                .toArray()
                .then((docs) => {
                    if (docs) {
                        res.status(200).json(docs);
                    } else {
                        res.status(404).json({ message: "no warnings found" });
                    }
                });
        }

        function getaiWarnings(req, res) {
            db.collection("warnings")
                .find({ type: { $in: [2] } })
                .toArray()
                .then((docs) => {
                    if (docs) {
                        res.status(200).json(docs);
                    } else {
                        res.status(404).json({ message: "no warnings found" });
                    }
                });
        }

        function getseriousCfhs(req, res) {
            db.collection("warnings")
                .find({ type: { $in: [1, 3, 4] } })
                .toArray()
                .then((docs) => {
                    if (docs) {
                        res.status(200).json(docs);
                    } else {
                        res.status(404).json({ message: "no warnings found" });
                    }
                });
        }

        function getwarningNotifs(req, res) {
            db.collection("warnings")
                .find()
                .toArray()
                .then((docs) => {
                    if (docs) {
                        res.status(200).json(docs);
                    } else {
                        res.status(404).json({ message: "no warnings found" });
                    }
                });
        }

        function getReports(req, res) {
            db.collection("warnings")
                .find({ type: 4 })
                .toArray()
                .then((docs) => {
                    if (docs) {
                        res.status(200).json(docs);
                    } else {
                        res.status(404).json({ message: "no warnings found" });
                    }
                });
        }

        function getPPPSD(req, res) {
            let location = {};
            location.x = req.body.coords.x;
            location.y = req.body.coords.y;
            let responsejson = [];
            db.collection("publiccam")
                .find({
                    location: {
                        $near: {
                            $geometry: {
                                type: "Point",
                                coordinates: [location.x, location.y],
                            },
                        },
                    },
                })
                .toArray()
                .then((docs0) => {
                    if (docs0[0]) {
                        responsejson.push(docs0[0]);
                    } else {
                        responsejson.push("none");
                    }
                    db.collection("privatecam")
                        .find({
                            location: {
                                $near: {
                                    $geometry: {
                                        type: "Point",
                                        coordinates: [location.x, location.y],
                                    },
                                },
                            },
                        })
                        .toArray()
                        .then((docs1) => {
                            if (docs1[0]) {
                                responsejson.push(docs1[0]);
                            } else {
                                responsejson.push("none");
                            }
                            db.collection("policestation")
                                .find({
                                    location: {
                                        $near: {
                                            $geometry: {
                                                type: "Point",
                                                coordinates: [
                                                    location.x,
                                                    location.y,
                                                ],
                                            },
                                        },
                                    },
                                })
                                .toArray()
                                .then((docs2) => {
                                    if (docs2[0]) {
                                        responsejson.push(docs2[0]);
                                    } else {
                                        responsejson.push("none");
                                    }
                                    res.status(200).json(responsejson);
                                    return;
                                });
                        });
                });
        }

        return apiRouter;
    }
})();
