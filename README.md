# 🏛️ Portal Nagari Guguak Malalo - Frontend

Portal Resmi Nagari Guguak Malalo yang menyediakan layanan publik digital untuk masyarakat Kabupaten Tanah Datar, Sumatera Barat.

[![Next.js](https://img.shields.io/badge/Next.js-15.3.5-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.2-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

## 🎯 Overview

Portal ini menyediakan layanan digital untuk:
- **Layanan Publik**: Surat keterangan, perizinan, dan dokumentasi
- **Informasi Nagari**: Berita, pengumuman, dan profil daerah
- **Pariwisata**: Destinasi wisata dan promosi potensi daerah
- **UMKM**: Pendaftaran dan promosi usaha mikro kecil menengah
- **Portal Warga**: Dashboard pribadi untuk layanan resident

## ✨ Key Features

### 🔐 Authentication & Authorization
- JWT-based authentication dengan refresh token
- Role-based access control (RBAC)
- Route protection dengan middleware
- Session management yang aman

### 🎨 Modern UI/UX
- Responsive design untuk semua device
- Dark/Light theme dengan system preference
- Component library dengan Radix UI & shadcn/ui
- Smooth animations dengan Tailwind CSS

### ⚡ Performance & Optimization
- Next.js 15 dengan App Router
- Server-side rendering (SSR) dan Static Site Generation (SSG)
- Image optimization dengan Next.js Image
- Bundle optimization dan code splitting

### 🔄 State Management
- React Query untuk server state
- Zustand untuk client state
- Form handling dengan React Hook Form
- Real-time updates dengan WebSocket support

### 🛡️ Security & Best Practices
- TypeScript untuk type safety
- Input validation dengan Zod
- Security headers dan CSP
- Rate limiting dan CORS protection

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18.0.0
- npm >= 8.0.0
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/nagari-guguak-malalo.git
   cd nagari-guguak-malalo/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev                    # Start development server
npm run build                  # Build for production
npm run start                  # Start production server

# Code Quality
npm run lint                   # Run ESLint
npm run lint:fix              # Fix ESLint issues
npm run type-check             # TypeScript type checking
npm run format                 # Format with Prettier
npm run format:check           # Check formatting

# Testing
npm run test                   # Run tests
npm run test:watch             # Run tests in watch mode
npm run test:coverage          # Run tests with coverage

# Analysis
npm run analyze                # Bundle analyzer
```

### Project Structure

```
frontend/
├── src/
│   ├── app/                   # Next.js App Router pages
│   ├── api/                   # API client & services
│   ├── components/            # React components
│   │   ├── ui/               # Base UI components
│   │   ├── admin/            # Admin dashboard components
│   │   ├── portal-warga/     # Citizen portal components
│   │   ├── common/           # Shared components
│   │   └── forms/            # Form components
│   ├── hooks/                # Custom React hooks
│   │   ├── api/              # API hooks
│   │   └── ui/               # UI hooks
│   ├── store/                # Global state (Zustand)
│   ├── utils/                # Utility functions
│   ├── providers/            # React providers
│   ├── types/                # TypeScript type definitions
│   └── lib/                  # Shared libraries
├── public/                   # Static assets
└── ...config files
```

## 🔧 Configuration

### Environment Variables

Key environment variables in `.env.local`:

```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Application
NEXT_PUBLIC_APP_NAME="Portal Nagari Guguak Malalo"
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Authentication
JWT_SECRET=your-jwt-secret
NEXTAUTH_SECRET=your-nextauth-secret

# Features
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_NOTIFICATIONS=true
NEXT_PUBLIC_DEBUG_MODE=true
```

See `.env.example` for complete configuration options.

### API Integration

The frontend integrates with the backend API:

```typescript
// API Client Example
import { apiClient } from '@/api/client';

const response = await apiClient.get('/articles');
```

## 🎨 UI Components

Built with modern component libraries:

- **Radix UI**: Headless UI primitives
- **shadcn/ui**: Beautiful component collection
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful icons

### Example Usage

```tsx
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <h2>Portal Warga</h2>
      </CardHeader>
      <CardContent>
        <Button>Ajukan Surat</Button>
      </CardContent>
    </Card>
  );
}
```

## 📱 Features Overview

### Public Features
- **Homepage**: Hero section, news, quick services
- **Informasi**: News, announcements, village profile
- **Layanan**: Public services catalog
- **Pariwisata**: Tourism destinations and packages
- **UMKM**: Business directory and registration
- **Kontak**: Contact information and feedback

### Authenticated Features
- **Portal Warga**: Personal dashboard for residents
- **Document Services**: Request certificates and permits
- **Notifications**: Real-time updates and alerts
- **Profile Management**: Update personal information

### Admin Features
- **Dashboard**: Analytics and overview
- **Content Management**: Articles, announcements, events
- **User Management**: Resident data and permissions
- **Tourism Management**: Destinations and packages
- **UMKM Management**: Business registration and data
- **System Settings**: Configuration and maintenance

## 🔐 Authentication Flow

1. **Login**: Email/password authentication
2. **JWT Tokens**: Access token + refresh token
3. **Role-based Access**: Different permissions per role
4. **Session Management**: Automatic token refresh
5. **Logout**: Token invalidation and cleanup

### User Roles

- **SUPER_ADMIN**: Full system access
- **ADMIN**: Administrative privileges
- **MODERATOR**: Content moderation
- **STAFF**: Limited admin access
- **RESIDENT**: Citizen portal access
- **BUSINESS_OWNER**: UMKM features
- **VISITOR**: Public access only

## 📊 Performance

### Optimization Strategies

- **Code Splitting**: Automatic with Next.js
- **Image Optimization**: Next.js Image component
- **Caching**: React Query for server state
- **Bundle Size**: Tree shaking and dead code elimination
- **SEO**: Server-side rendering and meta tags

### Monitoring

- **Bundle Analyzer**: `npm run analyze`
- **Lighthouse**: Performance auditing
- **React Query Devtools**: State inspection
- **TypeScript**: Compile-time error detection

## 🔄 State Management

### Client State (Zustand)
```typescript
import { useAuthStore } from '@/store/authStore';

function MyComponent() {
  const { user, login, logout } = useAuthStore();
  // Component logic
}
```

### Server State (React Query)
```typescript
import { useArticles } from '@/hooks/api/useArticles';

function ArticlesList() {
  const { data: articles, isLoading } = useArticles();
  // Component logic
}
```

## 📋 API Integration

### Service Layer Architecture

```typescript
// Service example
export class ArticleService {
  async getArticles(params?: GetArticlesParams): Promise<Article[]> {
    const response = await apiClient.get('/articles', { params });
    return response.data;
  }
  
  async createArticle(data: CreateArticleData): Promise<Article> {
    const response = await apiClient.post('/articles', data);
    return response.data;
  }
}
```

### Custom Hooks Pattern

```typescript
// Hook example
export function useArticles(params?: GetArticlesParams) {
  return useQuery({
    queryKey: ['articles', params],
    queryFn: () => articleService.getArticles(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
```

## 🧪 Testing

### Testing Strategy

- **Unit Tests**: Component and utility testing
- **Integration Tests**: API and workflow testing
- **E2E Tests**: Full user journey testing
- **Visual Tests**: UI consistency checking

### Example Test

```typescript
import { render, screen } from '@testing-library/react';
import { Button } from '@/components/ui/button';

test('renders button with text', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});
```

## 🚀 Deployment

### Production Build

```bash
npm run build
npm run start
```

### Environment Setup

1. Set production environment variables
2. Configure API endpoints
3. Set up CDN for static assets
4. Configure monitoring and analytics

### Docker Deployment

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contributing

### Development Workflow

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### Code Standards

- **TypeScript**: Strict mode enabled
- **ESLint**: Extended rules for React and Next.js
- **Prettier**: Code formatting with Tailwind plugin
- **Conventional Commits**: Standardized commit messages

## 📚 Documentation

- **API Documentation**: Available in `/api` endpoints
- **Component Storybook**: Visual component documentation
- **Type Definitions**: Comprehensive TypeScript interfaces
- **HOW-TO Guides**: Common development scenarios

## 🛡️ Security

### Security Measures

- **Authentication**: JWT with refresh tokens
- **Authorization**: Role-based access control
- **Input Validation**: Zod schema validation
- **Security Headers**: CSP, HSTS, XSS protection
- **Rate Limiting**: API request limiting
- **HTTPS**: SSL/TLS encryption in production

## 📞 Support

### Getting Help

- **Documentation**: Check this README and code comments
- **Issues**: GitHub Issues for bug reports
- **Discussions**: GitHub Discussions for questions
- **Email**: tech@guguakmalalo.id

### Project Maintainers

- **Lead Developer**: [Your Name]
- **UI/UX Designer**: [Designer Name]
- **Backend Developer**: [Backend Dev Name]

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team**: Amazing React framework
- **Vercel**: Hosting and deployment platform
- **Radix UI**: Accessible UI primitives
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Beautiful component library

---

**Portal Nagari Guguak Malalo** - Membangun desa digital yang maju dan berkeadilan 🏛️✨
