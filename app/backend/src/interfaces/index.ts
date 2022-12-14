export interface IUser {
  username: string,
  email: string,
  role: string,
  password: string,
}

export interface IUserToken {
  username: string,
  email: string,
  role: string,
}

export interface IToken {
  data: IUserToken,
}

export interface ILogin {
  email: string,
  password: string,
}

export interface IMatch {
  id?: number,
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
  inProgress?: boolean,
  teamHome?: {
    teamName: string
  },
  teamAway?: {
    teamName: string
  }
}

export interface IMatchData {
  homeTeam: number,
  homeTeamGoals: number,
  awayTeam: number,
  awayTeamGoals: number,
}

export interface IGoals {
  homeTeamGoals: number,
  awayTeamGoals: number,
}

export interface ILeaderboard {
  name?: string;
  totalPoints: number;
  totalDraws: number;
  totalVictories: number;
  totalLosses: number;
  goalsFavor: number;
  totalGames: number;
  goalsBalance: number;
  goalsOwn: number;
  efficiency: number;
}
export interface ITeam {
  id: number;
  teamName: string;
}
