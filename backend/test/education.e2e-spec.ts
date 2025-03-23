import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Education (e2e)', () => {
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

  const testEducation = {
    institution: 'Test University',
    degree: 'Test Degree',
    field: 'Test Field',
    startDate: new Date('2023-01-01'),
    endDate: new Date('2023-12-31'),
    current: false,
    description: 'Test education description'
  };

  describe('/educations', () => {
    let createdEducationId: string;

    it('should create an education', () => {
      return request(app.getHttpServer())
        .post('/educations')
        .send(testEducation)
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.institution).toBe(testEducation.institution);
          createdEducationId = res.body.id;
        });
    });

    it('should get all educations', () => {
      return request(app.getHttpServer())
        .get('/educations')
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
        });
    });

    it('should get an education by id', () => {
      return request(app.getHttpServer())
        .get(`/educations/${createdEducationId}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.institution).toBe(testEducation.institution);
          expect(res.body.degree).toBe(testEducation.degree);
        });
    });

    it('should update an education', () => {
      const updatedInstitution = 'Updated Test University';
      return request(app.getHttpServer())
        .patch(`/educations/${createdEducationId}`)
        .send({ institution: updatedInstitution })
        .expect(200)
        .expect((res) => {
          expect(res.body.institution).toBe(updatedInstitution);
        });
    });

    it('should delete an education', () => {
      return request(app.getHttpServer())
        .delete(`/educations/${createdEducationId}`)
        .expect(200);
    });

    it('should get current education', () => {
      return request(app.getHttpServer())
        .get('/educations/current')
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
        });