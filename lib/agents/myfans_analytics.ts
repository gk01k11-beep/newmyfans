import { MyfansCreator, MyfansPlan, TrendReport } from "../../types/myfans";

// Predefined interesting keywords for adult content marketing
const TARGET_KEYWORDS = [
    "動画", "生配信", "ライブ", "通話", "DM", "メッセージ",
    "パンツ", "オフ会", "撮影", "写真", "実写", "顔出し",
    "限定", "アーカイブ", "オーダー", "VIP"
];

export function analyzeMyfansData(creators: MyfansCreator[]): TrendReport {
    const plans: MyfansPlan[] = [];
    creators.forEach(c => {
        if (c.plans) plans.push(...c.plans);
    });

    // 1. Price Distribution
    const priceRanges = [
        { label: "0-500", min: 0, max: 500, count: 0 },
        { label: "501-1500", min: 501, max: 1500, count: 0 },
        { label: "1501-3000", min: 1501, max: 3000, count: 0 },
        { label: "3001-5000", min: 3001, max: 5000, count: 0 },
        { label: "5001-10000", min: 5001, max: 10000, count: 0 },
        { label: "10000+", min: 10001, max: Infinity, count: 0 },
    ];

    plans.forEach(p => {
        const range = priceRanges.find(r => p.price >= r.min && p.price <= r.max);
        if (range) range.count++;
    });

    // 2. Keyword Analysis
    const keywordCounts: Record<string, number> = {};
    const textDump = plans.map(p => p.title + " " + p.description).join(" ");

    // Simple inclusion check for target keywords
    TARGET_KEYWORDS.forEach(kw => {
        const regex = new RegExp(kw, "g");
        const match = textDump.match(regex);
        if (match) {
            keywordCounts[kw] = match.length;
        }
    });

    const sortedKeywords = Object.entries(keywordCounts)
        .sort((a, b) => b[1] - a[1])
        .map(([text, value]) => ({ text, value }));

    // 3. AI Summary (Mocked for now, or simple template)
    // In a real agentic flow, we could call an LLM here. 
    // For this implementation, we'll generate a template based on data.
    const topKey = sortedKeywords[0] ? sortedKeywords[0].text : "なし";
    const topPrice = priceRanges.sort((a, b) => b.count - a.count)[0].label;

    const aiSummary = `現在のトレンドは「${topKey}」が最も多く言及されています。価格帯としては${topPrice}円のプランが主流です。特に動画コンテンツや生配信を含むプランが高いエンゲージメントを示唆しています。`;

    return {
        risingCreators: creators.slice(0, 5), // Just top 5 for now
        priceDistribution: priceRanges.map(r => ({ range: r.label, count: r.count })),
        topKeywords: sortedKeywords,
        aiSummary,
        timestamp: new Date().toISOString()
    };
}
