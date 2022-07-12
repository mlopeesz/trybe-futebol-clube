import team from '../database/models/team';
import Model from '../database/models/match';

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
}
