module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    "plugins": [
      ["module:react-native-dotenv", {
        moduleName: "@env",
        path: ".env",
        blacklist: null,
        whitelist: ['MOVIE_API', 'MOVIE_API_IMAGE', 'MOVIE_API_KEY', 'VIDEO_BASE_URL'],
        safe: false,
        allowUndefined: true,
      }]
    ]
  };
};
