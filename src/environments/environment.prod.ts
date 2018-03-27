export const environment = {
  production: true,
  app: {
    id: 'angular-ui-skeleton',
    path: 'http://localhost:4200',
  },
  api: {
    name: 'backend',
    path: 'http://symfony-api',
    jwt: true,
    refresh: true
  },
  languages: ['en', 'ru'],
  defaultLanguage: 'ru'
};
