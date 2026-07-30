/**
 * Forma tuturor datelor editabile din admin, validată cu Zod.
 * Aceeași schemă e folosită de rutele API din /admin (validare la salvare)
 * și de tipurile TypeScript consumate în restul site-ului.
 */
import { z } from "zod";

export const iconNameSchema = z.enum([
  "whistle",
  "trophy",
  "path",
  "heart",
  "shield",
  "users",
]);

export const siteSchema = z.object({
  name: z.string().min(1),
  longName: z.string().min(1),
  tagline: z.string().min(1),
  motto: z.string().min(1),
  foundedYear: z.number().int().min(1900).max(2100),
  url: z.string().min(1),
  description: z.string().min(1),
  logo: z.string().min(1),
  heroImage: z.string().min(1),
});

export const contactSchema = z.object({
  phone: z.string().min(1),
  phoneHref: z.string().min(1),
  whatsappHref: z.string().min(1),
  email: z.string().min(1),
  emailHref: z.string().min(1),
  facebook: z.string(),
  instagram: z.string(),
  youtube: z.string(),
  tiktok: z.string(),
  schedule: z.string().min(1),
});

export const legalSchema = z.object({
  entityName: z.string(),
  cif: z.string(),
  registeredAddress: z.string(),
});

export const statSchema = z.object({
  value: z.string().min(1),
  label: z.string().min(1),
});

export const valueSchema = z.object({
  icon: iconNameSchema,
  title: z.string().min(1),
  text: z.string().min(1),
});

export const groupSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  ages: z.string().min(1),
  years: z.string().min(1),
  summary: z.string().min(1),
  focus: z.array(z.string().min(1)),
  sessions: z.string().min(1),
  competitions: z.string().min(1),
  image: z.string().min(1),
  imageAlt: z.string(),
});

export const baseImageSchema = z.object({
  src: z.string().min(1),
  alt: z.string(),
});

export const baseSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  address: z.string().min(1),
  area: z.string().min(1),
  facilities: z.array(z.string().min(1)),
  mapsQuery: z.string().min(1),
  images: z.array(baseImageSchema),
});

export const milestoneSchema = z.object({
  year: z.string().min(1),
  title: z.string().min(1),
  text: z.string().min(1),
});

export const coachSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  license: z.string().min(1),
  bio: z.string().min(1),
  photo: z.string(),
});

export const founderQuoteSchema = z.object({
  text: z.string().min(1),
  author: z.string().min(1),
  role: z.string().min(1),
  image: z.string().min(1),
  imageAlt: z.string(),
});

export const trophySchema = z.object({
  year: z.string().min(1),
  title: z.string().min(1),
  scope: z.enum(["national", "international"]),
});

export const galleryPhotoSchema = z.object({
  src: z.string().min(1),
  alt: z.string(),
});

export const faqSchema = z.object({
  q: z.string().min(1),
  a: z.string().min(1),
});

export const navItemSchema = z.object({
  href: z.string().min(1),
  label: z.string().min(1),
});

export const contentSchema = z.object({
  site: siteSchema,
  contact: contactSchema,
  legal: legalSchema,
  stats: z.array(statSchema),
  values: z.array(valueSchema),
  groups: z.array(groupSchema),
  bases: z.array(baseSchema),
  timeline: z.array(milestoneSchema),
  staff: z.array(coachSchema),
  founderQuote: founderQuoteSchema,
  trophies: z.array(trophySchema),
  gallery: z.array(galleryPhotoSchema),
  faq: z.array(faqSchema),
  nav: z.array(navItemSchema),
});

export type IconName = z.infer<typeof iconNameSchema>;
export type Site = z.infer<typeof siteSchema>;
export type Contact = z.infer<typeof contactSchema>;
export type Legal = z.infer<typeof legalSchema>;
export type Stat = z.infer<typeof statSchema>;
export type Value = z.infer<typeof valueSchema>;
export type Group = z.infer<typeof groupSchema>;
export type BaseImage = z.infer<typeof baseImageSchema>;
export type Base = z.infer<typeof baseSchema>;
export type Milestone = z.infer<typeof milestoneSchema>;
export type Coach = z.infer<typeof coachSchema>;
export type FounderQuote = z.infer<typeof founderQuoteSchema>;
export type Trophy = z.infer<typeof trophySchema>;
export type GalleryPhoto = z.infer<typeof galleryPhotoSchema>;
export type Faq = z.infer<typeof faqSchema>;
export type NavItem = z.infer<typeof navItemSchema>;
export type Content = z.infer<typeof contentSchema>;

/** Cheile secțiunilor editabile independent din admin. */
export const sectionKeys = [
  "site",
  "contact",
  "legal",
  "stats",
  "values",
  "groups",
  "bases",
  "timeline",
  "staff",
  "founderQuote",
  "trophies",
  "gallery",
  "faq",
] as const;

export type SectionKey = (typeof sectionKeys)[number];

const sectionSchemas: Record<SectionKey, z.ZodTypeAny> = {
  site: siteSchema,
  contact: contactSchema,
  legal: legalSchema,
  stats: z.array(statSchema),
  values: z.array(valueSchema),
  groups: z.array(groupSchema),
  bases: z.array(baseSchema),
  timeline: z.array(milestoneSchema),
  staff: z.array(coachSchema),
  founderQuote: founderQuoteSchema,
  trophies: z.array(trophySchema),
  gallery: z.array(galleryPhotoSchema),
  faq: z.array(faqSchema),
};

export function getSectionSchema(section: SectionKey) {
  return sectionSchemas[section];
}
