import MatchModel from '../database/models/match';
import Team from '../database/models/team';
import LeaderboardFunctions from '../helpers/LeaderboardFunctions';

export default class LeaderboardService {
  static async getHome() {
    const getMatches = await MatchModel.findAll({ where: { inProgress: 0 } });
    const getTeams = await Team.findAll();
    const teamsMap = getTeams.map((team: any) => {
      const homeFilter = LeaderboardFunctions.filterId(getMatches, 'home', team.id);
      const home = LeaderboardFunctions.leaderBoardHome(homeFilter);
      return { name: team.teamName, ...home };
    });
    return LeaderboardFunctions.sortLeaderBoard(teamsMap);
  }

  static async getAway() {
    const getMatches = await MatchModel.findAll({ where: { inProgress: 0 } });
    const getTeams = await Team.findAll();
    const teamsMap = getTeams.map((team: any) => {
      const awayFilter = LeaderboardFunctions.filterId(getMatches, 'away', team.id);
      const away = LeaderboardFunctions.leaderBoardHome(awayFilter);
      return { name: team.teamName, ...away };
    });
    return LeaderboardFunctions.sortLeaderBoard(teamsMap);
  }
}
