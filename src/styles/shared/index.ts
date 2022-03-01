/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

const resources = ['_variables.scss'];

module.exports = resources.map((file) => path.resolve(__dirname, file));
