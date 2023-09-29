import webpack from "webpack";
import {webpackSettings} from "./typesWebPack/typesWebpack";
import {resolveSettings} from "./resolveSettings/resolveSettings";
import {rulesSettings} from "./rulesSettings/rulesSettings";
import {pluginsSettings} from "./pluginsSettings/pluginsSettings";
import {DevServerSettings} from "./devServerSettings/devServerSettings";


export const webpackSetUp = (settings: webpackSettings): webpack.Configuration => {
    return {
        mode: settings.mode,
     entry: settings.paths.entry,
        devtool: settings.isDev ?'inline-source-map' : undefined,
        output: {
         path: settings.paths.output,
         filename: '[name].[contenthash].js',
            clean: true
        },
      resolve: resolveSettings(),
        module: {
         rules: rulesSettings(settings.isDev)
        },
        plugins: pluginsSettings(settings),
        devServer: settings.isDev ? DevServerSettings(settings) : undefined
    }
}