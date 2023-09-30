import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";

export const configStorybook = (config: webpack.Configuration): webpack.Configuration => {
   const paths = {
        absolutePath: path.resolve(__dirname, '../', '../', 'src'),
        entry: path.resolve(__dirname, 'preview.tsx')
    }
    const styleRule = {
        test: /\.(s[ac]ss|css)$/i,
        use: [
               MiniCssExtractPlugin.loader,
            {
                loader : "css-loader",
                options: {
                    modules: {
                        auto: (resourcePath: string) => resourcePath.includes(".module."),
                        localIdentName:  "[hash:base64:5]"
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
    config.resolve.extensions.push(...['.ts', '.tsx', '.js', '.jsx'])
    config.resolve.modules.push(...['node_modules', paths.absolutePath])
    config.module.rules.push(...[styleRule, fileRule])
    config.plugins.push(new MiniCssExtractPlugin({}))


    return config
}