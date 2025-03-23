import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Project (e2e)', () => {
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

  const testProject = {
    id: 'test-project-1',
    name: 'Test Project',
    description: 'A test project description',
    tipo: 'web',
    imageUrl: ['https://example.com/image.jpg'],
    nivel: 1,
    repositorio: 'https://github.com/test/project',
    destaque: false
  };

  describe('/projects', () => {
    it('should create a project', () => {
      return request(app.getHttpServer())
        .post('/projects')
        .send(testProject)
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.name).toBe(testProject.name);
        });
    });

    it('should get all projects', () => {
      return request(app.getHttpServer())
        .get('/projects')
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
        });
    });

    it('should get a project by id', () => {
      return request(app.getHttpServer())
        .get(`/projects/${testProject.id}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.id).toBe(testProject.id);
          expect(res.body.name).toBe(testProject.name);
        });
    });

    it('should update a project', () => {
      const updatedName = 'Updated Test Project';
      return request(app.getHttpServer())
        .patch(`/projects/${testProject.id}`)
        .send({ name: updatedName })
        .expect(200)
        .expect((res) => {
          expect(res.body.name).toBe(updatedName);
        });
    });

    it('should delete a project', () => {
      return request(app.getHttpServer())
        .delete(`/projects/${testProject.id}`)
        .expect(200);
    });
  });
}));