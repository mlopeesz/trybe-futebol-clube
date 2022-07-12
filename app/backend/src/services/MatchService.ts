import { Identifier } from 'sequelize/types';
import team from '../database/models/team';
import Model from '../database/models/match';
import { IMatch } from '../interfaces';
import CustomError from '../helpers/CustomError';

export default class MatchService {
  private model = Model;

  async getAll() {
    const matches = await this.model.findAll({
      include: [
        { model: team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  }

  async create(matchData: IMatch) {
    const { homeTeam, awayTeam } = matchData;

    if (homeTeam === awayTeam) {
      throw new CustomError(401, 'It is not possible to create a match with two equal teams');
    }

    const homeTeamFind = await this.model.findOne({ where: { id: homeTeam } });
    const awayTeamFind = await this.model.findOne({ where: { id: awayTeam } });

    if (!homeTeamFind || !awayTeamFind) {
      throw new CustomError(404, 'There is no team with such id!');
    }

    const createdMatch = await this.model.create({ ...matchData });

    return createdMatch;
  }

  async finishMatch(id: Identifier | undefined) {
    const finishUpdate = this.model.update({ inProgress: false }, { where: { id } });
    return finishUpdate;
  }
}
