import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export const rulesSettings = (isDev: boolean): webpack.RuleSetRule[] => {
    const tsRule = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    }
    const styleRule = {
        test: /\.(s[ac]ss|css)$/i,
            use: [
            isDev ? "style-loader" :  MiniCssExtractPlugin.loader,
                {
                 loader : "css-loader",
                 options: {
                     modules: {
                         auto: (resourcePath: string) => resourcePath.includes(".module."),
                         localIdentName: isDev ?"[path][name]__[local]--[hash:base64:5]" : "[hash:base64:5]"
                     }
                 }
                },
            "sass-loader",
        ],
    }
    const fileRule = {
        test: /\.(png|jpg|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
            filename: 'static/images/[hash][ext][query]'
        }
    }
    return [
       tsRule,
        styleRule,
        fileRule
    ]
}