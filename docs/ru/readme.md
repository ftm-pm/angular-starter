# Angular UI Skeleton

Данный проект представляет собой сгенерированный проект [Angular CLI][angularCLI], с подключенными модулями для реализации следующих возможностей:

* JWT авторизация [@auth0/angular-jwt][angularJwt]
* Дизайн [@angular/material][angularMaterial]
* Мультиязычность [@ngx-translate/core][ngxTranslateCore]
* Серверный рендеринг для SEO [@nguniversal/common][nguniversal] работающий с помощью [express][express]
* Интегрирован с проектом [SymfonyAPI][symfonyAPI] реализующий REST API

Документация (EN) [здесь][doc].

## Установка

Скачать архив проекта и запустить команду 
```bash
# npm
yarn install
```

Затем для работоспособности необходимо настроить и подключить проект [SymfonyAPI][symfonyAPI].

Документация по работе с [Angular CLI][angularCLI].

## SSR

Документацию по angular universal можно посмотреть [здесь][nguniversalDoc] или [starter][universalStarter] приложение.

Для сборки приложения запустите команду
```bash
npm run build:ssr
```

Для запуска сервера приложения запустите команду
```bash
npm run serve:ssr
```

## Обратная связь
 
* Создать issue в проекте
* Задать вопрос на [сайте](https://ftm.pm).
* Написать на почту fafnur@yandex.ru

Лицензия [MIT][license].

[angularCLI]: https://github.com/angular/angular-cli
[angularJwt]: https://github.com/auth0/angular2-jwt
[angularMaterial]: https://github.com/angular/material2
[ngxTranslateCore]: https://github.com/ngx-translate/core
[nguniversal]: https://github.com/angular/universal
[nguniversalDoc]: https://angular.io/guide/universal
[express]: https://github.com/expressjs/express
[symfonyAPI]: https://github.com/ftm-pm/symfony-api
[universalStarter]: https://github.com/angular/universal-starter
[doc]: https://github.com/ftm-pm/angular-ui-skeleton/blob/master/README.md
[license]: https://github.com/ftm-pm/angular-ui-skeleton/blob/master/LICENSE.txt
