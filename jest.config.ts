import type { Config } from 'jest'

const config: Config = {

    moduleFileExtensions: [
        'js',
        'mjs',
        'cjs',
        'jsx',
        'ts',
        'tsx',
        'json',
        'node'
    ],

    // Automatically clear mock calls, instances, contexts and results before every test
    clearMocks: true,

    // Indicates whether the coverage information should be collected while executing the test
    collectCoverage: true,

    // The directory where Jest should output its coverage files
    coverageDirectory: 'coverage',

    // The root directory that Jest should scan for tests and modules within
    rootDir: '.',

    // A list of paths to directories that Jest should use to search for files in
    roots: [
        '<rootDir>/src/'
    ],

    // The test environment that will be used for testing
    testEnvironment: 'jsdom',

    // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
    testPathIgnorePatterns: [
        '\\\\node_modules\\\\'
    ],
    moduleDirectories: ['node_modules', 'src'],
    setupFilesAfterEnv: [
        '<rootDir>/config/SetUpJest/setUpJest.ts'
    ],
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
    }
}

export default config
