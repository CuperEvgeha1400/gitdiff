import webpack from 'webpack'
import {EnvWebpack, Mode, webpackSettings} from './config/typesWebPack/typesWebpack'
import {webpackSetUp} from "./config/webpackSetUp";
import path from "path";

export default (env: EnvWebpack): webpack.Configuration => {
    const settings: webpackSettings = {
        paths: {
            entry: path.resolve(__dirname, 'src'),
            output: path.resolve(__dirname, 'dist'),
            htmlPluginTemplate: path.resolve(__dirname, 'public', 'index.html')
        },
        mode: env.mode || Mode.DEVELOPMENT,
        devServer : {
            port: env.port || 80,
            path: path.resolve(__dirname, 'public')
        },
        isDev: env.mode === Mode.DEVELOPMENT
    }
    return webpackSetUp(settings)

}