export interface StatCardItem {
  id: string;
  title: string;
  value: string | number;
  change: string;
  trend: "up" | "down";
  iconType: "qr" | "chat-green" | "chat-yellow" | "trend";
}

export interface TrafficDataPoint {
  day: string;
  visits: number;
}

export interface QrScanDataPoint {
  day: string;
  scans: number;
}

export interface QrCampaignItem {
  id: string;
  supportName: string;
  shortCode: string;
  scans: number;
  createdAt: string;
}

export interface DashboardData {
  stats: StatCardItem[];
  traffic7Days: TrafficDataPoint[];
  traffic30Days: TrafficDataPoint[];
  qrScansWeekly: QrScanDataPoint[];
  campaigns: QrCampaignItem[];
}
