// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
/* tslint:disable */
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
      path: 'http://symfony-media',
      jwt: true,
      refresh: false,
      token: 'eyJhbGciOiJSUzI1NiJ9.eyJyb2xlcyI6WyJST0xFX1VTRVIiXSwidXNlcm5hbWUiOiJhZG1pbiIsImlhdCI6MTUyMTQzOTY3NCwiZXhwIjoxNjc5MTE5Njc0fQ.BkntuE8W0M6CBpGqx9t4CzgHcFyUrChIPbqFz02HVEImbN0ICKL_3BJ1_JltA58CMJ2dgtzXF4nYTWyj9TgNAFmHIn0iqRuXGsdvcRLgHNk3tk-hnO-TkJv3DWXsXso3Bui4I3vjDgILvhfTID5TJ7Sh7kel4xN6TSaHPrJ44aVPY4dw2hG40KUD0pNEj7m5XWHW4dCa51ge9uieDoDLuRSYCL3EugdsviC0i3JuCfvjdTcnlQ5ebiqFmqaGwueem884get-UqTFdrybtPOBDKw4IV8r5V0RTXepl4TvjCaCCA9DY4ttVYj6M-nNCGxumiFB6FI4lLskaPBJ-TBoESHalASm0JvdOIB824VwweY5VUFpmcuGULRK69p9pMHoo2a5XwoFRvecTffmvBqrMqeYoPfBv9qYgQP4n6K45QjZwwKqoZSyhpO00pnzIC20aznCw1lCPLD7xR32Nhvr0zm7VCjDP8WTK5isdDnOsyYnLRt0-fCitgqwL-UPQ6EzWg6-ZeD7EhQrQd0H_bkAPtT7VUdtyANW8qKZVLnOOp-avuv7QpL7NNLlcAUMWeRm8fNIkD8Qo85wTCMd7sgLDcX0UQ_Fwljrdv-9_FxPBN44Fxe8rYYP1lWvcHhtKtvy6PZaOOzBcfwkKrOymw80Ch7Ed_IG7-GZ9NplIj0UK3U',
    }
  },
  languages: ['en', 'ru'],
  defaultLanguage: 'ru'
};
/* tslint:enable */
