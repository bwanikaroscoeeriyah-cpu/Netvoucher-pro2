
export enum UserRole {
  MASTER_ADMIN = 'MASTER_ADMIN',
  AGENT = 'AGENT',
  CUSTOMER = 'CUSTOMER'
}

export interface User {
  id: string;
  email: string;
  phone: string;
  role: UserRole;
  walletBalance: number;
}

export interface RouterConfig {
  id: string;
  name: string;
  ip: string;
  port: number;
  username: string;
  status: 'online' | 'offline';
  activeUsers: number;
  uptime: string;
}

export interface VoucherPlan {
  id: string;
  name: string;
  price: number;
  duration: string;
  limitBytes?: number;
}

export interface Transaction {
  id: string;
  amount: number;
  type: 'sale' | 'withdrawal' | 'commission';
  method: 'mobile_money' | 'cash';
  timestamp: Date;
  status: 'completed' | 'pending' | 'failed';
  description: string;
}

export interface MikroTikStats {
  activeUsers: number;
  rxRate: string;
  txRate: string;
  uptime: string;
  signalStrength: string;
}
