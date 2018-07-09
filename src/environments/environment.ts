// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  app: {
    id: 'angular-ui-skeleton',
    path: 'http://localhost:4200',
  },
  api: {
    prefix: 'api',
    name: 'backend',
    path: 'http://symfony-api',
    jwt: true,
    refresh: false
  },
  languages: ['en', 'ru'],
  defaultLanguage: 'ru'
};
