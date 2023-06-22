## All Command line Tools

[Notion Docs - Brief Description](https://prismaio.notion.site/Let-s-build-a-REST-API-with-NestJS-and-Prisma-94258f8a78d7460883d5b900f706e9ae)

#### Get Started: New Project and PostgreSQL in docker container
```bash
$ npx @nestjs/cli new median: Project_Name
$ npm run start:dev
$ docker-compose up (this will create a container of postgre sql on docker so that we can be able to use that postgre sql without installing it on PC. After that, setup database url in .env)
DATABASE_URL="postgres://postgres:postgres@localhost:5432/universal-db"
```

#### Prisma Seeding, Module, Services, Resources
```bash
$ npm install prisma --save-dev
$ npx prisma init
(Create/Write Schema Models)

$ npx prisma migrate dev --name "init" (need to run in new OS to start 1.0)
# add following at the end of the package.json to run the seed
  "prisma": {
    "seed": "ts-node prisma/seed.ts"
  }
$ npx prisma db seed (need to run in new OS to start 2.0)

$ npx prisma studio

# Prisma to NestJS
$ npx nest generate module prisma
$ npx nest generate service prisma
and made changes on prisma.module.ts and prisma.service.ts (just like in this project)
$ npx nest generate resource
=> Dto means Data Transfer Object. What object will be inserted into the model. Just like request.body input.
=> UserEntity is used to show ApiResponse in Swagger, if you do not use this, you can go on in Controller. and UserEntity should implement User from @primsa/client.
=> Query should be written inside users.service.ts. 
=> All of error handling, ApiTags or UserEntity in users.controller.ts. Without Query, everything is controllerd by controller.
```

#### Validators and Error Handling
```bash
$ npm install class-validator class-transformer

(basically this would validate dto in createUserDto)
add this on main.ts

app.useGlobalPipes(new ValidationPipe());
app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

# Error handling
$ npx nest generate filter prisma-client-exception
or 
$ npx nest g f prisma-client-exception

add following on main.ts if you want global

const { httpAdapter } = app.get(HttpAdapterHost);
app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));
```

#### Testing (Jest) - Follow the docs if you have any problems
```bash
$ npm i dotenv-cli --save-dev
=> Edit test:e2e in scripts of package.json with
 "test:e2e": "dotenv -e .env.test -- npx prisma migrate reset --force --skip-seed  && dotenv -e .env.test -- jest --runInBand --config ./test/jest-e2e.json;"

=> Add following to test/jest-e2e.json
{
  ...,
  "moduleDirectories": [
    "<rootDir>/../",
    "node_modules"
  ]
}
$ npm run test:e2e
```

#### Problems - Linitng issues
```bash
add primsa to lint on package.json you can use 
$ npx eslint prisma/seed.ts --fix to fix manually or 
$ npm run lint
then create .vscode/settings.json and paste following. This will lint and format the document on every save.
{
    "editor.formatOnSave": true,
    "[typescript]": {
        "editor.formatOnSave": false
    },
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    },
}
```

#### Swagger
```bash
$ npm install --save @nestjs/swagger swagger-ui-express
add these following line in main.ts inside bootstrap()

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Auto bots')
    .setDescription('Calling all autobots - Optimus Prime')
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('apidocs', app, document);
  await app.listen(3000);

```


## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
