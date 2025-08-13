module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'expo-router/babel',          // <- plugin (AQUÍ)
      'nativewind/babel',
      'react-native-reanimated/plugin', // <- SIEMPRE al final
    ],
  };
};
