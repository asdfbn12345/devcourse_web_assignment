const cracoAlias = require("craco-alias");

module.exports = {
  plugins: [
    {
      plugin: cracoAlias,
      option: {
        source: "tsconfig",
        baseUrl: ".",
        tsConfigPaTh: "tsconfig.paths.json",
        debug: false,
      },
    },
  ],
};
