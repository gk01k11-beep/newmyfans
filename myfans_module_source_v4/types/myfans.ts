export interface CreatorStats {
    hearts: string;
    followers: string;
}

export interface MyfansCreator {
    rank: number;
    name: string;
    userId: string;
    profileUrl: string;
    categoryTags: string[];
    stats: CreatorStats;
    previousRank?: number; // Optional, for calculating detecting rapid risers
}

export interface PlanAnalysis {
    price: number;
    title: string;
    description: string;
    keywords: string[];
}

export interface CreatorProfileDetail {
    userId: string;
    plans: PlanAnalysis[];
}

export interface TrendReport {
    risingCreators: MyfansCreator[];
    priceDistribution: { range: string; count: number }[];
    topKeywords: { text: string; value: number }[];
    aiSummary: string;
    timestamp: string;
}
