module.exports = {
  extends: [
    'airbnb',
    'airbnb-typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 2018 },
  plugins: [
    '@typescript-eslint',
    'sort-destructure-keys',
    'typescript-sort-keys',
    'eslint-plugin-react',
    'sort-class-members',
  ],
  root: true,
  rules: {
    '@typescript-eslint/camelcase': ['off'],
    '@typescript-eslint/member-ordering': ['error', {
      classes: [
        'static-field',
        'instance-field',
        'constructor',
        'static-method',
        'instance-method',
      ],
    }],
    'arrow-body-style': ['off'],
    'arrow-parens': ['error', 'always'],
    'dot-notation': ['off'],
    'global-require': ['off'],
    'import/no-dynamic-require': ['off'],
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: true,
    }],
    'import/no-unresolved': ['off'],
    'import/order': ['off'],
    'import/prefer-default-export': ['off'],
    'jsx-a11y/click-events-have-key-events': ['off'],
    'jsx-a11y/label-has-associated-control': ['off'],
    'jsx-a11y/label-has-for': ['off'],
    'jsx-a11y/no-noninteractive-element-interactions': ['off'],
    'lines-between-class-members': ['off'],
    'no-await-in-loop': ['off'],
    'no-param-reassign': ['off', { props: false }],
    'no-underscore-dangle': ['off'],
    'no-unneeded-ternary': ['error', {
      defaultAssignment: true,
    }],
    'no-use-before-define': ['error', {
      functions: false,
    }],
    'object-curly-newline': ['off'],
    'prefer-template': ['off'],
    quotes: [
      'error',
      'single',
      {
        allowTemplateLiterals: true,
      }],
    'react/destructuring-assignment': ['off'],
    'react/jsx-max-props-per-line': ['error', {
      maximum: 2,
    }],
    'react/jsx-sort-props': ['error', {
      reservedFirst: false,
    }],
    'react/no-danger': ['off'],
    'react/prop-types': ['off'],
    'sort-destructure-keys/sort-destructure-keys': 2,
    'sort-keys': ['error'],
    'typescript-sort-keys/interface': ['error', 'asc', {
      caseSensitive: false,
    }],
    'typescript-sort-keys/string-enum': 2,
    'wrap-iife': ['error', 'inside'],
  },
};
