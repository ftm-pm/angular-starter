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
    backend: {
      system: false,
      name: 'backend',
      path: 'http://symfony-api',
      jwt: true,
      refresh: true
    },
    media: {
      system: true,
      name: 'media',
      path: 'http://media-server',
      jwt: true,
      refresh: true,
      token: 'eyJhbGciOiJSUzI1NiJ9.eyJyb2xlcyI6WyJST0xFX1VTRVIiXSwidXNlcm5hbWUiOiJhZG1pbiIsImlhdCI6MTUyMTcwNzkyNCwiZXhwIjoxNjc5Mzg3OTI0fQ.KaH8Aq96Gp5U6KN-WtrEN-Fvqu2j0Ec8GCGrDwzCzY39-iRyiCT5gKaHVhTiyfWAHXRvD0IJ78cBtmNTL3VnWv7dE188LPpxyytQpxUw0TAsCSu6LqzCqQGQzftksJz_IFc1zjRkYHzJpZPKwHzG9HPpdGpp2BsZRZA3kkOdyRSmfV5pORqwZ-PrA9IIsd6oMfdY8_H_4DMugSyCxVose9X3bxVsBQEH5rMhTyxb5Jgwie7vGCH-ZotrBuwx9GR9rJBKKP_xFKU1q2z5KXgs6bdtx7Ur8_0CqE2-F0zwFlY95-z40vhy3Axkx3-GpZo4Eu9c5fkmL8beusU3rC0XG3gXkc2OoKN_xHePbu6aalc_X1VXH517mnW9gn5uZeTXjvaxoE3u5SQiog35WwO8Hm5irDVa1K1jIl1E4xfm2YIlbdmxiH5YzeHmzBOCwTBH897cL3hEmdtdtVwzvoIZi0ixoBKiCX7YeeCqqynSZklGXvgrxw2YYTZepAXnKqsN-2EvPqebWCuKwALaGnN1ZIvMRXWLepJ7sGpPAyTsqgyrwLYNMK0-M2O_G5cmTQMAcnCpz_2MjB9Fxsblmmt-0lAauFvug72-szpcbwAI6iJ2fXhNPTjdfPbPou3n5rcvz5GjGsVygQTnXVsOPJitpuqdFd3bQOcq7SF4FKhlHxE',
      refreshToken: '6907b92ed1dc526bee695d2d174942ec0b23515b5d4f87142514b104c3e1433e7d4782ee4d69acd0108b2e356a0524d387916bc9658dcf4992fc401fd074647b'
    }
  },
  languages: ['en', 'ru'],
  defaultLanguage: 'ru'
};

