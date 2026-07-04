export interface Story {
  id: number;
  name: string;
  age?: number;
  tagline: string;
  headline: string;

  heroImage: string;

  gallery?: string[];

  description: string[];

  whyStoryMattersTitle: string;
  whyStoryMatters: string;

  needs: string[];

  donationLink?: string;
  videoLink?: string;

  featured?: boolean;
}
