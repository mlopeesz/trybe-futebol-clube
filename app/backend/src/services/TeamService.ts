import { Identifier } from 'sequelize/types';
import Model from '../database/models/team';

export default class TeamService {
  private model = Model;

  async getAll() {
    const teams = await this.model.findAll();
    return teams;
  }

  async getById(id: Identifier | undefined) {
    const team = await this.model.findByPk(id);
    return team;
  }
}
