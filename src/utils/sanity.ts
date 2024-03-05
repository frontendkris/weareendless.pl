import { sanityClient } from "sanity:client";
import type { PortableTextBlock } from "@portabletext/types";
import type { Slug } from "@sanity/types";
import groq from "groq";

export interface Post {
  _type: "post";
  _createdAt: string;
  title: string;
  slug: Slug;
  body: PortableTextBlock[];
}

export interface Page {
  _type: "page";
  _createdAt: string;
  title: string;
  slug: Slug;
  body: PortableTextBlock[];
}

// export async function getPosts(): Promise<Post[]> {
//   return await sanityClient.fetch(
//     groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc)`
//   );
// }

// export async function getPost(slug: string): Promise<Post> {
//   return await sanityClient.fetch(
//     groq`*[_type == "post" && slug.current == $slug][0]`,
//     {
//       slug,
//     }
//   );
// }

// export async function getPages(): Promise<Page[]> {
//   return await sanityClient.fetch(
//     groq`*[_type == "page" && defined(slug.current)] | order(_createdAt desc)`
//   );
// }

// export async function getPage(slug: string): Promise<Post> {
//   return await sanityClient.fetch(
//     groq`*[_type == "page" && slug.current == $slug][0]`,
//     {
//       slug,
//     }
//   );
// }

// export type ServiceRow = {
//   name: string;
//   when: string;
// }

// export type OfficeRow = {
//   day: string;
//   hours: string;
//   note: string;
// }

// export type Album = {
//   date?: string,
//   name: string,
//   link?: string,
// }

// export type albumsCollection = {
//   year: string,
//   albums: Album[],
// }

// export async function getOptions(): Promise<{ [key: string]: any }> {
//   return await sanityClient.fetch(
//     groq`*[_type == "siteSettings"][0]{
//       "massIntentions": massIntentions,
//       "parishAnnouncements": parishAnnouncements,
//       "phone": phone,
//       "address": address,
//       "messes": messes,
//       "confession": confession,
//       "services": services,
//       "office": office,
//       "bankAccount": bankAccount,
//       "galleryLinks": galleryLinks,
//     }`
//   );
// }