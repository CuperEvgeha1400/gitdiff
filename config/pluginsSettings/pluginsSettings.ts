import webpack from "webpack";
import htmlWebpackPlugin from 'html-webpack-plugin'
import {Paths, webpackSettings} from "../typesWebPack/typesWebpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
export const pluginsSettings = (settings: webpackSettings): webpack.WebpackPluginInstance[] => {
    return [
        new htmlWebpackPlugin({
         publicPath: './',
            template: settings.paths.htmlPluginTemplate
        }),
        new MiniCssExtractPlugin({
            filename: settings.isDev ? "css/[name].css" : "css/[name].[contenthash].css",
            chunkFilename: settings.isDev ? "css/[id].css" : "css/[id].[contenthash].css"
        })
    ]
}