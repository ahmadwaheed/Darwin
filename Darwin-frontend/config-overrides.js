const rewireMobX = require("react-app-rewire-mobx");

/* config-overrides.js */
module.exports = function override(config, env) {
    // use the Sass rewire
    config = rewireMobX(config, env);

    return config;
};
