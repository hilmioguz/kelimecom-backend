module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/strongly-recommended',
    '@vue/airbnb',
  ],
  rules: {
    'max-len': 0,
    'no-console': 'off',
    'no-debugger': 'off',
    'no-return-assign': 'off',
    'func-names': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-param-reassign': 'off',
    'consistent-return': 'off',
    'no-restricted-syntax': 'off',
    'no-plusplus': 'off',
    'no-template-curly-in-string': 'off',
    'import/extensions': 'off',
    'prefer-const': 'off',
    'default-case': 'off',
    'camelcase':'off',
    'no-multi-str': 'off',
    'no-shadow': 'off',
    'no-continue': 'off',
    'no-restricted-globals': 'off',
    'prefer-destructuring': 'off',
    'import/no-named-as-default-member': 'off',
    'no-unused-expressions': 'off',
    'no-underscore-dangle': 'off',
    'radix': 'off',
    'no-prototype-builtins': 'off',
    'import/prefer-default-export': 'off',
    'no-multi-assign': 'off',
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
