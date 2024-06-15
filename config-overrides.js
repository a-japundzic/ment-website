module.exports = function override(config, env) {
    // https://github.com/facebook/create-react-app/discussions/11767
    console.log("config-overrides.js: Ignoring source map warning https://github.com/facebook/create-react-app/discussions/11767");
    config.ignoreWarnings = [/Failed to parse source map/];

    return config;
};