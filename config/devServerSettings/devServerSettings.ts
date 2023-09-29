import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import {webpackSettings} from "../typesWebPack/typesWebpack";
export const DevServerSettings = (settings: webpackSettings): DevServerConfiguration => {
    return {
        static: {
            directory: settings.devServer.path
        },
        port: settings.devServer.port,
        compress: true
    }
}