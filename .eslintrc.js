module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint", "cypress"],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
    ],
    ignorePatterns: ["*.js"],
    rules: {
        "@typescript-eslint/triple-slash-reference": "off",
        "@typescript-eslint/no-namespace": "off",
        "no-unused-vars": "off",
        "no-irregular-whitespace": ["error", { skipComments: true }],
        "cypress/no-assigning-return-values": "error",
        "cypress/no-unnecessary-waiting": "warn",
        "cypress/no-force": "warn",
        "cypress/no-async-tests": "error",
        "cypress/no-pause": "error",
    },
};
