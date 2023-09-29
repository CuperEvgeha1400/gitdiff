import webpack from "webpack";
export const resolveSettings = (): webpack.ResolveOptions => {
    return {
        modules: ['node_modules'],
        extensions : ['.js', '.ts' , '.tsx' , '.jsx', '.json']
    }
}