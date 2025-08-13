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

// NEW TYPE FOR BLOG POSTS
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  publishedDate: string; // Stored as a string e.g., "August 12, 2025"
  author: string;
}
