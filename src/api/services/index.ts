/**
 * API Services Export
 * Central export untuk semua API services
 */

// =============================================================================
// SERVICE IMPORTS
// =============================================================================

import authService from './auth.service';
import userService from './user.service';
import articleService from './article.service';
import announcementService from './announcement.service';
import regulationService from './regulation.service';
import reportService from './report.service';
import notificationService from './notification.service';
import adminService from './admin.service';
import analyticsService from './analytics.service';
import documentService from './document.service';
import emailService from './email.service';
import feedbackService from './feedback.service';
import fileService from './file.service';
import umkmService from './umkm.service';
import umkmProgramService from './umkmProgram.service';
import serviceRequestService from './serviceRequest.service';
import tourismService from './tourism.service';
import eventService from './event.service';

// Import types
export type { UMKM, UMKMCategory, UMKMProduct } from './umkm.service';
export type {
  UMKMProgram,
  UMKMProgramScheduleItem as ScheduleItem,
  CreateUMKMProgramData,
  UpdateUMKMProgramData,
  UMKMProgramFilters,
} from '../types/umkm';
export type { UMKMProgramStats } from './umkmProgram.service';
export type { ServiceRequest, ServiceCategory } from './serviceRequest.service';
export type { FileRecord, FileUploadOptions } from './file.service';
export type { Feedback } from './feedback.service';
export type {
  Report,
  ReportSummary,
  CreateReportRequest,
  UpdateReportRequest,
  ReportQuery,
  ReportStatistics,
} from './report.service';

// =============================================================================
// SERVICE EXPORTS
// =============================================================================

export {
  authService,
  userService,
  articleService,
  announcementService,
  regulationService,
  reportService,
  notificationService,
  adminService,
  analyticsService,
  documentService,
  emailService,
  feedbackService,
  fileService,
  umkmService,
  umkmProgramService,
  serviceRequestService,
  tourismService,
  eventService,
};

// =============================================================================
// SERVICE CLASSES (for extending or testing)
// =============================================================================

export { AuthService } from './auth.service';
export { UserService } from './user.service';
export { ArticleService } from './article.service';
export { AnnouncementService } from './announcement.service';
export { RegulationService } from './regulation.service';
export { ReportService } from './report.service';
export { NotificationService } from './notification.service';
export { AdminService } from './admin.service';
export { AnalyticsService } from './analytics.service';
export { DocumentService } from './document.service';
export { EmailService } from './email.service';
export { FeedbackService } from './feedback.service';
export { FileService } from './file.service';
export { UMKMService } from './umkm.service';
export { UMKMProgramService } from './umkmProgram.service';
export { ServiceRequestService } from './serviceRequest.service';
export { TourismService } from './tourism.service';
export { EventService } from './event.service';

// =============================================================================
// CONVENIENCE EXPORTS
// =============================================================================

/**
 * All services in one object
 */
export const services = {
  auth: authService,
  user: userService,
  article: articleService,
  announcement: announcementService,
  regulation: regulationService,
  report: reportService,
  notification: notificationService,
  admin: adminService,
  analytics: analyticsService,
  document: documentService,
  email: emailService,
  feedback: feedbackService,
  file: fileService,
  umkm: umkmService,
  umkmProgram: umkmProgramService,
  serviceRequest: serviceRequestService,
  tourism: tourismService,
  event: eventService,
} as const;

/**
 * Service initialization
 */
export const initializeServices = (): void => {
  // Initialize services that need setup
  // authService.init() is already called in the service

  // Add any global service configuration here
  console.log('Services initialized');
};

/**
 * Service cleanup (for testing or app shutdown)
 */
export const cleanupServices = (): void => {
  // Clear any service caches or cleanup
  if (typeof window !== 'undefined') {
    // Clear any intervals, event listeners, etc.
  }
};

// =============================================================================
// DEFAULT EXPORT
// =============================================================================

export default services;
