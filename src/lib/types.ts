export interface PracticeArea {
  title: string;
  slug: string;
  summary: string;
  detailedDescription: string;
}

export interface Profile {
  name: string;
  enrollmentNumber: string;
  practiceSince: string;
  qualifications: string[];
  professionalMemberships: string[];
  biography: string;
}

export interface SiteConfig {
  advocateName: string;
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
  contact: {
    address: string;
    phone: string;
    email: string;
    googleMapsUrl: string;
  };
  disclaimer: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  publishedDate: string;
  author: string;
  metaDescription: string;
  tags: string[];
}

// NEW TYPE FOR USERS
export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  role: "admin" | "moderator" | "user";
}
