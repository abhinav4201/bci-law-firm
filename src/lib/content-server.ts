// This file contains functions that can ONLY be used in Server Components
import fs from "fs";
import path from "path";
import type { SiteConfig, Profile, PracticeArea } from "./types";

const contentDirectory = path.join(process.cwd(), "content");

export function getSiteConfig(): SiteConfig {
  const fullPath = path.join(contentDirectory, "siteConfig.json");
  const fileContents = fs.readFileSync(fullPath, "utf8");
  return JSON.parse(fileContents);
}

export function getProfile(): Profile {
  const fullPath = path.join(contentDirectory, "profile.json");
  const fileContents = fs.readFileSync(fullPath, "utf8");
  return JSON.parse(fileContents);
}

export function getPracticeAreas(): PracticeArea[] {
  const fullPath = path.join(contentDirectory, "practiceAreas.json");
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const data: PracticeArea[] = JSON.parse(fileContents);
  return data.sort((a, b) => a.title.localeCompare(b.title));
}

export function getPrivacyPolicy() {
  const fullPath = path.join(contentDirectory, "privacyPolicy.json");
  const fileContents = fs.readFileSync(fullPath, "utf8");
  return JSON.parse(fileContents);
}