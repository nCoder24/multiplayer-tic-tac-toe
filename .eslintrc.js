module.exports = {
  env: {
    es2022: true,
    node: true,
    browser: true,
  },

  extends: ["eslint:recommended"],

  parserOptions: {
    ecmaVersion: "latest",
  },

  rules: {
    semi: ["error", "always", { omitLastInOneLineBlock: true }],
    indent: ["error", 2, { SwitchCase: 1 }],

    complexity: ["error", 3],
    "array-callback-return": ["error", { checkForEach: false }],
    "max-depth": ["error", 2],
    "max-statements": ["error", 10],

    "no-cond-assign": "error",
    "no-empty": "error",
    "no-implicit-coercion": "error",
    "no-implicit-globals": "error",
    "no-param-reassign": "error",
    "no-shadow": "error",
  },

  overrides: [
    {
      files: ["public/scripts/*"],
      rules: {
        "no-unused-vars": "off",
        "no-undef": "off",
      },
    },
    {
      files: ["test/*/*"],
      rules: {
        "max-statements": "off",
      },
    },
  ],
};
