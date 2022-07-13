import { IMatch, ILeaderboard } from '../interfaces';

export default class LeaderboardFunctions {
  static goalsOwn(matches: IMatch[], team: string) {
    if (team === 'home') {
      return matches.reduce((acc, curr) => acc + curr.awayTeamGoals, 0);
    } return matches.reduce((acc, curr) => acc + curr.homeTeamGoals, 0);
  }

  static goalsFavor(matches: IMatch[], team: string) {
    if (team === 'home') {
      return matches.reduce((acc, curr) => acc + curr.homeTeamGoals, 0);
    } return matches.reduce((acc, curr) => acc + curr.awayTeamGoals, 0);
  }

  static totalGames(matches: IMatch[]) {
    return matches.length;
  }

  static totalVictories(matches: IMatch[], team: string) {
    if (team === 'home') {
      return matches.filter((match) => match.homeTeamGoals > match.awayTeamGoals).length;
    } return matches.filter((match) => match.homeTeamGoals < match.awayTeamGoals).length;
  }

  static totalPoints(matches: IMatch[], team: string) {
    if (team === 'home') {
      return matches.reduce((acc, curr) => {
        if (curr.homeTeamGoals > curr.awayTeamGoals) {
          return acc + 3;
        } if (curr.homeTeamGoals === curr.awayTeamGoals) {
          return acc + 1;
        } return acc;
      }, 0);
    }
    return matches.reduce((acc, curr) => {
      if (curr.homeTeamGoals < curr.awayTeamGoals) {
        return acc + 3;
      } if (curr.homeTeamGoals === curr.awayTeamGoals) {
        return acc + 1;
      } return acc;
    }, 0);
  }

  static totalDraws(matches: IMatch[]) {
    return matches.filter((match) => match.homeTeamGoals === match.awayTeamGoals).length;
  }

  static totalLosses(matches: IMatch[], team: string) {
    if (team === 'home') {
      return matches.filter((match) => match.homeTeamGoals < match.awayTeamGoals).length;
    } return matches.filter((match) => match.homeTeamGoals > match.awayTeamGoals).length;
  }

  static goalsBalance(matches: IMatch[], team: string) {
    if (team === 'home') {
      return LeaderboardFunctions.goalsFavor(matches, 'home')
      - LeaderboardFunctions.goalsOwn(matches, 'home');
    } return LeaderboardFunctions.goalsFavor(matches, 'away')
    - LeaderboardFunctions.goalsOwn(matches, 'away');
  }

  static efficiency(matches: IMatch[], team: string) {
    if (team === 'home') {
      const totalPoints = LeaderboardFunctions.totalPoints(matches, 'home');
      const totalGames = LeaderboardFunctions.totalGames(matches);
      return Number(((totalPoints / (totalGames * 3)) * 100).toFixed(2));
    }
    const totalPoints = LeaderboardFunctions.totalPoints(matches, 'away');
    const totalGames = LeaderboardFunctions.totalGames(matches);
    return Number(((totalPoints / (totalGames * 3)) * 100).toFixed(2));
  }

  static leaderBoardHome(matches: IMatch[]) {
    return {
      totalPoints: LeaderboardFunctions.totalPoints(matches, 'home'),
      totalGames: LeaderboardFunctions.totalGames(matches),
      totalVictories: LeaderboardFunctions.totalVictories(matches, 'home'),
      totalDraws: LeaderboardFunctions.totalDraws(matches),
      totalLosses: LeaderboardFunctions.totalLosses(matches, 'home'),
      goalsFavor: LeaderboardFunctions.goalsFavor(matches, 'home'),
      goalsOwn: LeaderboardFunctions.goalsOwn(matches, 'home'),
      goalsBalance: LeaderboardFunctions.goalsBalance(matches, 'home'),
      efficiency: LeaderboardFunctions.efficiency(matches, 'home'),
    };
  }

  static leaderBoardAway(data: IMatch[]) {
    return {
      totalPoints: LeaderboardFunctions.totalPoints(data, 'away'),
      totalGames: LeaderboardFunctions.totalGames(data),
      totalVictories: LeaderboardFunctions.totalVictories(data, 'away'),
      totalDraws: LeaderboardFunctions.totalDraws(data),
      totalLosses: LeaderboardFunctions.totalLosses(data, 'away'),
      goalsFavor: LeaderboardFunctions.goalsFavor(data, 'away'),
      goalsOwn: LeaderboardFunctions.goalsOwn(data, 'away'),
      goalsBalance: LeaderboardFunctions.goalsBalance(data, 'away'),
      efficiency: LeaderboardFunctions.efficiency(data, 'away'),
    };
  }

  static addLeaderboard(home: ILeaderboard, away: ILeaderboard) {
    return {
      totalPoints: home.totalPoints + away.totalPoints,
      totalGames: home.totalGames + away.totalGames,
      totalVictories: home.totalVictories + away.totalVictories,
      totalDraws: home.totalDraws + away.totalDraws,
      totalLosses: home.totalLosses + away.totalLosses,
      goalsFavor: home.goalsFavor + away.goalsFavor,
      goalsOwn: home.goalsOwn + away.goalsOwn,
      goalsBalance: home.goalsBalance + away.goalsBalance,
      efficiency: Number((((home.totalPoints + away.totalPoints)
        / ((home.totalGames + away.totalGames) * 3)) * 100).toFixed(2)),
    };
  }

  static filterId(data: IMatch[], team: string, id: number) {
    if (team === 'home') {
      return data.filter((match) => match.homeTeam === id);
    } return data.filter((match) => match.awayTeam === id);
  }

  static sortLeaderBoard(leaderboard: ILeaderboard[]) {
    leaderboard.sort((a, b) =>
      b.totalPoints - a.totalPoints
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || b.goalsOwn - a.goalsOwn);
    return leaderboard;
  }
}
