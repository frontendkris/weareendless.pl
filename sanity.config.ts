import dotenv from 'dotenv';
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schema";
import { myStructure } from "./deskStructure";

dotenv.config();

export default defineConfig({
  name: "endless",
  title: "Endless",
  projectId: "5ui3cwl9",
  dataset: "develop",
  plugins: [
    structureTool({
      structure: myStructure,
    }), 
    visionTool()
  ],
  schema: {
    types: schemaTypes,
  },
});