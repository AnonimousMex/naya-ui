// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'expo-router/babel',              // plugin de expo-router
      'react-native-reanimated/plugin', // SIEMPRE al final
    ],
  };
};
