/**
 * Analytics Types
 * Types untuk sistem analytics dan reporting
 */

import { BaseEntity, TimeSeriesData, ChartData } from "./common";
import { UserRole } from "./auth";

// =============================================================================
// ANALYTICS CORE TYPES
// =============================================================================

/**
 * Analytics time period
 */
export type AnalyticsPeriod =
  | "today"
  | "yesterday"
  | "last_7_days"
  | "last_30_days"
  | "last_90_days"
  | "this_month"
  | "last_month"
  | "this_quarter"
  | "last_quarter"
  | "this_year"
  | "last_year"
  | "custom";

/**
 * Analytics metric type
 */
export type AnalyticsMetric =
  | "pageviews"
  | "unique_visitors"
  | "sessions"
  | "bounce_rate"
  | "avg_session_duration"
  | "conversion_rate"
  | "user_registrations"
  | "content_views"
  | "service_requests"
  | "download_count"
  | "search_queries"
  | "event_attendance";

/**
 * Analytics dimension
 */
export type AnalyticsDimension =
  | "date"
  | "hour"
  | "day_of_week"
  | "page"
  | "source"
  | "medium"
  | "campaign"
  | "country"
  | "city"
  | "device_type"
  | "browser"
  | "os"
  | "user_type"
  | "content_type"
  | "author";

/**
 * Base analytics query
 */
export interface AnalyticsQuery {
  period: AnalyticsPeriod;
  startDate?: string;
  endDate?: string;
  metrics: AnalyticsMetric[];
  dimensions?: AnalyticsDimension[];
  filters?: AnalyticsFilter[];
  segments?: AnalyticsSegment[];
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  limit?: number;
  offset?: number;
  groupBy?: "day" | "week" | "month" | "year";
}

/**
 * Analytics filter
 */
export interface AnalyticsFilter {
  dimension: AnalyticsDimension;
  operator:
    | "equals"
    | "not_equals"
    | "contains"
    | "not_contains"
    | "starts_with"
    | "ends_with"
    | "greater_than"
    | "less_than"
    | "in"
    | "not_in";
  value: string | number | string[] | number[];
}

/**
 * Analytics segment
 */
export interface AnalyticsSegment {
  name: string;
  filters: AnalyticsFilter[];
  operator?: "AND" | "OR";
}

// =============================================================================
// WEBSITE ANALYTICS TYPES
// =============================================================================

/**
 * Website overview analytics
 */
export interface WebsiteAnalytics {
  period: AnalyticsPeriod;
  dateRange: {
    start: string;
    end: string;
  };

  // Traffic metrics
  traffic: {
    pageviews: {
      total: number;
      change: number; // percentage change from previous period
      timeline: TimeSeriesData;
    };
    uniqueVisitors: {
      total: number;
      change: number;
      timeline: TimeSeriesData;
    };
    sessions: {
      total: number;
      change: number;
      avgDuration: number; // seconds
      timeline: TimeSeriesData;
    };
    bounceRate: {
      rate: number; // percentage
      change: number;
    };
  };

  // Audience analytics
  audience: {
    newVsReturning: {
      newUsers: number;
      returningUsers: number;
      newUserPercentage: number;
    };
    demographics: {
      countries: CountryStats[];
      cities: CityStats[];
      languages: LanguageStats[];
    };
    technology: {
      devices: DeviceStats[];
      browsers: BrowserStats[];
      operatingSystems: OSStats[];
      screenResolutions: ScreenStats[];
    };
  };

  // Acquisition analytics
  acquisition: {
    channels: ChannelStats[];
    sources: SourceStats[];
    campaigns: CampaignStats[];
    socialMedia: SocialMediaStats[];
  };

  // Behavior analytics
  behavior: {
    topPages: PageStats[];
    entryPages: PageStats[];
    exitPages: PageStats[];
    siteSearch: SearchStats[];
    downloads: DownloadStats[];
  };
}

/**
 * Real-time analytics
 */
export interface RealtimeAnalytics {
  activeUsers: number;
  activePages: Array<{
    page: string;
    activeUsers: number;
    title?: string;
  }>;
  realtimeEvents: Array<{
    timestamp: string;
    event: string;
    page: string;
    user?: string;
    location?: string;
  }>;
  trafficSources: Array<{
    source: string;
    activeUsers: number;
  }>;
  conversionGoals: Array<{
    goal: string;
    conversions: number;
    conversionRate: number;
  }>;
  lastUpdated: string;
}

// =============================================================================
// CONTENT ANALYTICS TYPES
// =============================================================================

/**
 * Content performance analytics
 */
export interface ContentAnalytics {
  overview: {
    totalContent: number;
    publishedThisPeriod: number;
    totalViews: number;
    totalEngagement: number;
    avgViewsPerContent: number;
    topPerformingType: string;
  };

  contentTypes: {
    articles: ContentTypeAnalytics;
    announcements: ContentTypeAnalytics;
    events: ContentTypeAnalytics;
    services: ContentTypeAnalytics;
  };

  topContent: TopContentItem[];
  authorPerformance: AuthorPerformance[];
  engagementTrends: TimeSeriesData;
  contentCalendar: ContentCalendarItem[];
}

/**
 * Content type analytics
 */
export interface ContentTypeAnalytics {
  totalCount: number;
  publishedCount: number;
  draftCount: number;
  totalViews: number;
  totalShares: number;
  totalComments: number;
  avgEngagementRate: number;
  viewTrends: TimeSeriesData;
  topContent: Array<{
    id: string;
    title: string;
    views: number;
    engagement: number;
    publishedAt: string;
  }>;
}

/**
 * Top content item
 */
export interface TopContentItem {
  id: string;
  type: "article" | "announcement" | "event" | "service";
  title: string;
  slug: string;
  author: string;
  authorId: string;
  publishedAt: string;
  views: number;
  uniqueViews: number;
  shares: number;
  comments: number;
  downloads?: number;
  engagementRate: number;
  averageTimeOnPage: number; // seconds
  bounceRate: number; // percentage
  conversionRate?: number; // percentage
}

/**
 * Author performance
 */
export interface AuthorPerformance {
  authorId: string;
  authorName: string;
  contentCount: number;
  totalViews: number;
  totalEngagement: number;
  avgViewsPerContent: number;
  avgEngagementRate: number;
  topContent: Array<{
    id: string;
    title: string;
    views: number;
    engagement: number;
  }>;
  growthRate: number; // percentage
}

/**
 * Content calendar item
 */
export interface ContentCalendarItem {
  date: string;
  contentCount: number;
  scheduledCount: number;
  publishedCount: number;
  contentTypes: Record<string, number>;
  events: Array<{
    id: string;
    title: string;
    type: string;
    status: string;
  }>;
}

// =============================================================================
// USER ANALYTICS TYPES
// =============================================================================

/**
 * User analytics overview
 */
export interface UserAnalytics {
  overview: {
    totalUsers: number;
    activeUsers: number;
    newUsers: number;
    userGrowthRate: number; // percentage
    retentionRate: number; // percentage
    churnRate: number; // percentage
  };

  demographics: {
    byRole: Array<{
      role: UserRole;
      count: number;
      percentage: number;
      growth: number;
    }>;
    byAge: Array<{
      ageGroup: string;
      count: number;
      percentage: number;
    }>;
    byGender: Array<{
      gender: string;
      count: number;
      percentage: number;
    }>;
    byLocation: Array<{
      location: string;
      count: number;
      percentage: number;
    }>;
  };

  behavior: {
    loginFrequency: LoginFrequencyStats;
    sessionDuration: SessionDurationStats;
    featureUsage: FeatureUsageStats[];
    activityHeatmap: ActivityHeatmapData;
  };

  engagement: {
    activeUsersTrend: TimeSeriesData;
    engagementScore: EngagementScoreData;
    contentInteraction: ContentInteractionStats;
    serviceUsage: ServiceUsageStats;
  };

  retention: {
    cohortAnalysis: CohortAnalysisData;
    retentionCurve: TimeSeriesData;
    churnPrediction: ChurnPredictionData;
  };
}

/**
 * Login frequency statistics
 */
export interface LoginFrequencyStats {
  daily: number;
  weekly: number;
  monthly: number;
  inactive: number;
  distribution: Array<{
    frequency: string;
    count: number;
    percentage: number;
  }>;
}

/**
 * Session duration statistics
 */
export interface SessionDurationStats {
  average: number; // seconds
  median: number; // seconds
  distribution: Array<{
    duration: string;
    count: number;
    percentage: number;
  }>;
  trends: TimeSeriesData;
}

/**
 * Feature usage statistics
 */
export interface FeatureUsageStats {
  feature: string;
  totalUsage: number;
  uniqueUsers: number;
  usageRate: number; // percentage of active users
  trends: TimeSeriesData;
  topUsers: Array<{
    userId: string;
    userName: string;
    usageCount: number;
  }>;
}

/**
 * Activity heatmap data
 */
export interface ActivityHeatmapData {
  hourly: Array<{
    hour: number;
    activity: number;
  }>;
  daily: Array<{
    dayOfWeek: number;
    activity: number;
  }>;
  monthly: Array<{
    date: string;
    activity: number;
  }>;
}

/**
 * Engagement score data
 */
export interface EngagementScoreData {
  averageScore: number;
  distribution: Array<{
    scoreRange: string;
    count: number;
    percentage: number;
  }>;
  factors: Array<{
    factor: string;
    weight: number;
    averageValue: number;
  }>;
  trends: TimeSeriesData;
}

/**
 * Content interaction statistics
 */
export interface ContentInteractionStats {
  views: number;
  shares: number;
  comments: number;
  downloads: number;
  bookmarks: number;
  ratings: {
    average: number;
    total: number;
    distribution: Array<{
      rating: number;
      count: number;
    }>;
  };
}

/**
 * Service usage statistics
 */
export interface ServiceUsageStats {
  totalRequests: number;
  completedRequests: number;
  pendingRequests: number;
  completionRate: number; // percentage
  averageProcessingTime: number; // hours
  popularServices: Array<{
    serviceId: string;
    serviceName: string;
    requestCount: number;
    completionRate: number;
  }>;
  trends: TimeSeriesData;
}

/**
 * Cohort analysis data
 */
export interface CohortAnalysisData {
  periods: string[];
  cohorts: Array<{
    cohortMonth: string;
    cohortSize: number;
    retentionRates: number[]; // percentage for each period
  }>;
  averageRetention: number[]; // average retention for each period
}

/**
 * Churn prediction data
 */
export interface ChurnPredictionData {
  riskCategories: Array<{
    category: "low" | "medium" | "high";
    count: number;
    percentage: number;
  }>;
  churnFactors: Array<{
    factor: string;
    importance: number; // 0-1
    description: string;
  }>;
  predictions: Array<{
    userId: string;
    userName: string;
    churnProbability: number; // 0-1
    riskLevel: "low" | "medium" | "high";
    factors: string[];
  }>;
}

// =============================================================================
// SERVICE ANALYTICS TYPES
// =============================================================================

/**
 * Service performance analytics
 */
export interface ServiceAnalytics {
  overview: {
    totalRequests: number;
    completedRequests: number;
    pendingRequests: number;
    completionRate: number;
    averageProcessingTime: number; // hours
    satisfactionScore: number; // 1-5
  };

  requestTrends: TimeSeriesData;
  servicePerformance: ServicePerformanceData[];
  processingTimes: ProcessingTimeStats;
  satisfactionAnalysis: SatisfactionAnalysisData;
  staffPerformance: StaffPerformanceData[];
  geographicDistribution: GeographicDistributionData[];
}

/**
 * Service performance data
 */
export interface ServicePerformanceData {
  serviceId: string;
  serviceName: string;
  totalRequests: number;
  completedRequests: number;
  pendingRequests: number;
  completionRate: number;
  averageProcessingTime: number;
  satisfactionScore: number;
  trends: TimeSeriesData;
  staffAssigned: number;
}

/**
 * Processing time statistics
 */
export interface ProcessingTimeStats {
  overall: {
    average: number;
    median: number;
    p95: number; // 95th percentile
    fastest: number;
    slowest: number;
  };
  byService: Array<{
    serviceId: string;
    serviceName: string;
    averageTime: number;
    medianTime: number;
  }>;
  byStaff: Array<{
    staffId: string;
    staffName: string;
    averageTime: number;
    requestCount: number;
  }>;
  trends: TimeSeriesData;
}

/**
 * Satisfaction analysis data
 */
export interface SatisfactionAnalysisData {
  overall: {
    averageRating: number;
    totalRatings: number;
    distribution: Array<{
      rating: number;
      count: number;
      percentage: number;
    }>;
  };
  byService: Array<{
    serviceId: string;
    serviceName: string;
    averageRating: number;
    totalRatings: number;
  }>;
  trends: TimeSeriesData;
  feedback: Array<{
    rating: number;
    comment: string;
    serviceId: string;
    date: string;
    sentiment: "positive" | "neutral" | "negative";
  }>;
}

/**
 * Staff performance data
 */
export interface StaffPerformanceData {
  staffId: string;
  staffName: string;
  role: string;
  requestsHandled: number;
  completionRate: number;
  averageProcessingTime: number;
  satisfactionScore: number;
  workload: "low" | "medium" | "high" | "overloaded";
  efficiency: number; // 0-100
}

/**
 * Geographic distribution data
 */
export interface GeographicDistributionData {
  location: string;
  requestCount: number;
  completionRate: number;
  averageProcessingTime: number;
  popularServices: Array<{
    serviceId: string;
    serviceName: string;
    count: number;
  }>;
}

// =============================================================================
// STATISTICS HELPER TYPES
// =============================================================================

/**
 * Country statistics
 */
export interface CountryStats {
  country: string;
  countryCode: string;
  visitors: number;
  sessions: number;
  percentage: number;
  bounceRate: number;
  avgSessionDuration: number;
}

/**
 * City statistics
 */
export interface CityStats {
  city: string;
  country: string;
  visitors: number;
  percentage: number;
}

/**
 * Language statistics
 */
export interface LanguageStats {
  language: string;
  languageCode: string;
  users: number;
  percentage: number;
}

/**
 * Device statistics
 */
export interface DeviceStats {
  deviceCategory: "desktop" | "mobile" | "tablet";
  deviceType: string;
  users: number;
  sessions: number;
  percentage: number;
  bounceRate: number;
  conversionRate: number;
}

/**
 * Browser statistics
 */
export interface BrowserStats {
  browser: string;
  version?: string;
  users: number;
  percentage: number;
  bounceRate: number;
}

/**
 * Operating system statistics
 */
export interface OSStats {
  operatingSystem: string;
  version?: string;
  users: number;
  percentage: number;
}

/**
 * Screen resolution statistics
 */
export interface ScreenStats {
  screenResolution: string;
  users: number;
  percentage: number;
}

/**
 * Channel statistics
 */
export interface ChannelStats {
  channelGrouping: string;
  sessions: number;
  users: number;
  newUsers: number;
  bounceRate: number;
  avgSessionDuration: number;
  goalCompletions: number;
  goalConversionRate: number;
}

/**
 * Source statistics
 */
export interface SourceStats {
  source: string;
  medium: string;
  sessions: number;
  users: number;
  newUsers: number;
  bounceRate: number;
  avgSessionDuration: number;
}

/**
 * Campaign statistics
 */
export interface CampaignStats {
  campaign: string;
  source: string;
  medium: string;
  sessions: number;
  users: number;
  cost?: number;
  conversions: number;
  conversionValue?: number;
  roas?: number; // Return on Ad Spend
}

/**
 * Social media statistics
 */
export interface SocialMediaStats {
  socialNetwork: string;
  sessions: number;
  users: number;
  newUsers: number;
  bounceRate: number;
  avgSessionDuration: number;
  conversions: number;
}

/**
 * Page statistics
 */
export interface PageStats {
  pagePath: string;
  pageTitle: string;
  pageviews: number;
  uniquePageviews: number;
  avgTimeOnPage: number;
  bounceRate: number;
  exitRate: number;
  entrances?: number;
  goalCompletions?: number;
}

/**
 * Search statistics
 */
export interface SearchStats {
  searchTerm: string;
  searchCount: number;
  resultsPageviews: number;
  searchExits: number;
  searchRefinements: number;
  avgSearchDepth: number;
}

/**
 * Download statistics
 */
export interface DownloadStats {
  filename: string;
  downloadCount: number;
  uniqueDownloads: number;
  totalSize: number; // bytes
  avgDownloadTime: number; // seconds
  successRate: number; // percentage
}

// =============================================================================
// EXPORT TYPES
// =============================================================================

/**
 * Analytics export format
 */
export type AnalyticsExportFormat = "csv" | "excel" | "pdf" | "json";

/**
 * Analytics export configuration
 */
export interface AnalyticsExportConfig {
  title: string;
  description?: string;
  query: AnalyticsQuery;
  format: AnalyticsExportFormat;
  includeCharts: boolean;
  includeSummary: boolean;
  customFields?: string[];
  branding?: {
    logo?: string;
    colors?: string[];
    footer?: string;
  };
}

/**
 * Analytics export job
 */
export interface AnalyticsExportJob {
  id: string;
  config: AnalyticsExportConfig;
  status: "QUEUED" | "PROCESSING" | "COMPLETED" | "FAILED";
  progress: number; // percentage
  fileUrl?: string;
  fileSize?: number;
  recordCount?: number;
  createdAt: string;
  completedAt?: string;
  createdBy: string;
  error?: string;
  expiresAt?: string;
}

// =============================================================================
// CONSTANTS
// =============================================================================

/**
 * Analytics constants
 */
export const ANALYTICS_CONSTANTS = {
  DEFAULT_DATE_RANGE: 30, // days
  MAX_EXPORT_RECORDS: 100000,
  REALTIME_UPDATE_INTERVAL: 30000, // 30 seconds
  CHART_COLORS: [
    "#3B82F6",
    "#EF4444",
    "#10B981",
    "#F59E0B",
    "#8B5CF6",
    "#EC4899",
    "#6B7280",
    "#059669",
  ],
  RETENTION_PERIODS: [1, 7, 14, 30, 60, 90], // days
  ENGAGEMENT_THRESHOLDS: {
    HIGH: 80,
    MEDIUM: 50,
    LOW: 20,
  },
  CHURN_RISK_THRESHOLDS: {
    HIGH: 0.7,
    MEDIUM: 0.4,
    LOW: 0.2,
  },
} as const;
