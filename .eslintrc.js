module.exports = {
    ignorePatterns: ['**/*.spec.ts', '**/*.e2e-spec.ts'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint/eslint-plugin'],
    extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'prettier/@typescript-eslint',
    ],
    root: true,
    env: {
        node: true,
        jest: true,
    },
    rules: {
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'semi': 'error',
        'newline-after-var': 'error',
        'quotes': ['error', 'single'],
        'no-var': 'error',
        'no-multiple-empty-lines': ['error', {'max': 1}],
        'no-multi-spaces': 'error',
        'space-in-parens': 'error',
        'prefer-const': 'error',
        'no-use-before-define': 'error',
        'indent': ['error', 2],
    },
};