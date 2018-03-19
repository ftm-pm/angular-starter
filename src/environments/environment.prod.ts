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
      jwt: true
    },
    media: {
      system: true,
      name: 'media',
      path: '',
      jwt: true
    }
  },
  languages: ['en'],
  defaultLanguage: 'en'
};
