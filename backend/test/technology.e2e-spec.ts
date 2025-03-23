import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Technology (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  const testTechnology = {
    id: 'test-tech-1',
    name: 'Test Technology',
    description: 'A test technology description',
    icon: 'test-icon',
    destaque: true
  };

  describe('/technologies', () => {
    it('should create a technology', () => {
      return request(app.getHttpServer())
        .post('/technologies')
        .send(testTechnology)
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.name).toBe(testTechnology.name);
        });
    });

    it('should get all technologies', () => {
      return request(app.getHttpServer())
        .get('/technologies')
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
        });
    });

    it('should get a technology by id', () => {
      return request(app.getHttpServer())
        .get(`/technologies/${testTechnology.id}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.id).toBe(testTechnology.id);
          expect(res.body.name).toBe(testTechnology.name);
        });
    });

    it('should update a technology', () => {
      const updatedName = 'Updated Test Technology';
      return request(app.getHttpServer())
        .patch(`/technologies/${testTechnology.id}`)
        .send({ name: updatedName })
        .expect(200)
        .expect((res) => {
          expect(res.body.name).toBe(updatedName);
        });
    });

    it('should delete a technology', () => {
      return request(app.getHttpServer())
        .delete(`/technologies/${testTechnology.id}`)
        .expect(200);
    });

    it('should get technologies associated with a project', () => {
      return request(app.getHttpServer())
        .get(`/technologies/project/${testTechnology.id}`)
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
        });
    });
  });
}));