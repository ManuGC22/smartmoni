// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ["expo", "plugin:react-hooks/recommended"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    camelcase: "error",
    "spaced-comment": "error",
    "no-duplicate-imports": "error",
    "no-multiple-empty-lines": "error",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",
  },
};
