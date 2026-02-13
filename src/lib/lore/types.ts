export type LoreType = 'characters' | 'districts' | 'artifacts';
export type LoreStatus = 'canon' | 'apocrypha' | 'draft';

export interface LoreFrontmatter {
  title: string;
  slug: string;
  type: LoreType;
  summary: string;
  tags: string[];
  related: string[];
  updatedAt: string;
  status: LoreStatus;
  heroImage?: string;
}

export interface LoreEntry {
  frontmatter: LoreFrontmatter;
  content: string;
  filepath: string;
}

export interface ValidationError {
  type: 'error' | 'warning';
  message: string;
  filepath?: string;
}
