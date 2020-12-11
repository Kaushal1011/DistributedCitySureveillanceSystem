(function () {
    module.exports = AdssApi;
    function AdssApi(app, express, db) {
        let apiRouter = express.Router();

        //paths

        //get all warnings
        apiRouter.get("/civic/warning", getWarnings);
        // get all reports
        apiRouter.get("/ai/warning", getReports);
        // get serious cfh calls
        apiRouter.get("/adss/serious", getseriousCfhs);
        // get warnings combined
        apiRouter.get("/adss/waring", getwarningNotifs);
        // get detailed reports
        apiRouter.get("/adss/reports", getReports);

        // get closest police station,public & private surveillance details
        apiRouter.post("/civic/cfh", getPPPSD);

        return apiRouter;
    }
})();
