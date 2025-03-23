import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Skill (e2e)', () => {
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

  const testSkill = {
    name: 'Test Skill',
    category: 'Programming',
    proficiency: 5,
    icon: 'test-icon'
  };

  describe('/skills', () => {
    let createdSkillId: string;

    it('should create a skill', () => {
      return request(app.getHttpServer())
        .post('/skills')
        .send(testSkill)
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.name).toBe(testSkill.name);
          createdSkillId = res.body.id;
        });
    });

    it('should get all skills', () => {
      return request(app.getHttpServer())
        .get('/skills')
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
        });
    });

    it('should get a skill by id', () => {
      return request(app.getHttpServer())
        .get(`/skills/${createdSkillId}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.name).toBe(testSkill.name);
          expect(res.body.category).toBe(testSkill.category);
        });
    });

    it('should update a skill', () => {
      const updatedName = 'Updated Test Skill';
      return request(app.getHttpServer())
        .patch(`/skills/${createdSkillId}`)
        .send({ name: updatedName })
        .expect(200)
        .expect((res) => {
          expect(res.body.name).toBe(updatedName);
        });
    });

    it('should delete a skill', () => {
      return request(app.getHttpServer())
        .delete(`/skills/${createdSkillId}`)
        .expect(200);
    });

    it('should get skills by category', () => {
      return request(app.getHttpServer())
        .get(`/skills/category/${testSkill.category}`)
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
        });