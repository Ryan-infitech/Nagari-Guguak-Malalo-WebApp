/**
 * React Query Keys Utility
 * Utility untuk mengatur query keys secara konsisten
 */

/**
 * Base query key structure
 */
export const queryKeys = {
  // Authentication
  auth: {
    all: ['auth'] as const,
    user: () => [...queryKeys.auth.all, 'user'] as const,
    profile: () => [...queryKeys.auth.all, 'profile'] as const,
    permissions: () => [...queryKeys.auth.all, 'permissions'] as const,
    session: () => [...queryKeys.auth.all, 'session'] as const,
  },

  // Users
  users: {
    all: ['users'] as const,
    lists: () => [...queryKeys.users.all, 'list'] as const,
    list: (filters?: any) => [...queryKeys.users.lists(), { filters }] as const,
    details: () => [...queryKeys.users.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.users.details(), id] as const,
    search: (query: string) => [...queryKeys.users.all, 'search', query] as const,
    roles: () => [...queryKeys.users.all, 'roles'] as const,
    statistics: () => [...queryKeys.users.all, 'statistics'] as const,
  },

  // Residents
  residents: {
    all: ['residents'] as const,
    lists: () => [...queryKeys.residents.all, 'list'] as const,
    list: (filters?: any) => [...queryKeys.residents.lists(), { filters }] as const,
    details: () => [...queryKeys.residents.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.residents.details(), id] as const,
    profile: (id: string) => [...queryKeys.residents.all, 'profile', id] as const,
    family: (id: string) => [...queryKeys.residents.all, 'family', id] as const,
    documents: (id: string) => [...queryKeys.residents.all, 'documents', id] as const,
    byUser: (userId: string) => [...queryKeys.residents.all, 'user', userId] as const,
    statistics: () => [...queryKeys.residents.all, 'statistics'] as const,
  },

  // Articles
  articles: {
    all: ['articles'] as const,
    lists: () => [...queryKeys.articles.all, 'list'] as const,
    list: (filters?: any) => [...queryKeys.articles.lists(), { filters }] as const,
    details: () => [...queryKeys.articles.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.articles.details(), id] as const,
    published: () => [...queryKeys.articles.all, 'published'] as const,
    featured: () => [...queryKeys.articles.all, 'featured'] as const,
    categories: () => [...queryKeys.articles.all, 'categories'] as const,
    tags: () => [...queryKeys.articles.all, 'tags'] as const,
    search: (query: string) => [...queryKeys.articles.all, 'search', query] as const,
    byCategory: (categoryId: string) =>
      [...queryKeys.articles.all, 'category', categoryId] as const,
    byAuthor: (authorId: string) => [...queryKeys.articles.all, 'author', authorId] as const,
    related: (id: string) => [...queryKeys.articles.all, 'related', id] as const,
  },

  // Announcements
  announcements: {
    all: ['announcements'] as const,
    lists: () => [...queryKeys.announcements.all, 'list'] as const,
    list: (filters?: any) => [...queryKeys.announcements.lists(), { filters }] as const,
    details: () => [...queryKeys.announcements.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.announcements.details(), id] as const,
    active: () => [...queryKeys.announcements.all, 'active'] as const,
    urgent: () => [...queryKeys.announcements.all, 'urgent'] as const,
    byType: (type: string) => [...queryKeys.announcements.all, 'type', type] as const,
  },

  // Events
  events: {
    all: ['events'] as const,
    lists: () => [...queryKeys.events.all, 'list'] as const,
    list: (filters?: any) => [...queryKeys.events.lists(), { filters }] as const,
    details: () => [...queryKeys.events.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.events.details(), id] as const,
    upcoming: () => [...queryKeys.events.all, 'upcoming'] as const,
    featured: () => [...queryKeys.events.all, 'featured'] as const,
    calendar: (month: string, year: string) =>
      [...queryKeys.events.all, 'calendar', month, year] as const,
    categories: () => [...queryKeys.events.all, 'categories'] as const,
    byCategory: (categoryId: string) => [...queryKeys.events.all, 'category', categoryId] as const,
    participants: (id: string) => [...queryKeys.events.all, 'participants', id] as const,
  },

  // Services
  services: {
    all: ['services'] as const,
    lists: () => [...queryKeys.services.all, 'list'] as const,
    list: (filters?: any) => [...queryKeys.services.lists(), { filters }] as const,
    details: () => [...queryKeys.services.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.services.details(), id] as const,
    active: () => [...queryKeys.services.all, 'active'] as const,
    categories: () => [...queryKeys.services.all, 'categories'] as const,
    byCategory: (categoryId: string) =>
      [...queryKeys.services.all, 'category', categoryId] as const,
    requirements: (id: string) => [...queryKeys.services.all, 'requirements', id] as const,
  },

  // Document Requests
  documentRequests: {
    all: ['documentRequests'] as const,
    lists: () => [...queryKeys.documentRequests.all, 'list'] as const,
    list: (filters?: any) => [...queryKeys.documentRequests.lists(), { filters }] as const,
    details: () => [...queryKeys.documentRequests.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.documentRequests.details(), id] as const,
    byUser: (userId: string) => [...queryKeys.documentRequests.all, 'user', userId] as const,
    byStatus: (status: string) => [...queryKeys.documentRequests.all, 'status', status] as const,
    byType: (type: string) => [...queryKeys.documentRequests.all, 'type', type] as const,
    statistics: () => [...queryKeys.documentRequests.all, 'statistics'] as const,
    queue: () => [...queryKeys.documentRequests.all, 'queue'] as const,
  },

  // Tourism
  tourism: {
    all: ['tourism'] as const,
    destinations: {
      all: ['tourism', 'destinations'] as const,
      lists: () => [...queryKeys.tourism.destinations.all, 'list'] as const,
      list: (filters?: any) => [...queryKeys.tourism.destinations.lists(), { filters }] as const,
      details: () => [...queryKeys.tourism.destinations.all, 'detail'] as const,
      detail: (id: string) => [...queryKeys.tourism.destinations.details(), id] as const,
      featured: () => [...queryKeys.tourism.destinations.all, 'featured'] as const,
      popular: () => [...queryKeys.tourism.destinations.all, 'popular'] as const,
      nearby: (lat: number, lng: number) =>
        [...queryKeys.tourism.destinations.all, 'nearby', lat, lng] as const,
      categories: () => [...queryKeys.tourism.destinations.all, 'categories'] as const,
      byCategory: (categoryId: string) =>
        [...queryKeys.tourism.destinations.all, 'category', categoryId] as const,
      reviews: (id: string) => [...queryKeys.tourism.destinations.all, 'reviews', id] as const,
      gallery: (id: string) => [...queryKeys.tourism.destinations.all, 'gallery', id] as const,
    },
    packages: {
      all: ['tourism', 'packages'] as const,
      lists: () => [...queryKeys.tourism.packages.all, 'list'] as const,
      list: (filters?: any) => [...queryKeys.tourism.packages.lists(), { filters }] as const,
      details: () => [...queryKeys.tourism.packages.all, 'detail'] as const,
      detail: (id: string) => [...queryKeys.tourism.packages.details(), id] as const,
      available: () => [...queryKeys.tourism.packages.all, 'available'] as const,
      popular: () => [...queryKeys.tourism.packages.all, 'popular'] as const,
      bookings: (id: string) => [...queryKeys.tourism.packages.all, 'bookings', id] as const,
    },
    bookings: {
      all: ['tourism', 'bookings'] as const,
      lists: () => [...queryKeys.tourism.bookings.all, 'list'] as const,
      list: (filters?: any) => [...queryKeys.tourism.bookings.lists(), { filters }] as const,
      details: () => [...queryKeys.tourism.bookings.all, 'detail'] as const,
      detail: (id: string) => [...queryKeys.tourism.bookings.details(), id] as const,
      byUser: (userId: string) => [...queryKeys.tourism.bookings.all, 'user', userId] as const,
      byStatus: (status: string) => [...queryKeys.tourism.bookings.all, 'status', status] as const,
    },
  },

  // UMKM
  umkm: {
    all: ['umkm'] as const,
    lists: () => [...queryKeys.umkm.all, 'list'] as const,
    list: (filters?: any) => [...queryKeys.umkm.lists(), { filters }] as const,
    details: () => [...queryKeys.umkm.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.umkm.details(), id] as const,
    verified: () => [...queryKeys.umkm.all, 'verified'] as const,
    featured: () => [...queryKeys.umkm.all, 'featured'] as const,
    categories: () => [...queryKeys.umkm.all, 'categories'] as const,
    byCategory: (categoryId: string) => [...queryKeys.umkm.all, 'category', categoryId] as const,
    byOwner: (ownerId: string) => [...queryKeys.umkm.all, 'owner', ownerId] as const,
    products: (id: string) => [...queryKeys.umkm.all, 'products', id] as const,
    reviews: (id: string) => [...queryKeys.umkm.all, 'reviews', id] as const,
    statistics: () => [...queryKeys.umkm.all, 'statistics'] as const,
    programs: () => [...queryKeys.umkm.all, 'programs'] as const,
  },

  // Community Posts
  communityPosts: {
    all: ['communityPosts'] as const,
    lists: () => [...queryKeys.communityPosts.all, 'list'] as const,
    list: (filters?: any) => [...queryKeys.communityPosts.lists(), { filters }] as const,
    details: () => [...queryKeys.communityPosts.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.communityPosts.details(), id] as const,
    feed: () => [...queryKeys.communityPosts.all, 'feed'] as const,
    trending: () => [...queryKeys.communityPosts.all, 'trending'] as const,
    byUser: (userId: string) => [...queryKeys.communityPosts.all, 'user', userId] as const,
    byTag: (tag: string) => [...queryKeys.communityPosts.all, 'tag', tag] as const,
    comments: (id: string) => [...queryKeys.communityPosts.all, 'comments', id] as const,
    likes: (id: string) => [...queryKeys.communityPosts.all, 'likes', id] as const,
  },

  // Notifications
  notifications: {
    all: ['notifications'] as const,
    lists: () => [...queryKeys.notifications.all, 'list'] as const,
    list: (filters?: any) => [...queryKeys.notifications.lists(), { filters }] as const,
    unread: () => [...queryKeys.notifications.all, 'unread'] as const,
    byUser: (userId: string) => [...queryKeys.notifications.all, 'user', userId] as const,
    byType: (type: string) => [...queryKeys.notifications.all, 'type', type] as const,
    count: () => [...queryKeys.notifications.all, 'count'] as const,
    settings: () => [...queryKeys.notifications.all, 'settings'] as const,
  },

  // Analytics
  analytics: {
    all: ['analytics'] as const,
    dashboard: () => [...queryKeys.analytics.all, 'dashboard'] as const,
    visitors: (period: string) => [...queryKeys.analytics.all, 'visitors', period] as const,
    popular: {
      content: () => [...queryKeys.analytics.all, 'popular', 'content'] as const,
      pages: () => [...queryKeys.analytics.all, 'popular', 'pages'] as const,
      services: () => [...queryKeys.analytics.all, 'popular', 'services'] as const,
    },
    reports: {
      monthly: (month: string, year: string) =>
        [...queryKeys.analytics.all, 'reports', 'monthly', month, year] as const,
      yearly: (year: string) => [...queryKeys.analytics.all, 'reports', 'yearly', year] as const,
      custom: (startDate: string, endDate: string) =>
        [...queryKeys.analytics.all, 'reports', 'custom', startDate, endDate] as const,
    },
  },

  // Files
  files: {
    all: ['files'] as const,
    lists: () => [...queryKeys.files.all, 'list'] as const,
    list: (filters?: any) => [...queryKeys.files.lists(), { filters }] as const,
    details: () => [...queryKeys.files.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.files.details(), id] as const,
    byType: (type: string) => [...queryKeys.files.all, 'type', type] as const,
    byUser: (userId: string) => [...queryKeys.files.all, 'user', userId] as const,
    recent: () => [...queryKeys.files.all, 'recent'] as const,
    storage: () => [...queryKeys.files.all, 'storage'] as const,
  },

  // System
  system: {
    all: ['system'] as const,
    config: () => [...queryKeys.system.all, 'config'] as const,
    health: () => [...queryKeys.system.all, 'health'] as const,
    logs: (filters?: any) => [...queryKeys.system.all, 'logs', { filters }] as const,
    backup: () => [...queryKeys.system.all, 'backup'] as const,
    maintenance: () => [...queryKeys.system.all, 'maintenance'] as const,
  },
} as const;

/**
 * Helper function to invalidate related queries
 */
export const getRelatedQueryKeys = (
  entityType: string,
  entityId?: string
): readonly (readonly string[])[] => {
  const related: (readonly string[])[] = [];

  switch (entityType) {
    case 'user':
      related.push(queryKeys.users.all);
      related.push(queryKeys.auth.all);
      if (entityId) {
        related.push(queryKeys.residents.byUser(entityId));
        related.push(queryKeys.documentRequests.byUser(entityId));
        related.push(queryKeys.communityPosts.byUser(entityId));
        related.push(queryKeys.notifications.byUser(entityId));
      }
      break;

    case 'article':
      related.push(queryKeys.articles.all);
      related.push(queryKeys.analytics.popular.content());
      break;

    case 'event':
      related.push(queryKeys.events.all);
      related.push(queryKeys.analytics.popular.content());
      break;

    case 'service':
      related.push(queryKeys.services.all);
      related.push(queryKeys.analytics.popular.services());
      break;

    case 'documentRequest':
      related.push(queryKeys.documentRequests.all);
      related.push(queryKeys.analytics.dashboard());
      break;

    case 'tourism':
      related.push(queryKeys.tourism.destinations.all);
      related.push(queryKeys.tourism.packages.all);
      break;

    case 'umkm':
      related.push(queryKeys.umkm.all);
      related.push(queryKeys.analytics.dashboard());
      break;

    case 'notification':
      related.push(queryKeys.notifications.all);
      break;

    default:
      break;
  }

  return related;
};

/**
 * Helper function to create infinite query key
 */
export const createInfiniteQueryKey = (
  baseKey: readonly string[],
  filters?: any
): readonly (string | object)[] => {
  return [...baseKey, 'infinite', { filters }] as const;
};

/**
 * Helper function to create search query key
 */
export const createSearchQueryKey = (
  baseKey: readonly string[],
  query: string,
  filters?: any
): readonly (string | object)[] => {
  return [...baseKey, 'search', query, { filters }] as const;
};

/**
 * Helper function to create pagination query key
 */
export const createPaginationQueryKey = (
  baseKey: readonly string[],
  page: number,
  limit: number,
  filters?: any
): readonly (string | number | object)[] => {
  return [...baseKey, 'pagination', { page, limit, filters }] as const;
};

/**
 * Query key patterns for common operations
 */
export const queryPatterns = {
  // List with filters
  list: (entity: string, filters?: any) => [entity, 'list', { filters }] as const,

  // Detail by ID
  detail: (entity: string, id: string) => [entity, 'detail', id] as const,

  // Search with query
  search: (entity: string, query: string, filters?: any) =>
    [entity, 'search', query, { filters }] as const,

  // Infinite scroll
  infinite: (entity: string, filters?: any) => [entity, 'infinite', { filters }] as const,

  // Statistics/aggregates
  stats: (entity: string, type?: string) =>
    [entity, 'statistics', ...(type ? [type] : [])] as const,

  // Related data
  related: (entity: string, id: string, relationType: string) =>
    [entity, id, relationType] as const,
} as const;

/**
 * Cache time constants (in milliseconds)
 */
export const CACHE_TIME = {
  SHORT: 5 * 60 * 1000, // 5 minutes
  MEDIUM: 30 * 60 * 1000, // 30 minutes
  LONG: 60 * 60 * 1000, // 1 hour
  VERY_LONG: 24 * 60 * 60 * 1000, // 24 hours
} as const;

/**
 * Stale time constants (in milliseconds)
 */
export const STALE_TIME = {
  SHORT: 1 * 60 * 1000, // 1 minute
  MEDIUM: 5 * 60 * 1000, // 5 minutes
  LONG: 30 * 60 * 1000, // 30 minutes
  VERY_LONG: 60 * 60 * 1000, // 1 hour
} as const;
