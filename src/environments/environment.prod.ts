export const environment = {
  production: true,
  app: {
    id: '',
    path: ''
  },
  api: {
    backend: {
      system: false,
      name: 'backend',
      path: '',
      jwt: true,
      refresh: true
    },
    media: {
      system: true,
      name: 'media',
      path: '',
      jwt: true,
      refresh: false,
      token: '',
      refreshToken: ''
    }
  },
  languages: ['en'],
  defaultLanguage: 'en'
};
