export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  nik?: string;
  phone?: string;
  address?: string;
  profileImage?: string;
  isVerified?: boolean;
  joinedAt?: string;
}
