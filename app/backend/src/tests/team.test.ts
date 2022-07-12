import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import team from '../database/models/team';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;
let chaiHttpResponse: Response;

describe('Rota /teams', () => {
  before(async () => {
    sinon
      .stub(team, 'findAll')
      .resolves([{ id: 1, teamName: 'Patético MG' }] as unknown as team[]);

    after(() => {
      (team.findAll as sinon.SinonStub).restore();
    });

    it('Request com sucesso para rota GET /teams', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/teams')

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.equal([{ id: 1, teamName: 'Patético MG' }]);
    });
  });
});
