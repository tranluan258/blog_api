module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true
    },
    "extends": ["eslint:recommended", "prettier"],
    "plugins": ["prettier"],
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "rules": {
        "no-await-in-loop": "off",
      "no-irregular-whitespace": "off",
      "no-restricted-syntax": "off",
      "no-continue": "off"
    }
}
