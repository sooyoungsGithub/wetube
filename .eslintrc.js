module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ["airbnb-base", "plugin:prettier/recommended"],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    "no-console": 'off',
    "max-len": [2, {
      "code": 200,
      "tabWidth": 4,
      "ignoreUrls": true
    }]
  },
  env: {
    browser: "true"
  }
};