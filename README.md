## All Command line Tools

#### Get Started: New Project and Prisma
```bash
$ npx @nestjs/cli new median: Project_Name
$ npm run start:dev
$ docker-compose up (this will create a container of postgre sql on docker so that we can be able to use that postgre sql without installing it on PC. After that, setup database url in .env)
DATABASE_URL="postgres://postgres:postgres@localhost:5432/universal-db"

$ npm install prisma --save-dev
$ npx prisma init
$ npx prisma migrate dev --name "init"

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

#### Prisma Seeding, Module, Services, Resources
```bash
add following at the end of the package.json to run the seed
  "prisma": {
    "seed": "ts-node prisma/seed.ts"
  }
$ npx prisma db seed
$ npx prisma studio

Prisma to NestJS
$ npx nest generate module prisma
$ npx nest generate service prisma
and made changes on prisma.module.ts and prisma.service.ts (just like in this project)
$ npx nest generate resource
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
