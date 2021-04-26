module.exports = function (api) {
  api.cache(false);
  return {
    "minified": false,
    "only": ["**/*.mjs", "*/*.mjs", "**/*.es6", "*/*.es6"],
    "presets": [
      [
        "@babel/env",
        {
          "targets": {
            "edge": "17",
            "firefox": "60",
            "chrome": "67",
            "safari": "11.1",
            "esmodules": true
          },
          "useBuiltIns": "entry"
        }
      ],
      "@babel/preset-react"
    ],
    "plugins": [
      [
        "@babel/plugin-transform-arrow-functions",
        {
          "spec": false
        }
      ],

      "@babel/plugin-proposal-do-expressions",
      "@babel/plugin-proposal-export-default-from",
      "@babel/plugin-proposal-export-namespace-from",
      "@babel/plugin-proposal-function-bind",
      "@babel/plugin-proposal-function-sent",
      "@babel/plugin-proposal-json-strings",
      "@babel/plugin-proposal-logical-assignment-operators",
      "@babel/plugin-proposal-nullish-coalescing-operator",
      "@babel/plugin-proposal-numeric-separator",
      "@babel/plugin-proposal-optional-chaining",
      [
        "@babel/plugin-proposal-pipeline-operator",
        {
          "proposal": "minimal"
        }
      ],
      "@babel/plugin-proposal-throw-expressions",
      "@babel/plugin-syntax-dynamic-import",
      "@babel/plugin-syntax-import-meta",
      "@babel/plugin-transform-member-expression-literals",
      "@babel/plugin-transform-property-literals",
      "@babel/plugin-proposal-class-properties",
      [
        "@babel/plugin-proposal-decorators",
        {
          "legacy": true
        }
      ],
      "babel-plugin-transform-merge-sibling-variables",
      "babel-plugin-minify-numeric-literals",

      ["@babel/plugin-transform-shorthand-properties"],
      ["@babel/plugin-transform-parameters"],
      [
        "@babel/plugin-transform-block-scoping",
        {
          "throwIfClosureRequired": true
        }
      ],
      [
        "@babel/plugin-transform-modules-commonjs",
        {
          "allowTopLevelThis": true,
          "noInterop": true,
          "lazy": true
        }
      ]
    ]
  }
}