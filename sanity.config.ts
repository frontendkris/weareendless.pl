import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schema";
import { myStructure } from "./sanity/deskStructure";

export default defineConfig({
  name: "endless",
  title: "Endless",
  projectId: "5ui3cwl9",
  dataset: "develop",
  plugins: [
    structureTool({
      structure: myStructure,
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
});
