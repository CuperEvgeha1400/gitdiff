export interface Paths {
    entry: string,
    output: string,
    htmlPluginTemplate: string,
    absolutePath: string
}
export enum Mode {
    PRODUCTION = 'production',
    DEVELOPMENT = 'development'
}
export interface EnvWebpack {
    mode: Mode,
    port: number
}
export interface devServer {
    port: number,
    path: string
}
export interface webpackSettings {
    paths: Paths,
    mode : Mode,
    devServer: devServer,
    isDev: boolean

}