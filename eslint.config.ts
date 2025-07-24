import { defineConfig } from "eslint/config";

export default defineConfig([
	{
        files: ["cypress/e2e/**/*.ts"],
		rules: {
			semi: "error",
			"prefer-const": "error",
		}
	},
	{
        files: ["cypress/support/**/*.{ts,js}"],
		rules: {
			semi: "warn",
			"prefer-const": "error",
		},
	},
]);