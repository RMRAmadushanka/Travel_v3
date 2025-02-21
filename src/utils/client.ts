import imageUrlBuilder from "@sanity/image-url";

//connect to sanity
import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

//be able to use sanity images
const builder = imageUrlBuilder(client);

export const urlFor = (source:any) => builder.image(source)