export interface PostizIntegration {
  id: string;
  name: string;
  identifier: string;
  picture: string;
  disabled: boolean;
  profile: string;
  customer?: {
    id: string;
    name: string;
  };
}

export interface PostizMediaFile {
  id: string;
  name: string;
  path: string;
  organizationId: string;
  createdAt: string;
  updatedAt: string;
}

export interface PostizPostImage {
  id: string;
  path: string;
}

export interface PostizPostValue {
  content: string;
  image: PostizPostImage[];
}

export interface PostizInstagramSettings {
  __type: "instagram" | "instagram-standalone";
  post_type: "post" | "story";
  is_trial_reel?: boolean;
  collaborators?: Array<{ label: string }>;
}

export interface PostizPostEntry {
  integration: { id: string };
  value: PostizPostValue[];
  settings: PostizInstagramSettings;
}

export interface CreatePostBody {
  type: "schedule" | "now" | "draft";
  date: string;
  shortLink: boolean;
  tags: string[];
  posts: PostizPostEntry[];
}

export interface PostizListPost {
  id: string;
  publishDate: string;
  state: string;
  integration: { id: string; providerIdentifier?: string };
}
