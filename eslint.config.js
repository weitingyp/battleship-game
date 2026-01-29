import pluginJs from "@eslint/js";

export default [
    // Global ignores to exclude everything except src
    {
        ignores: ["*", "!src/**"]
    },
    // Base recommended config
    pluginJs.configs.recommended,
    // Specific rules for src files
    {
        files: ["src/**/*.js", "src/**/*.jsx"],
        rules: {
            "no-unused-vars": "warn",
            "no-undef": "warn"
        }
    }
];
