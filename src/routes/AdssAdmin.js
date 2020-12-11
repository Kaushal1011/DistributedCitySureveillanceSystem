(function () {
    module.exports = AdssApi;
    const objectId = require("mongodb").ObjectID;
    function AdssApi(app, express, db) {
        let apiRouter = express.Router();

        //paths

        //add civil public locations for surveillance cameras
        apiRouter.post("/admin/publiccam", getpublicCam);
        // add private  locations for surveillance cameras
        apiRouter.post("/admin/privatecam", getprivateCam);
        // add police station data
        apiRouter.post("/admin/policestation", getpoliceStation);
        //del civil public locations for surveillance cameras
        apiRouter.delete("/admin/publiccam", delpublicCam);
        // del private  locations for surveillance cameras
        apiRouter.delete("/admin/privatecam", delprivateCam);
        // del police station data
        apiRouter.delete("/admin/policestation", delpoliceStation);

        // location schema personal and public cams
        // name, coordinates, address, authorized personal, contact  info
        // location schema for police station
        // name, coordinates, address, PI, contact info

        function getpublicCam(req, res) {
            let id = objectId();
            let name = req.body.name;
            let coordinates = req.body.coordinates;
            let address = req.body.address;
            let authpersonal = req.body.authpersonal;
            let contact = req.body.contact;

            db.collection("publiccam").insertOne(
                {
                    name: name,
                    address: address,
                    location: {
                        type: "point",
                        coordinates: [coordinates.x, coordinates.y],
                    },
                    authpersonal: authpersonal,
                    contact: contact,
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

        function getprivateCam(req, res) {
            let id = objectId();
            let name = req.body.name;
            let coordinates = req.body.coordinates;
            let address = req.body.address;
            let authpersonal = req.body.authpersonal;
            let contact = req.body.contact;

            db.collection("privatecam").insertOne(
                {
                    name: name,
                    address: address,
                    location: {
                        type: "point",
                        coordinates: [coordinates.x, coordinates.y],
                    },
                    authpersonal: authpersonal,
                    contact: contact,
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

        function getpoliceStation(req, res) {
            let id = objectId();
            let name = req.body.name;
            let coordinates = req.body.coordinates;
            let address = req.body.address;
            let pi = req.body.pi;
            let contact = req.body.contact;

            db.collection("policestation").insertOne(
                {
                    name: name,
                    address: address,
                    location: {
                        type: "point",
                        coordinates: [coordinates.x, coordinates.y],
                    },
                    authpersonal: authpersonal,
                    contact: contact,
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

        function delpublicCam(req, res) {
            id = req.body.id;
            db.collection("publiccam").deleteOne(
                {
                    id: id,
                },
                (err, docs) => {
                    if (err) {
                        console.log(err);
                        res.status(500).json({ message: "server error" });
                        return;
                    } else {
                        res.status(200).json({ message: "deleted" });
                        return;
                    }
                }
            );
        }

        function delprivateCam(req, res) {
            id = req.body.id;
            db.collection("privatecam").deleteOne(
                {
                    id: id,
                },
                (err, docs) => {
                    if (err) {
                        console.log(err);
                        res.status(500).json({ message: "server error" });
                        return;
                    } else {
                        res.status(200).json({ message: "deleted" });
                        return;
                    }
                }
            );
        }

        function delpoliceStation(req, res) {
            id = req.body.id;
            db.collection("policestation").deleteOne(
                {
                    id: id,
                },
                (err, docs) => {
                    if (err) {
                        console.log(err);
                        res.status(500).json({ message: "server error" });
                        return;
                    } else {
                        res.status(200).json({ message: "deleted" });
                        return;
                    }
                }
            );
        }

        return apiRouter;
    }
})();
