import MatchModel from '../database/models/match';
import Team from '../database/models/team';
import LeaderboardFunctions from '../helpers/LeaderboardFunctions';

export default class LeaderboardService {
  static async getHome() {
    const matches = await MatchModel.findAll({ where: { inProgress: 0 } });
    const teams = await Team.findAll();
    const teamsMap = teams.map((team: any) => {
      const homeFilter = LeaderboardFunctions.filterId(
        matches,
        'home',
        team.id,
      );
      const home = LeaderboardFunctions.leaderBoardHome(homeFilter);
      return { name: team.teamName, ...home };
    });
    return LeaderboardFunctions.sortLeaderBoard(teamsMap);
  }

  static async getAway() {
    const matches = await MatchModel.findAll({ where: { inProgress: 0 } });
    const teams = await Team.findAll();
    const teamsMap = teams.map((team: any) => {
      const awayFilter = LeaderboardFunctions.filterId(
        matches,
        'away',
        team.id,
      );
      const away = LeaderboardFunctions.leaderBoardHome(awayFilter);
      return { name: team.teamName, ...away };
    });
    return LeaderboardFunctions.sortLeaderBoard(teamsMap);
  }
}
