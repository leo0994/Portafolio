import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import i18nextIntegration from "astro-i18next";
import i18nConfig from "./src/i18n/config.js";

export default defineConfig({
    output: 'static',
    integrations: [
        tailwind(),
        i18nextIntegration({ config: i18nConfig })
    ]
});
