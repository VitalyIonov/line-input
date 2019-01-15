module.exports = {
  extends: 'airbnb',
  env: {
    browser: true
  },
  rules: {
    'comma-dangle': 0,
    'linebreak-style': 0,
    'consistent-return': 0,
    'class-methods-use-this': 0,
    'object-curly-newline': 0,
    'id-length': [1, { min: 1 }],
    'function-paren-newline': ['error', { minItems: 5 }],
    'arrow-parens': ['error', 'as-needed'],
    'max-len': [2, 200, 2, {
      ignoreUrls: true,
      ignoreComments: false
    }],

    'react/require-default-props': 0,
    'react/forbid-prop-types': [2, { forbid: ['any'] }]
  },
  settings: {
    'import/resolver': {
      'babel-module': {}
    }
  }
};
