export interface SiteConfig {
  siteTitle: string;
  subTitle: string;
  taglineBengali: string;
  urgencyDays: number;
  urgencyHours: number;
  urgencyMinutes: number;
  sellerWhatsApp: string;
  bkashNumber: string;
  nagadNumber: string;
  rocketNumber: string;
  noticeBanner: string;
  primaryColor: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  deviceType: 'mobile' | 'pc' | 'both' | string;
  deviceLabel: string;
  originalPrice: number;
  discountPrice: number;
  duration: string;
  headshotRate?: string;
  isPopular?: boolean;
  features: string[];
}

export interface CustomerReview {
  id: string;
  name: string;
  rating: number;
  date: string;
  device: string;
  comment: string;
  verified: boolean;
}

export interface OrderSubmission {
  id: string;
  packageName: string;
  price: number;
  deviceType: string;
  paymentMethod: 'bKash' | 'Nagad' | 'Rocket';
  senderPhone: string;
  trxId: string;
  customerName: string;
  whatsappPhone: string;
  timestamp: string;
  status: 'pending' | 'verified';
}

export interface ToastItem {
  id: string;
  title: string;
  message: string;
  orderId: string;
  amount: number;
  packageName: string;
  whatsappLink?: string;
  duration?: number;
  createdAt: number;
}
