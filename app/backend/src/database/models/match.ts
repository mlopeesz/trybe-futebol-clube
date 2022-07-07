import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';

class Match extends Model {
  public homeTeam: number;
  public homeTeamGoals: number;
  public awayTeam: number;
  public awayTeamGoals: number;
  public inProgress: boolean;
}

Match.init(
  {
    homeTeam: INTEGER,
    homeTeamGoals: INTEGER,
    awayTeam: INTEGER,
    awayTeamGoals: INTEGER,
    inProgress: BOOLEAN,
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'matches',
    timestamps: false,
  }
);

export default Match;
