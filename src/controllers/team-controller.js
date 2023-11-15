const { getAllTeams } = require('../helpers/fetchApi');
const { Team } = require('../db.js');
class TeamController {
	static async getTeams() {
		try {
			const teams = await getAllTeams();
			await Promise.all(
				teams.map(async (teamName) => {
					const teamNameTrim = teamName.trim();
					const [team] = await Team.findOrCreate({
						where: {
							name: teamNameTrim
						},
					});
					return team.name;
				})
			);
			const teamsDb = await Team.findAll();
			return teamsDb;
		} catch (error) {
			throw Error(error.message);
		}
	}
}

module.exports = TeamController;
