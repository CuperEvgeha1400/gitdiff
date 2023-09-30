import webpack from "webpack";
import {Paths} from "../typesWebPack/typesWebpack";
export const resolveSettings = (paths: Paths): webpack.ResolveOptions => {
    return {
        modules: ['node_modules', paths.absolutePath],
        extensions : ['.js', '.ts' , '.tsx' , '.jsx', '.json']
    }
}