const { version } = require('./package.json');

console.log(process.env.PROJECT_ID);

module.exports = {
  name: 'Noble',
  slug: 'Noble',
  version: version || '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'dark',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#02020a',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#FFF',
    },
    package: 'br.social.noble',
  },
  web: {
    favicon: './assets/favicon.png',
  },
  experiments: {
    tsconfigPaths: true,
  },
  extra: {
    eas: {
      projectId: process.env.PROJECT_ID,
    },
  },
};
