const rootMain = require('../../../.storybook/main');

// Use the following syntax to add addons!
rootMain.stories.push(
  ...['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
);

module.exports = rootMain;
