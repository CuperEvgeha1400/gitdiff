module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    extends: [
        "standard-with-typescript",
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
        "plugin:n/recommended",
    ],
    ignorePatterns: ['**/config', '**/dist', '**/node_modules'],
    plugins: ["react"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: ['**/tsconfig.json']
    },
    overrides: [
        {
            files: ['src/**/*.test.ts'],
            rules: {
             "quote-props": "off"
            }
        }
    ],
    rules: {
        "@typescript-eslint/prefer-nullish-coalescing": "off",
        "@typescript-eslint/strict-boolean-expressions": "off",
        "n/no-missing-import": "off",
        "n/no-unpublished-import": "off",
        "import/no-absolute-path": "off",
        "n/no-extraneous-import": "off",
        "@typescript-eslint/explicit-function-return-type":[1],
        "@typescript-eslint/indent": [2, 4]
    }
}