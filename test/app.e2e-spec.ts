import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { useContainer } from 'class-validator';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  const userShape = expect.objectContaining({
    id: expect.any(Number),
    email: expect.any(String),
    name: expect.any(String),
    paymentClear: expect.any(Boolean),
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
  });

  const userdata = [
    { id: 2236, email: 'test@gmcil.com', name: 'sdfsdf' },
    {
      id: 3456,
      email: 'sdfsdf@dfg.com',
      name: 'sdMEsas',
      paymentClear: true,
      profileImage: 'image',
    },
  ];

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    // prisma, validation to work perfectly
    prisma = app.get<PrismaService>(PrismaService);
    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    await app.init();

    // create data on user table
    await prisma.user.create({ data: userdata[0] });
    await prisma.user.create({ data: userdata[1] });
  });

  // it('/ (GET)', () => {
  //   return request(app.getHttpServer())
  //     .get('/')
  //     .expect(200)
  //     .expect('Hello World!');
  // });

  // GET /users
  describe('GET /users', () => {
    it('returns a list true users', async () => {
      const { status, body } = await request(app.getHttpServer()).get('/users');
      expect(status).toBe(200);
      expect(body).toStrictEqual(expect.arrayContaining([userShape]));
      expect(body).toHaveLength(1);
      expect(body[0].paymentClear).toBeTruthy();
    });

    it('returns a list of false users', async () => {
      const { status, body } = await request(app.getHttpServer()).get(
        '/users/falsified',
      );
      expect(status).toBe(200);
      expect(body).toStrictEqual(expect.arrayContaining([userShape]));
      expect(body).toHaveLength(1);
      expect(body[0].paymentClear).toBeFalsy();
    });
  });

  // GET /users/:id
  describe('GET /users/:id', () => {
    it('returns a given user', async () => {
      const userId = userdata[1].id;

      if (isNaN(userId)) {
        throw new Error('Invalid id');
      }
      const { status, body } = await request(app.getHttpServer()).get(
        `/users/${userId}`,
      );
      expect(status).toBe(200);
      expect(body).toStrictEqual(userShape);
      expect(body.id).toEqual(userId);
    });

    it('fails to return non existing user', async () => {
      const { status, body } = await request(app.getHttpServer()).get(
        `/users/100`,
      );
      expect(status).toBe(404);
    });

    it('fails to return article with invalid id type', async () => {
      const { status, body } = await request(app.getHttpServer()).get(
        `/users/stringid`,
      );
      expect(status).toBe(500);
    });
  });

  // POST /users
  describe('POST /users', () => {
    it('creates an user', async () => {
      const beforeCount = await prisma.user.count();
      const { status, body } = await request(app.getHttpServer())
        .post('/users')
        .send({
          email: 'genjam@dfg.com',
          name: 'GG Jenamj',
          paymentClear: true,
          profileImage: 'image',
        });
      const afterCount = await prisma.user.count();

      expect(status).toBe(201);
      expect(afterCount - beforeCount).toBe(1);
    });

    it('fails to create article without title', async () => {
      const { status, body } = await request(app.getHttpServer())
        .post('/users')
        .send({
          name: 'sdfsdf',
        });

      expect(status).toBe(400);
    });
  });
});

// Result

// Applying migration `20230522205120_init`
// Database reset successful
// The following migration(s) have been applied:

// migrations/
//   └─ 20230522205120_init/
//     └─ migration.sql

// ✔ Generated Prisma Client (4.14.1 | library) to ./node_modules/@prisma/client in 123ms

//  PASS  test/app.e2e-spec.ts (11.744 s)

// AppController (e2e)
// GET /users
//   ✓ returns a list true users (60 ms)
//   ✓ returns a list of false users (43 ms)
// GET /users/:id
//   ✓ returns a given user (29 ms)
//   ✓ fails to return non existing user (20 ms)
//   ✓ fails to return article with invalid id type (225 ms)
// POST /users
//   ✓ creates an user (125 ms)
//   ✓ fails to create article without title (10 ms)

// Test Suites: 1 passed, 1 total
// Tests:       7 passed, 7 total
// Snapshots:   0 total
// Time:        17.432 s
