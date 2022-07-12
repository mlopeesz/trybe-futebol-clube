import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import user from '../database/models/user';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;
let chaiHttpResponse: Response;

describe('Rota /login', () => {

  before(async () => {
    sinon
      .stub(user, "findOne")
      .resolves({
        id: 1,
        username: 'schwernows',
        role: 'tico',
        email: 'ticoliro@galinho.com',
        password: '123456789',
      } as unknown as user);
  });

  after(()=>{
    (user.findOne as sinon.SinonStub).restore();
  })

  it('Request com sucesso para rota POST /login', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send({ email: 'ticoliro@galinho.com', password: '123456789'})

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.have.property('token');
  });

  it('Retorna status 400 e mensagem de erro quando um dos campos não existe', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send({ email: 'ticoliro@galinho.com' })

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).to.be.equal({ message: 'All fields must be filled'});
  });

  it('Retorna status 401 e mensagem de erro quando um dos campos estão incorretos', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send({ email: 'ticoliro@galinho.com', password: 'guguba' })

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.be.equal({ message: 'Incorrect email or password'});
  });
});

describe('Rota /login/validation', () => {
  before(async () => {
    sinon
      .stub(user, "findOne")
      .resolves({
        role: 'admin',
        email: 'admin@admin.com',
      } as unknown as user);
  });

  after(()=>{
    (user.findOne as sinon.SinonStub).restore();
  })

  it('Valida token de admin', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('login/validate')
      .set({
        authorization: 'grubgrub'
      })

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.equal({ role: 'admin' })
  });
});
