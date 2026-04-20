{
  "extends": ["@typescript-eslint/recommended", "prettier"],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2020,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "plugins": ["@typescript-eslint", "react", "react-hooks", "react-refresh"],
  "rules": {
    "react-refresh/only-export-components": "warn",
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": "warn",
    "react/prop-types": "off"
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}
