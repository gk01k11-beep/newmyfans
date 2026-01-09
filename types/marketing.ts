export type PlatformType = 'myfans' | 'candfans' | 'fantube' | 'fanza' | 'mgs' | 'x';

export interface NewsItem {
    id: string;
    platform: PlatformType;
    title: string;
    url: string;
    date: string;
    summary?: string;
    importance?: 'high' | 'medium' | 'low';
}

export interface InfluencerPost {
    id: string;
    accountName: string;
    accountId: string; // @username
    profileImage?: string;
    content: string;
    date: string;
    url: string;
    topics: string[];
    sentiment?: 'positive' | 'negative' | 'neutral';
    marketingInsight?: string; // AIによるマーケティング的解釈
}

export interface TrendKeyword {
    keyword: string;
    count: number;
    category: 'genre' | 'marketing' | 'tech' | 'other';
    growth?: number; // 前日比など
}

export interface DashboardData {
    news: NewsItem[];
    posts: InfluencerPost[];
    trends: TrendKeyword[];
    lastUpdated: string;
}
