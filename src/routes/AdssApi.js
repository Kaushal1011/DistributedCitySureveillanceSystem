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

        function getcivicWarning(req, res) {}

        function getaiWarning(req, res) {}

        function getcivicCfh(req, res) {}

        function getaiCfh(req, res) {}

        function getdetailedReport(req, res) {}

        return apiRouter;
    }
})();
