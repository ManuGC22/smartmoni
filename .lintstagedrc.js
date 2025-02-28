module.exports = {
  "*.{js,jsx,ts,tsx}": [
    "prettier --write",
    "eslint",
    "jest --bail --findRelatedTests --passWithNoTests",
  ],
};
