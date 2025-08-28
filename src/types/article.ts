/**
 * Article Types
 * Types untuk sistem artikel dan berita
 */

import { BaseEntity, FileMetadata, Priority, Status } from './common';
import { User } from './auth';

// =============================================================================
// ARTICLE CORE TYPES
// =============================================================================

/**
 * Article categories
 */
export type ArticleCategory =
  | 'NEWS'
  | 'GOVERNMENT'
  | 'TOURISM'
  | 'ECONOMY'
  | 'EDUCATION'
  | 'HEALTH'
  | 'ENVIRONMENT'
  | 'CULTURE'
  | 'SPORTS'
  | 'TECHNOLOGY'
  | 'SOCIAL'
  | 'DEVELOPMENT'
  | 'ANNOUNCEMENT'
  | 'OTHER';

/**
 * Article status
 */
export type ArticleStatus =
  | 'DRAFT'
  | 'PENDING_REVIEW'
  | 'IN_REVIEW'
  | 'APPROVED'
  | 'PUBLISHED'
  | 'SCHEDULED'
  | 'ARCHIVED'
  | 'REJECTED'
  | 'RETRACTED';

/**
 * Article visibility
 */
export type ArticleVisibility =
  | 'PUBLIC'
  | 'REGISTERED_ONLY'
  | 'MEMBERS_ONLY'
  | 'PREMIUM'
  | 'PRIVATE';

/**
 * Article type
 */
export type ArticleType =
  | 'STANDARD'
  | 'FEATURED'
  | 'BREAKING_NEWS'
  | 'OPINION'
  | 'INTERVIEW'
  | 'TUTORIAL'
  | 'GALLERY'
  | 'VIDEO'
  | 'INFOGRAPHIC'
  | 'LIVE_BLOG';

/**
 * Content format
 */
export type ContentFormat = 'HTML' | 'MARKDOWN' | 'RICH_TEXT' | 'BLOCKS'; // Block-based editor

/**
 * Main article interface
 */
export interface Article extends BaseEntity {
  // Basic information
  title: string;
  subtitle?: string;
  content: string;
  excerpt?: string;
  slug: string;

  // Classification
  category: ArticleCategory;
  status: ArticleStatus;
  visibility: ArticleVisibility;
  type: ArticleType;
  format: ContentFormat;

  // Author information
  authorId: string;
  author?: User;
  coAuthors?: User[];
  editorId?: string;
  editor?: User;

  // Publishing details
  publishedAt?: string;
  scheduledAt?: string;
  archivedAt?: string;
  lastEditedAt?: string;

  // Content metadata
  tags: string[];
  language: string;
  wordCount: number;
  readingTime: number; // minutes
  difficulty?: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';

  // Media
  coverImage?: FileMetadata;
  featuredImage?: FileMetadata;
  gallery?: FileMetadata[];
  attachments?: FileMetadata[];
  videos?: VideoMetadata[];

  // SEO and metadata
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: FileMetadata;

  // Engagement metrics
  viewsCount: number;
  uniqueViewCount: number;
  shareCount: number;
  likeCount: number;
  commentCount: number;
  bookmarkCount: number;
  averageRating?: number;
  totalRatings?: number;

  // Settings
  allowComments: boolean;
  allowRatings: boolean;
  allowSharing: boolean;
  featured: boolean;
  trending: boolean;
  breaking: boolean;
  sticky: boolean;

  // Monetization (if applicable)
  isPremium: boolean;
  price?: number;
  discountPrice?: number;

  // Workflow
  approvalRequired: boolean;
  approvedBy?: string;
  approvedAt?: string;
  rejectionReason?: string;

  // Analytics
  impressions?: number;
  clickThroughRate?: number;
  engagementRate?: number;
  bounceRate?: number;
  averageTimeOnPage?: number;

  // Syndication
  syndicationEnabled: boolean;
  syndicationPartners?: string[];

  // Related content
  relatedArticles?: string[];
  series?: ArticleSeries;
  seriesOrder?: number;

  // Source information
  originalSource?: string;
  attribution?: string;
  license?:
    | 'CC-BY'
    | 'CC-BY-SA'
    | 'CC-BY-NC'
    | 'CC-BY-ND'
    | 'ALL_RIGHTS_RESERVED'
    | 'PUBLIC_DOMAIN';

  // Custom fields
  customFields?: Record<string, any>;
}

/**
 * Video metadata
 */
export interface VideoMetadata {
  id: string;
  title: string;
  description?: string;
  url: string;
  thumbnailUrl?: string;
  duration?: number; // seconds
  size?: number; // bytes
  format?: string;
  provider?: 'LOCAL' | 'YOUTUBE' | 'VIMEO' | 'DAILYMOTION';
  embedCode?: string;
}

/**
 * Article series
 */
export interface ArticleSeries extends BaseEntity {
  title: string;
  description?: string;
  slug: string;
  coverImage?: FileMetadata;
  totalArticles: number;
  publishedArticles: number;
  isComplete: boolean;
  authorId: string;
  author?: User;
}

// =============================================================================
// ARTICLE REQUEST TYPES
// =============================================================================

/**
 * Article creation request
 */
export interface CreateArticleRequest {
  title: string;
  subtitle?: string;
  content: string;
  excerpt?: string;
  category: ArticleCategory;
  status?: ArticleStatus;
  visibility?: ArticleVisibility;
  type?: ArticleType;
  format?: ContentFormat;

  // Publishing
  publishedAt?: string;
  scheduledAt?: string;

  // Content metadata
  tags?: string[];
  language?: string;
  difficulty?: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';

  // Media
  coverImageId?: string;
  featuredImageId?: string;
  galleryIds?: string[];
  attachmentIds?: string[];
  videos?: VideoMetadata[];

  // SEO
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImageId?: string;

  // Settings
  allowComments?: boolean;
  allowRatings?: boolean;
  allowSharing?: boolean;
  featured?: boolean;
  breaking?: boolean;
  sticky?: boolean;

  // Monetization
  isPremium?: boolean;
  price?: number;
  discountPrice?: number;

  // Workflow
  approvalRequired?: boolean;

  // Syndication
  syndicationEnabled?: boolean;
  syndicationPartners?: string[];

  // Related content
  relatedArticleIds?: string[];
  seriesId?: string;
  seriesOrder?: number;

  // Source
  originalSource?: string;
  attribution?: string;
  license?: string;

  // Co-authors
  coAuthorIds?: string[];

  // Custom fields
  customFields?: Record<string, any>;
}

/**
 * Article update request
 */
export interface UpdateArticleRequest extends Partial<CreateArticleRequest> {
  id: string;
  reason?: string; // Reason for update
  majorUpdate?: boolean; // Whether this is a major content update
}

// =============================================================================
// ARTICLE QUERY TYPES
// =============================================================================

/**
 * Article query parameters
 */
export interface ArticleQuery {
  // Search
  search?: string;
  searchFields?: ('title' | 'content' | 'excerpt' | 'tags' | 'author')[];

  // Filters
  category?: ArticleCategory | ArticleCategory[];
  status?: ArticleStatus | ArticleStatus[];
  visibility?: ArticleVisibility | ArticleVisibility[];
  type?: ArticleType | ArticleType[];
  format?: ContentFormat | ContentFormat[];

  // Author filters
  authorId?: string;
  authorName?: string;
  coAuthorId?: string;
  editorId?: string;

  // Date filters
  publishedAfter?: string;
  publishedBefore?: string;
  createdAfter?: string;
  createdBefore?: string;
  lastEditedAfter?: string;
  lastEditedBefore?: string;

  // Content filters
  tags?: string[];
  language?: string;
  difficulty?: string[];
  minWordCount?: number;
  maxWordCount?: number;
  minReadingTime?: number;
  maxReadingTime?: number;

  // Feature filters
  featured?: boolean;
  trending?: boolean;
  breaking?: boolean;
  sticky?: boolean;
  isPremium?: boolean;
  hasCoverImage?: boolean;
  hasVideo?: boolean;
  hasGallery?: boolean;

  // Engagement filters
  minViews?: number;
  maxViews?: number;
  minShares?: number;
  maxShares?: number;
  minComments?: number;
  maxComments?: number;
  minRating?: number;
  maxRating?: number;

  // Series
  seriesId?: string;

  // License
  license?: string[];

  // Sorting
  sortBy?:
    | 'createdAt'
    | 'publishedAt'
    | 'updatedAt'
    | 'title'
    | 'viewsCount'
    | 'shareCount'
    | 'commentCount'
    | 'averageRating'
    | 'readingTime';
  sortOrder?: 'asc' | 'desc';

  // Pagination
  page?: number;
  limit?: number;
  offset?: number;

  // Include relations
  includeAuthor?: boolean;
  includeCoAuthors?: boolean;
  includeEditor?: boolean;
  includeSeries?: boolean;
  includeStats?: boolean;
  includeRelated?: boolean;
}

/**
 * Public article query (for frontend)
 */
export interface PublicArticleQuery {
  search?: string;
  category?: ArticleCategory | ArticleCategory[];
  type?: ArticleType | ArticleType[];
  tags?: string[];
  language?: string;
  difficulty?: string[];
  featured?: boolean;
  trending?: boolean;
  breaking?: boolean;
  authorId?: string;
  seriesId?: string;
  limit?: number;
  offset?: number;
  sortBy?: 'publishedAt' | 'title' | 'viewsCount' | 'averageRating' | 'trending';
  sortOrder?: 'asc' | 'desc';
}

// =============================================================================
// ARTICLE INTERACTION TYPES
// =============================================================================

/**
 * Article like
 */
export interface ArticleLike extends BaseEntity {
  articleId: string;
  userId: string;
  user?: User;
  ipAddress?: string;
}

/**
 * Article bookmark
 */
export interface ArticleBookmark extends BaseEntity {
  articleId: string;
  userId: string;
  user?: User;
  folderId?: string; // For organizing bookmarks
  notes?: string;
}

/**
 * Article share
 */
export interface ArticleShare extends BaseEntity {
  articleId: string;
  userId?: string;
  user?: User;
  platform:
    | 'facebook'
    | 'twitter'
    | 'linkedin'
    | 'whatsapp'
    | 'telegram'
    | 'email'
    | 'copy_link'
    | 'print';
  ipAddress?: string;
  userAgent?: string;
  referrer?: string;
}

/**
 * Article rating
 */
export interface ArticleRating extends BaseEntity {
  articleId: string;
  userId: string;
  user?: User;
  rating: number; // 1-5
  review?: string;
  helpful?: number; // How many found this review helpful
  ipAddress?: string;
}

/**
 * Article comment
 */
export interface ArticleComment extends BaseEntity {
  articleId: string;
  userId: string;
  user?: User;
  parentId?: string; // For nested comments
  content: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'HIDDEN' | 'FLAGGED';
  moderatedBy?: string;
  moderatedAt?: string;
  moderationReason?: string;
  likeCount: number;
  replyCount: number;
  edited: boolean;
  editedAt?: string;
  ipAddress?: string;
  flaggedCount?: number;
  flaggedReasons?: string[];
}

/**
 * Article view tracking
 */
export interface ArticleView extends BaseEntity {
  articleId: string;
  userId?: string;
  sessionId: string;
  ipAddress: string;
  userAgent?: string;
  referrer?: string;
  country?: string;
  city?: string;
  viewDuration?: number; // seconds
  scrollDepth?: number; // percentage
  readingProgress?: number; // percentage
  source?: 'direct' | 'search' | 'social' | 'email' | 'recommendation' | 'related';
  device?: 'desktop' | 'mobile' | 'tablet';
  isUnique: boolean;
}

// =============================================================================
// ARTICLE WORKFLOW TYPES
// =============================================================================

/**
 * Article revision
 */
export interface ArticleRevision extends BaseEntity {
  articleId: string;
  article?: Article;
  versionNumber: number;
  title: string;
  content: string;
  excerpt?: string;
  changeType: 'MINOR' | 'MAJOR' | 'EDITORIAL' | 'CORRECTION';
  changeDescription?: string;
  changedBy: string;
  changedFields: string[];
  wordCountChange: number;
  diff?: string; // JSON diff
  approved: boolean;
  approvedBy?: string;
  approvedAt?: string;
}

/**
 * Article approval workflow
 */
export interface ArticleApproval extends BaseEntity {
  articleId: string;
  article?: Article;
  submittedBy: string;
  submittedAt: string;
  reviewedBy?: string;
  reviewedAt?: string;
  status: 'PENDING' | 'IN_REVIEW' | 'APPROVED' | 'REJECTED' | 'CHANGES_REQUESTED';
  priority: Priority;
  deadline?: string;
  reviewNotes?: string;
  checklist?: ApprovalChecklistItem[];
  notificationSent: boolean;
}

/**
 * Approval checklist item
 */
export interface ApprovalChecklistItem {
  id: string;
  label: string;
  checked: boolean;
  required: boolean;
  notes?: string;
}

/**
 * Article bulk operation
 */
export interface ArticleBulkOperation {
  operation:
    | 'publish'
    | 'unpublish'
    | 'archive'
    | 'delete'
    | 'approve'
    | 'reject'
    | 'feature'
    | 'unfeature'
    | 'move_category';
  articleIds: string[];
  targetCategory?: ArticleCategory;
  reason?: string;
  scheduledAt?: string;
  notifyAuthors?: boolean;
  customMessage?: string;
}

// =============================================================================
// ARTICLE ANALYTICS TYPES
// =============================================================================

/**
 * Article statistics
 */
export interface ArticleStats {
  article: Article;
  metrics: {
    views: {
      total: number;
      unique: number;
      today: number;
      thisWeek: number;
      thisMonth: number;
      growth: number; // percentage
      peakDay: string;
      peakViews: number;
    };
    engagement: {
      likes: number;
      shares: number;
      comments: number;
      bookmarks: number;
      ratings: number;
      averageRating: number;
      engagementRate: number; // percentage
      socialShares: Record<string, number>;
    };
    reading: {
      averageTimeOnPage: number; // seconds
      averageScrollDepth: number; // percentage
      averageReadingProgress: number; // percentage
      bounceRate: number; // percentage
      completionRate: number; // percentage
    };
    traffic: {
      sources: Array<{ source: string; visits: number; percentage: number }>;
      referrers: Array<{ referrer: string; visits: number }>;
      searchKeywords: Array<{ keyword: string; visits: number }>;
      devices: Array<{ device: string; visits: number; percentage: number }>;
    };
    geography: {
      countries: Array<{ country: string; visits: number; percentage: number }>;
      cities: Array<{ city: string; visits: number; percentage: number }>;
    };
    timeline: Array<{
      date: string;
      views: number;
      uniqueViews: number;
      likes: number;
      shares: number;
      comments: number;
    }>;
  };
  performance: {
    score: number; // 0-100
    ranking: number;
    category: 'viral' | 'excellent' | 'good' | 'average' | 'poor';
    recommendations: string[];
    competitorComparison?: {
      views: number;
      engagement: number;
      position: number;
    };
  };
}

/**
 * Article analytics overview
 */
export interface ArticleAnalytics {
  overview: {
    totalArticles: number;
    publishedArticles: number;
    draftArticles: number;
    scheduledArticles: number;
    totalViews: number;
    totalEngagement: number;
    averageEngagementRate: number;
    averageReadingTime: number;
  };

  performance: {
    topPerforming: Article[];
    trending: Article[];
    mostEngaged: Article[];
    recentlyPublished: Article[];
    needingAttention: Article[];
  };

  trends: {
    viewTrends: Array<{ date: string; views: number; engagement: number }>;
    categoryTrends: Array<{
      category: ArticleCategory;
      count: number;
      growth: number;
    }>;
    authorTrends: Array<{
      authorId: string;
      authorName: string;
      articles: number;
      views: number;
    }>;
    engagementTrends: Array<{
      date: string;
      likes: number;
      shares: number;
      comments: number;
      bookmarks: number;
    }>;
  };

  insights: {
    bestPerformingCategories: ArticleCategory[];
    optimalPublishTimes: Array<{
      hour: number;
      dayOfWeek: number;
      score: number;
    }>;
    optimalArticleLength: { min: number; max: number; average: number };
    topPerformingTags: Array<{ tag: string; usage: number; avgViews: number }>;
    contentGaps: Array<{
      category: ArticleCategory;
      suggestedTopics: string[];
    }>;
  };
}

// =============================================================================
// CONSTANTS
// =============================================================================

/**
 * Article constants
 */
export const ARTICLE_CONSTANTS = {
  MAX_TITLE_LENGTH: 255,
  MAX_SUBTITLE_LENGTH: 500,
  MAX_EXCERPT_LENGTH: 1000,
  MAX_CONTENT_LENGTH: 100000,
  MAX_TAGS: 15,
  MAX_COAUTHORS: 5,
  MAX_GALLERY_IMAGES: 50,
  MAX_ATTACHMENTS: 20,
  MAX_VIDEOS: 10,
  AUTO_EXCERPT_LENGTH: 200,
  READING_SPEED_WPM: 200, // Words per minute for reading time calculation
  TRENDING_THRESHOLD_DAYS: 7,
  FEATURED_LIMIT: 20,
  STICKY_LIMIT: 5,
  AUTO_ARCHIVE_DAYS: 730, // 2 years
  MIN_RATING: 1,
  MAX_RATING: 5,
  COMMENT_MAX_LENGTH: 5000,
  SEARCH_MIN_LENGTH: 3,
  SLUG_MAX_LENGTH: 100,
  META_TITLE_MAX_LENGTH: 60,
  META_DESCRIPTION_MAX_LENGTH: 160,
  VIEW_TRACKING_THROTTLE: 30000, // 30 seconds
  BULK_OPERATION_LIMIT: 100,
} as const;

/**
 * Article category labels (Indonesian)
 */
export const ARTICLE_CATEGORY_LABELS: Record<ArticleCategory, string> = {
  NEWS: 'Berita',
  GOVERNMENT: 'Pemerintahan',
  TOURISM: 'Pariwisata',
  ECONOMY: 'Ekonomi',
  EDUCATION: 'Pendidikan',
  HEALTH: 'Kesehatan',
  ENVIRONMENT: 'Lingkungan',
  CULTURE: 'Budaya',
  SPORTS: 'Olahraga',
  TECHNOLOGY: 'Teknologi',
  SOCIAL: 'Sosial',
  DEVELOPMENT: 'Pembangunan',
  ANNOUNCEMENT: 'Pengumuman',
  OTHER: 'Lainnya',
} as const;

/**
 * Article status labels (Indonesian)
 */
export const ARTICLE_STATUS_LABELS: Record<ArticleStatus, string> = {
  DRAFT: 'Konsep',
  PENDING_REVIEW: 'Menunggu Persetujuan',
  IN_REVIEW: 'Sedang Ditinjau',
  APPROVED: 'Disetujui',
  PUBLISHED: 'Dipublikasikan',
  SCHEDULED: 'Terjadwal',
  ARCHIVED: 'Diarsipkan',
  REJECTED: 'Ditolak',
  RETRACTED: 'Dicabut',
} as const;

/**
 * Article type labels (Indonesian)
 */
export const ARTICLE_TYPE_LABELS: Record<ArticleType, string> = {
  STANDARD: 'Standar',
  FEATURED: 'Unggulan',
  BREAKING_NEWS: 'Berita Terkini',
  OPINION: 'Opini',
  INTERVIEW: 'Wawancara',
  TUTORIAL: 'Tutorial',
  GALLERY: 'Galeri',
  VIDEO: 'Video',
  INFOGRAPHIC: 'Infografis',
  LIVE_BLOG: 'Blog Langsung',
} as const;

// =============================================================================
// ADDITIONAL TYPES FOR API RESPONSES
// =============================================================================

/**
 * Article summary for list views
 */
export interface ArticleSummary {
  id: string;
  title: string;
  excerpt: string;
  image?: string;
  author: string;
  category: string;
  publishedAt: Date;
  readTime?: number;
  viewCount: number;
}

/**
 * Paginated response for article lists
 */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}
