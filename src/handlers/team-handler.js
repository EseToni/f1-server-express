const TeamController = require("../controllers/team-controller");


class TeamHandler {

	static async getTeams(req, res) {
        try {
            const teams = await TeamController.getTeams();
            return res.status(200).json(teams);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

module.exports = TeamHandler;
