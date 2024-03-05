import dotenv from 'dotenv';
import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import { sanityIntegration } from "@sanity/astro";
import vercel from '@astrojs/vercel/serverless';
import tailwind from "@astrojs/tailwind";
dotenv.config();


// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  adapter: vercel(),
  integrations: [sanityIntegration({
    projectId: process.env.PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.PUBLIC_SANITY_DATASET,
    useCdn: false,
    studioBasePath: "/admin",
    apiVersion: "2024-03-04"
  }), react(), tailwind()]
});