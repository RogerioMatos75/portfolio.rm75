import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Contact (e2e)', () => {
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

  const testContact = {
    name: 'Test User',
    email: 'test@example.com',
    subject: 'Test Subject',
    message: 'Test message content'
  };

  describe('/contacts', () => {
    let createdContactId: string;

    it('should create a contact', () => {
      return request(app.getHttpServer())
        .post('/contacts')
        .send(testContact)
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.name).toBe(testContact.name);
          createdContactId = res.body.id;
        });
    });

    it('should get all contacts', () => {
      return request(app.getHttpServer())
        .get('/contacts')
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
        });
    });

    it('should get a contact by id', () => {
      return request(app.getHttpServer())
        .get(`/contacts/${createdContactId}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.name).toBe(testContact.name);
          expect(res.body.email).toBe(testContact.email);
        });
    });

    it('should mark a contact as read', () => {
      return request(app.getHttpServer())
        .patch(`/contacts/${createdContactId}/read`)
        .expect(200)
        .expect((res) => {
          expect(res.body.read).toBe(true);
        });
    });

    it('should delete a contact', () => {
      return request(app.getHttpServer())
        .delete(`/contacts/${createdContactId}`)
        .expect(200);
    });

    it('should get unread contacts', () => {
      return request(app.getHttpServer())
        .get('/contacts/unread')
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
        });