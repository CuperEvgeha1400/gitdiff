import type { StorybookConfig } from "@storybook/react-webpack5";
import webpack from 'webpack'
import {configStorybook} from "../configStorybook/configStorybook";
const config: StorybookConfig = {
  stories: [ "../../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  async webpackFinal(config) {
    return configStorybook(config)
  }
};
export default config;
