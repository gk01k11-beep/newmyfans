import { InfluencerPost, TrendKeyword } from '../../types/marketing';

/**
 * AI要約シミュレーター
 * 実際にはOpenAIやGemini APIをコールする箇所ですが、
 * デモ用にルールベースとランダムロジックで「もっともらしい」分析結果を生成します。
 */
export async function summarizeTrends(posts: InfluencerPost[]): Promise<TrendKeyword[]> {
    // 投稿内容から単語を抽出してカウントする簡易ロジック
    const textBlob = posts.map(p => p.content).join(' ');
    const keywords = extractKeywordsMock(textBlob);

    return keywords.sort((a, b) => b.count - a.count).slice(0, 10);
}

function extractKeywordsMock(text: string): TrendKeyword[] {
    // 簡易的に特定のキーワードが含まれているかチェック
    const watchList = [
        { word: 'Myfans', cat: 'genre' as const },
        { word: 'Candfans', cat: 'genre' as const },
        { word: 'Fantube', cat: 'genre' as const },
        { word: '同人AV', cat: 'genre' as const },
        { word: '規制', cat: 'marketing' as const },
        { word: '運用', cat: 'marketing' as const },
        { word: 'トレンド', cat: 'marketing' as const },
        { word: 'ファンバサ', cat: 'tech' as const },
        { word: '機能', cat: 'tech' as const },
        { word: '売上', cat: 'marketing' as const },
        { word: '海外', cat: 'marketing' as const },
        { word: '裏垢', cat: 'genre' as const },
    ];

    const results: TrendKeyword[] = [];

    watchList.forEach(item => {
        // 簡易正規表現でカウント
        const regex = new RegExp(item.word, 'g');
        const matches = text.match(regex);
        if (matches && matches.length > 0) {
            results.push({
                keyword: item.word,
                count: matches.length * (Math.floor(Math.random() * 5) + 1), // 少しランダム性を加えて「生きている」感じを出す
                category: item.cat,
                growth: Math.floor(Math.random() * 20) - 5 // -5% to +15%
            });
        }
    });

    return results;
}

export function generateMarketingInsight(text: string): string {
    // コンテキストに応じた定型文を返す（デモ用）
    if (text.includes('規制')) return '規制強化は参入障壁となり、既存の実力派クリエイターには有利に働く可能性があります。';
    if (text.includes('機能')) return '新機能の早期導入はアルゴリズム上の優遇を受けやすく、初動の伸びに貢献します。';
    if (text.includes('海外')) return '円安トレンドの中、海外ユーザー比率を高めることは収益安定化の最重要課題です。';

    return '市場トレンドを注視し、競合との差別化を図るタイミングです。';
}
