# 🏛️ Nagari Guguak Malalo - Backend API

[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3+-blue)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-4.18+-lightgrey)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.8+-purple)](https://www.prisma.io/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Portal Digital Nagari Guguak Malalo** - Sistem Informasi Pelayanan Publik Digital yang modern dan komprehensif untuk melayani kebutuhan warga Nagari Guguak Malalo, Kecamatan Lima Kaum, Kabupaten Tanah Datar, Sumatera Barat.

## 📋 Daftar Isi

- [✨ Fitur Utama](#-fitur-utama)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Struktur Proyek](#-struktur-proyek)
- [🔒 Keamanan](#-keamanan)
- [📊 Monitoring & Analytics](#-monitoring--analytics)


## ✨ Fitur Utama

### 🔐 **Autentikasi & Otorisasi**
- JWT-based authentication dengan refresh token
- Role-based access control (RBAC)
- Multi-level permission system
- Session management
- Password reset & email verification

### 🏛️ **Layanan Pemerintahan Digital**
- **Administrasi Kependudukan**: Pengelolaan data penduduk
- **Pelayanan Dokumen**: Surat Keterangan, Surat Domisili, SKTM, dll
- **Service Request Management**: Tracking permintaan layanan
- **Document Generation**: Auto-generate dokumen dengan template

### 📰 **Manajemen Konten**
- **Article Management**: Sistem artikel dengan kategori dan tag
- **Announcement System**: Pengumuman resmi dengan scheduling
- **Event Management**: Manajemen acara dan registrasi
- **Content Moderation**: Review dan approval system

### 🏪 **UMKM & Ekonomi**
- **UMKM Directory**: Database usaha mikro kecil menengah
- **Program UMKM**: Manajemen program pemberdayaan
- **Product Showcase**: Katalog produk UMKM
- **Analytics & Statistics**: Laporan perkembangan UMKM

### 🌴 **Wisata & Pariwisata**
- **Tourism Destinations**: Database destinasi wisata
- **Tourism Packages**: Paket wisata dan booking
- **Photo Gallery**: Galeri foto destinasi
- **Review & Rating System**: Review destinasi wisata

### 📧 **Sistem Notifikasi**
- **Real-time Notifications**: WebSocket untuk notifikasi real-time
- **Email Templates**: Template email yang customizable
- **Multi-channel Notifications**: Email, SMS, Push notifications
- **Notification Preferences**: Pengaturan preferensi notifikasi

### 📊 **Analytics & Reporting**
- **Dashboard Analytics**: Statistik komprehensif
- **User Behavior Tracking**: Analisis perilaku pengguna
- **Performance Metrics**: Monitoring performa sistem
- **Export Capabilities**: Export data dalam berbagai format

### 🛡️ **Keamanan & Compliance**
- **Security Headers**: Helmet.js untuk security headers
- **CORS Protection**: Konfigurasi CORS yang aman
- **Rate Limiting**: Pembatasan request untuk mencegah abuse
- **Input Validation**: Validasi input dengan Zod schema
- **Audit Trail**: Log aktivitas sistem

### 📁 **File Management**
- **Supabase Storage Integration**: Cloud storage terintegrasi
- **Image Processing**: Resize, compress, dan optimize gambar
- **File Type Validation**: Validasi tipe file
- **Upload Progress Tracking**: Tracking progress upload

## 🛠️ Tech Stack

### **Backend Core**
- **Runtime**: Node.js 18+
- **Framework**: Express.js 4.18+
- **Language**: TypeScript 5.3+
- **Package Manager**: npm 9+

### **Database & ORM**
- **Database**: PostgreSQL (via Supabase)
- **ORM**: Prisma 5.8+
- **Connection Pool**: Built-in Prisma connection pooling
- **Migrations**: Prisma Migrate

### **Authentication & Security**
- **JWT**: jsonwebtoken
- **Password Hashing**: bcryptjs
- **Security**: Helmet.js
- **CORS**: cors middleware
- **Rate Limiting**: express-rate-limit

### **File Storage & Processing**
- **Storage**: Supabase Storage
- **Image Processing**: Sharp
- **File Upload**: Multer
- **MIME Type Detection**: mime-types

### **Email & Communication**
- **Email Service**: Nodemailer
- **Email Templates**: Handlebars
- **Real-time Communication**: Socket.IO

### **Validation & Utilities**
- **Schema Validation**: Zod
- **Date Handling**: Native Date API
- **String Utilities**: Custom utilities
- **PDF Generation**: Puppeteer (for documents)

### **Background Jobs & Scheduling**
- **Job Queue**: Bull (Redis-based)
- **Cron Jobs**: node-cron
- **Background Processing**: Custom job system

### **Logging & Monitoring**
- **Logger**: Winston
- **Log Rotation**: winston-daily-rotate-file
- **Error Tracking**: Custom error handling
- **Performance Monitoring**: Built-in metrics

### **Development & Testing**
- **Build Tool**: TypeScript Compiler
- **Linting**: ESLint with TypeScript
- **Code Formatting**: Prettier
- **Testing**: Jest (planned)
- **API Documentation**: Swagger/OpenAPI

### **Deployment & DevOps**
- **Container**: Docker (via Nixpacks)
- **Platform**: Railway
- **Process Manager**: PM2 compatible
- **Environment**: Multi-environment support

## 📁 Struktur Proyek

```
📦 Backend-Nagari-Guguak-Malalo
├── 📁 src/                          # Source code utama
│   ├── 📁 config/                   # Konfigurasi aplikasi
│   │   ├── app.config.ts           # Konfigurasi aplikasi
│   │   ├── auth.config.ts          # Konfigurasi autentikasi
│   │   ├── database.config.ts      # Konfigurasi database
│   │   ├── email.config.ts         # Konfigurasi email
│   │   ├── logger.config.ts        # Konfigurasi logging
│   │   ├── security.config.ts      # Konfigurasi keamanan
│   │   ├── socket.config.ts        # Konfigurasi WebSocket
│   │   ├── storage.config.ts       # Konfigurasi storage
│   │   └── supabase.config.ts      # Konfigurasi Supabase
│   │
│   ├── 📁 controllers/              # Request handlers
│   │   ├── admin.controller.ts     # Admin operations
│   │   ├── analytics.controller.ts # Analytics & reporting
│   │   ├── announcement.controller.ts # Pengumuman
│   │   ├── article.controller.ts   # Artikel & berita
│   │   ├── auth.controller.ts      # Autentikasi
│   │   ├── document.controller.ts  # Dokumen & surat
│   │   ├── event.controller.ts     # Event & acara
│   │   ├── feedback.controller.ts  # Feedback & review
│   │   ├── notification.controller.ts # Notifikasi
│   │   ├── resident.controller.ts  # Data penduduk
│   │   ├── tourism.controller.ts   # Pariwisata
│   │   ├── umkm.controller.ts      # UMKM
│   │   └── user.controller.ts      # User management
│   │
│   ├── 📁 middleware/               # Express middleware
│   │   ├── auth.middleware.ts      # Autentikasi
│   │   ├── cors.middleware.ts      # CORS handling
│   │   ├── error.middleware.ts     # Error handling
│   │   ├── logger.middleware.ts    # Request logging
│   │   ├── rateLimit.middleware.ts # Rate limiting
│   │   ├── rbac.middleware.ts      # Role-based access
│   │   ├── security.middleware.ts  # Security headers
│   │   ├── upload.middleware.ts    # File upload
│   │   └── validate.middleware.ts  # Input validation
│   │
│   ├── 📁 routes/                   # API route definitions
│   │   ├── admin.routes.ts         # Admin endpoints
│   │   ├── analytics.routes.ts     # Analytics endpoints
│   │   ├── announcements.routes.ts # Pengumuman endpoints
│   │   ├── articles.routes.ts      # Artikel endpoints
│   │   ├── auth.routes.ts          # Auth endpoints
│   │   ├── documents.routes.ts     # Dokumen endpoints
│   │   ├── events.routes.ts        # Event endpoints
│   │   ├── notifications.routes.ts # Notifikasi endpoints
│   │   ├── services.routes.ts      # Service endpoints
│   │   ├── tourism.routes.ts       # Tourism endpoints
│   │   ├── umkm.routes.ts          # UMKM endpoints
│   │   └── user.routes.ts          # User endpoints
│   │
│   ├── 📁 services/                 # Business logic layer
│   │   ├── admin.service.ts        # Admin business logic
│   │   ├── analytics.service.ts    # Analytics logic
│   │   ├── auth.service.ts         # Authentication logic
│   │   ├── document.service.ts     # Document processing
│   │   ├── email.service.ts        # Email operations
│   │   ├── notification.service.ts # Notification system
│   │   ├── file.service.ts         # File management
│   │   └── ... (other services)
│   │
│   ├── 📁 validations/              # Zod validation schemas
│   │   ├── auth.validation.ts      # Auth validation
│   │   ├── user.validation.ts      # User validation
│   │   ├── document.validation.ts  # Document validation
│   │   └── ... (other validations)
│   │
│   ├── 📁 types/                    # TypeScript type definitions
│   │   ├── 📁 dto/                 # Data Transfer Objects
│   │   ├── api.types.ts            # API response types
│   │   ├── auth.types.ts           # Authentication types
│   │   ├── business.types.ts       # Business logic types
│   │   └── ... (other types)
│   │
│   ├── 📁 utils/                    # Utility functions
│   │   ├── crypto.util.ts          # Cryptography utilities
│   │   ├── date.util.ts            # Date utilities
│   │   ├── email.util.ts           # Email utilities
│   │   ├── error.util.ts           # Error handling
│   │   ├── file.util.ts            # File utilities
│   │   ├── jwt.util.ts             # JWT utilities
│   │   ├── pdf.util.ts             # PDF generation
│   │   └── response.util.ts        # Response formatting
│   │
│   ├── 📁 templates/                # Email & document templates
│   │   ├── 📁 emails/              # Email templates
│   │   │   ├── welcome.hbs         # Welcome email
│   │   │   ├── verification.hbs    # Email verification
│   │   │   ├── password-reset.hbs  # Password reset
│   │   │   └── notification.hbs    # General notifications
│   │   └── 📁 documents/           # Document templates
│   │       ├── surat-domisili.hbs  # Surat domisili
│   │       ├── sktm.hbs            # SKTM template
│   │       └── certificate.hbs     # Certificate template
│   │
│   ├── 📁 jobs/                     # Background jobs
│   │   ├── analytics.job.ts        # Analytics processing
│   │   ├── cleanup.job.ts          # File cleanup
│   │   ├── email.job.ts            # Email sending
│   │   ├── notification.job.ts     # Notification processing
│   │   └── cron-manager.ts         # Job scheduler
│   │
│   ├── 📁 events/                   # Event system
│   │   ├── 📁 emitters/            # Event emitters
│   │   ├── 📁 handlers/            # Event handlers
│   │   └── 📁 types/               # Event types
│   │
│   ├── 📁 database/                 # Database configuration
│   │   └── client.ts               # Prisma client
│   │
│   ├── app.ts                      # Express app configuration
│   ├── server.ts                   # Server entry point
│   └── paths.ts                    # Path utilities
│
├── 📁 prisma/                       # Database schema & migrations
│   ├── schema.prisma               # Database schema
│   ├── seed.js                     # Database seeding
│   └── 📁 migrations/              # Database migrations
│
├── 📁 scripts/                      # Utility scripts
│   ├── deployment-patch.cjs        # Deployment fixes
│   ├── setup-supabase-storage.sql  # Storage setup
│   └── ... (other scripts)
│
├── 📁 public/                       # Static files
│   └── 📁 images/                  # Public images
│
├── package.json                    # Dependencies & scripts
├── tsconfig.json                   # TypeScript configuration
├── .env.example                    # Environment template
├── nixpacks.toml                   # Deployment configuration
└── README.md                       # Dokumentasi ini
```



## 🔒 Keamanan

### 🛡️ **Security Features Implemented**

#### **Authentication Security**
- **JWT Token**: Secure token-based authentication
- **Refresh Tokens**: Automatic token refresh mechanism
- **Password Hashing**: BCrypt with configurable salt rounds
- **Session Management**: Secure session handling
- **Account Lockout**: Protection against brute force attacks

#### **Input Validation & Sanitization**
- **Zod Schema Validation**: Comprehensive input validation
- **XSS Protection**: Cross-site scripting prevention
- **SQL Injection Prevention**: Prisma ORM with parameterized queries
- **File Upload Security**: MIME type validation and file scanning
- **CSRF Protection**: Cross-site request forgery protection

#### **Network Security**
- **CORS Configuration**: Proper cross-origin resource sharing
- **Security Headers**: Helmet.js for security headers
- **Rate Limiting**: Request throttling and abuse prevention
- **HTTPS Enforcement**: Force HTTPS in production
- **Content Security Policy**: CSP headers implementation

#### **Data Protection**
- **Data Encryption**: Sensitive data encryption at rest
- **Environment Variables**: Secure configuration management
- **Database Security**: Connection encryption and access control
- **File Storage Security**: Secure cloud storage with access policies
- **Audit Logging**: Comprehensive activity logging


### 🚨 **Security Monitoring**

- **Error Tracking**: Comprehensive error logging and alerting
- **Access Logging**: All API access logged with user tracking
- **Failed Login Monitoring**: Suspicious activity detection
- **File Upload Monitoring**: Malicious file detection
- **Rate Limit Monitoring**: Abuse pattern detection

## 📊 Monitoring & Analytics

### 📈 **Performance Monitoring**

#### **Application Metrics**
- **Response Time**: API endpoint response times
- **Throughput**: Requests per second
- **Error Rate**: HTTP error percentage
- **Uptime**: Application availability
- **Memory Usage**: RAM consumption monitoring
- **CPU Usage**: Processor utilization

#### **Database Monitoring**
- **Connection Pool**: Active/idle connections
- **Query Performance**: Slow query detection
- **Database Size**: Storage usage tracking
- **Lock Monitoring**: Database lock detection
- **Backup Status**: Automated backup verification

#### **Storage Monitoring**
- **File Storage Usage**: Disk space utilization
- **Upload Success Rate**: File upload reliability
- **CDN Performance**: Content delivery metrics
- **Storage Costs**: Cloud storage expense tracking

### 📊 **Business Analytics**

#### **User Analytics**
- **User Registration**: New user signups
- **User Activity**: Daily/monthly active users
- **User Retention**: User return rates
- **Geographic Distribution**: User location data

#### **Service Usage Analytics**
- **Document Requests**: Most requested documents
- **Service Popularity**: Popular government services
- **Processing Times**: Average service completion times
- **User Satisfaction**: Service rating analytics

#### **Content Analytics**
- **Article Views**: Most read articles
- **Engagement Metrics**: Likes, comments, shares
- **Content Performance**: Popular content types
- **Search Analytics**: Most searched terms

#### **UMKM Analytics**
- **Business Registration**: New UMKM registrations
- **Product Categories**: Popular product types
- **Location Distribution**: UMKM geographical spread
- **Program Participation**: UMKM program engagement

### 🔍 **Log Management**

#### **Structured Logging**
```javascript
// Example log structure
{
  "timestamp": "2024-01-15T10:30:00Z",
  "level": "info",
  "service": "nagari-api",
  "userId": "user_123",
  "action": "document_request",
  "resource": "surat_domisili",
  "ip": "192.168.1.1",
  "userAgent": "Mozilla/5.0...",
  "responseTime": 150,
  "statusCode": 201
}
```

#### **Log Categories**
- **Access Logs**: HTTP request/response logging
- **Error Logs**: Application error tracking
- **Audit Logs**: User action tracking
- **Performance Logs**: Performance metric logging
- **Security Logs**: Security event logging

#### **Log Retention**
- **Development**: 7 days
- **Staging**: 30 days
- **Production**: 90 days
- **Audit Logs**: 1 year
- **Security Logs**: 2 years

### 📱 **Health Checks**

#### **Application Health**
```http
GET /health
```
Response:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00Z",
  "version": "1.0.0",
  "environment": "production",
  "uptime": "5d 12h 30m",
  "checks": {
    "database": "healthy",
    "storage": "healthy",
    "redis": "healthy",
    "email": "healthy"
  }
}
```

#### **Monitoring Endpoints**
- `GET /health` - Basic health check
- `GET /health/detailed` - Detailed system status
- `GET /metrics` - Prometheus metrics
- `GET /info` - Application information
