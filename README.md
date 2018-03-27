# Angular UI Skeleton

This project was generated with [Angular CLI][angularCLI]. The following modules were included:

* JWT [@auth0/angular-jwt][angularJwt]
* Design [@angular/material][angularMaterial]
* Localization [@ngx-translate/core][ngxTranslateCore]
* Server side rendering [@nguniversal/common][nguniversal]
* Integration with [SymfonyAPI][symfonyAPI]

Russian documentation [here][ruDoc].

## Setup

Download project and run:
```bash
# npm
yarn install
```

After that, install the [SymfonyAPI][symfonyAPI] project to work correctly.

## Use

You can see [Angular CLI][angularCLI] documentation.

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### SSR

Documentation for angular universal you find [here][nguniversalDoc] or you can see [starter][universalStarter] application.

For build ssr application, run:
```bash
npm run build:ssr
```

For start server ssr, run:
```bash
npm run serve:ssr
```

## Feedback
 
* Create a new issue
* Ask a question on [сайте](https://ftm.pm).
* Send a message to fafnur@yandex.ru

License [MIT][license].

[angularCLI]: https://github.com/angular/angular-cli
[angularJwt]: https://github.com/auth0/angular2-jwt
[angularMaterial]: https://github.com/angular/material2
[ngxTranslateCore]: https://github.com/ngx-translate/core
[nguniversal]: https://github.com/angular/universal
[nguniversalDoc]: https://angular.io/guide/universal
[express]: https://github.com/expressjs/express
[symfonyAPI]: https://github.com/ftm-pm/symfony-api
[universalStarter]: https://github.com/angular/universal-starter
[ruDoc]: https://github.com/ftm-pm/angular-ui-skeleton/blob/master/docs/ru/readme.md
[license]: https://github.com/ftm-pm/angular-ui-skeleton/blob/master/LICENSE.txt
