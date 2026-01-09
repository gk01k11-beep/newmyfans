export interface CreatorStats {
    hearts: string;
    followers: string;
}

export interface MyfansPlan {
    title: string;
    price: number;
    description: string;
}

export interface MyfansCreator {
    rank: number;
    name: string;
    userId: string;
    profileUrl: string;
    categoryTags: string[];
    stats: CreatorStats;
    previousRank?: number;
    plans?: MyfansPlan[];
    benefits_summary?: string;
}

export interface TrendReport {
    risingCreators: MyfansCreator[];
    priceDistribution: { range: string; count: number }[];
    topKeywords: { text: string; value: number }[];
    aiSummary: string;
    timestamp: string;
}
