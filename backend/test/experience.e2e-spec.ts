import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Experience (e2e)', () => {
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

  const testExperience = {
    title: 'Test Experience',
    company: 'Test Company',
    location: 'Test Location',
    startDate: new Date('2023-01-01'),
    endDate: new Date('2023-12-31'),
    current: false,
    description: 'Test experience description'
  };

  describe('/experiences', () => {
    let createdExperienceId: string;

    it('should create an experience', () => {
      return request(app.getHttpServer())
        .post('/experiences')
        .send(testExperience)
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.title).toBe(testExperience.title);
          createdExperienceId = res.body.id;
        });
    });

    it('should get all experiences', () => {
      return request(app.getHttpServer())
        .get('/experiences')
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
        });
    });

    it('should get an experience by id', () => {
      return request(app.getHttpServer())
        .get(`/experiences/${createdExperienceId}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.title).toBe(testExperience.title);
          expect(res.body.company).toBe(testExperience.company);
        });
    });

    it('should update an experience', () => {
      const updatedTitle = 'Updated Test Experience';
      return request(app.getHttpServer())
        .patch(`/experiences/${createdExperienceId}`)
        .send({ title: updatedTitle })
        .expect(200)
        .expect((res) => {
          expect(res.body.title).toBe(updatedTitle);
        });
    });

    it('should delete an experience', () => {
      return request(app.getHttpServer())
        .delete(`/experiences/${createdExperienceId}`)
        .expect(200);
    });

    it('should get current experiences', () => {
      return request(app.getHttpServer())
        .get('/experiences/current')
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
        });