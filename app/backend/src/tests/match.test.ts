import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';
import Matches from '../database/models/match';
import Users from '../database/models/user';
import * as jwt from 'jsonwebtoken';

chai.use(chaiHttp);

const { expect } = chai;
let chaiHttpResponse: Response;

describe('Rota /matches', () => {
  const fakeResponse = [
    {
      id: 1,
      homeTeam: 16,
      homeTeamGoals: 1,
      awayTeam: 8,
      awayTeamGoals: 1,
      inProgress: false,
      teamHome: {
        teamName: 'São Paulo',
      },
      teamAway: {
        teamName: 'Grêmio',
      },
    },
    {
      id: 41,
      homeTeam: 16,
      homeTeamGoals: 2,
      awayTeam: 9,
      awayTeamGoals: 0,
      inProgress: true,
      teamHome: {
        teamName: 'São Paulo',
      },
      teamAway: {
        teamName: 'Internacional',
      },
    },
  ] as unknown;
  beforeEach(async () => {
    sinon.stub(Matches, 'findAll').resolves(fakeResponse as Matches[]);
  });
  afterEach(async () => {
    (Matches.findAll as sinon.SinonStub).restore();
  });
  it('Retorna status 200 e array de partidas', async () => {
    chaiHttpResponse = await chai.request(app).get('/matches');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.eqls(fakeResponse);
  });
});

describe('Rota /matches/:id', () => {
  const fakeResponse = {
    id: 1,
    homeTeam: 16,
    homeTeamGoals: 1,
    awayTeam: 8,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: {
      teamName: 'São Paulo',
    },
    teamAway: {
      teamName: 'Grêmio',
    },
  };
  beforeEach(() => {
    sinon.stub(Matches, 'findOne').resolves(fakeResponse as unknown as Matches);
  });
  afterEach(() => {
    (Matches.findOne as sinon.SinonStub).restore();
  });
  it('Retorna status 200 e partida', async () => {
    chaiHttpResponse = await chai.request(app).get('/matches/1');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.eqls(fakeResponse);
  });
});
describe('Rota /matches/:id', () => {
  beforeEach(() => {
    sinon.stub(Matches, 'findOne').resolves(null);
  });
  afterEach(() => {
    (Matches.findOne as sinon.SinonStub).restore();
  });
  it('Retorna status 404 e erro quando não existe partida', async () => {
    chaiHttpResponse = await chai.request(app).get('/matches/9000');

    expect(chaiHttpResponse.status).to.be.equal(404);
    expect(chaiHttpResponse.body).to.be.eqls({
      message: 'Match not found',
    });
  });
});
describe('Verifica a rota /matches com query', () => {
  const fakeResponse = [
    {
      id: 1,
      homeTeam: 16,
      homeTeamGoals: 1,
      awayTeam: 8,
      awayTeamGoals: 1,
      inProgress: false,
      teamHome: {
        teamName: 'São Paulo',
      },
      teamAway: {
        teamName: 'Grêmio',
      },
    },
    {
      id: 41,
      homeTeam: 16,
      homeTeamGoals: 2,
      awayTeam: 9,
      awayTeamGoals: 0,
      inProgress: true,
      teamHome: {
        teamName: 'São Paulo',
      },
      teamAway: {
        teamName: 'Internacional',
      },
    },
  ] as unknown;
  beforeEach(async () => {
    sinon.stub(Matches, 'findAll').resolves(fakeResponse as Matches[]);
  });
  afterEach(async () => {
    (Matches.findAll as sinon.SinonStub).restore();
  });
  it('Retorna status 200 e partidas em andamento', async () => {
    chaiHttpResponse = await chai.request(app).get('/matches?inProgress=true');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.eqls([
      {
        id: 41,
        homeTeam: 16,
        homeTeamGoals: 2,
        awayTeam: 9,
        awayTeamGoals: 0,
        inProgress: true,
        teamHome: {
          teamName: 'São Paulo',
        },
        teamAway: {
          teamName: 'Internacional',
        },
      },
    ]);
  });
  it('Retorna status 200 e partidas concluídas', async () => {
    chaiHttpResponse = await chai.request(app).get('/matches?inProgress=false');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.eqls([
      {
        id: 1,
        homeTeam: 16,
        homeTeamGoals: 1,
        awayTeam: 8,
        awayTeamGoals: 1,
        inProgress: false,
        teamHome: {
          teamName: 'São Paulo',
        },
        teamAway: {
          teamName: 'Grêmio',
        },
      },
    ]);
  });
});

describe('Rota /matches/:id/finish', () => {
  beforeEach(async () => {
    sinon.stub(Matches, 'update').resolves();
  });
  afterEach(async () => {
    (Matches.update as sinon.SinonStub).restore();
  });
  it('Retorna status 200 e mensagem de partida finalizada', async () => {
    chaiHttpResponse = await chai.request(app).patch('/matches/23/finish');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.eqls({ message: 'Finished' });
  });
});

describe('Rota /matches/:id PATCH', () => {
  beforeEach(() => {
    sinon.stub(Matches, 'update').resolves();
  });
  afterEach(() => {
    (Matches.update as sinon.SinonStub).restore();
  });
  it('Retorna status 200 e mensagem de concluído', async () => {
    chaiHttpResponse = await chai.request(app).patch('/matches/2').send({
      homeTeamGoals: 2,
      awayTeamGoals: 2,
    });
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.eqls({ message: 'All done' });
  });
  it('Retorna status 400 e mensagem de erro', async () => {
    chaiHttpResponse = await chai.request(app).patch('/matches/2').send({
      homeTeamGoals: 2,
    });
    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).to.be.eqls({ message: 'Missing body' });
  });
});

describe('Rota /matches POST', () => {
  const fakeResponse = [
    {
      id: 1,
      homeTeam: 16,
      homeTeamGoals: 1,
      awayTeam: 8,
      awayTeamGoals: 1,
      inProgress: false,
      teamHome: {
        teamName: 'São Paulo',
      },
      teamAway: {
        teamName: 'Grêmio',
      },
    },
    {
      id: 41,
      homeTeam: 16,
      homeTeamGoals: 2,
      awayTeam: 9,
      awayTeamGoals: 0,
      inProgress: true,
      teamHome: {
        teamName: 'São Paulo',
      },
      teamAway: {
        teamName: 'Internacional',
      },
    },
  ] as unknown;
  beforeEach(async () => {
    sinon.stub(Matches, 'create').resolves(fakeResponse as Matches);
    sinon.stub(Users, 'findOne').resolves({
      email: 'admin@admin.com',
      password: 'grulley',
    } as Users);
    sinon.stub(jwt, 'verify').resolves();
  });
  afterEach(async () => {
    (Matches.create as sinon.SinonStub).restore();
    (Users.findOne as sinon.SinonStub).restore();
  });
  it('Retorna status 201 e partida criada', async () => {
    chaiHttpResponse = await chai.request(app).post('/matches').send({
      homeTeam: 16,
      homeTeamGoals: 2,
      awayTeam: 9,
      awayTeamGoals: 0,
    });

    expect(chaiHttpResponse.status).to.be.equal(201);
    expect(chaiHttpResponse.body).to.be.eqls({
      id: 41,
      homeTeam: 16,
      homeTeamGoals: 2,
      awayTeam: 9,
      awayTeamGoals: 0,
      inProgress: true,
    });
  });
});
