import { fetchPlatformNews } from '@/lib/agents/platform_news';
import { fetchInfluencerPosts } from '@/lib/agents/x_monitor';
import { summarizeTrends } from '@/lib/ai/summarizer';
import { NewsTimeline } from '@/components/marketing/NewsTimeline';
import { InfluencerInsights } from '@/components/marketing/InfluencerInsights';
import { TrendWordCloud } from '@/components/marketing/TrendWordCloud';

// Force dynamic rendering to ensure fresh data on each request (or revalidate period)
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Revalidate every hour

export default async function MarketingDashboard() {
    // Parallel data fetching
    const [news, posts] = await Promise.all([
        fetchPlatformNews(),
        fetchInfluencerPosts()
    ]);

    // Generate trends from posts
    const trends = await summarizeTrends(posts);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 p-6 md:p-10 font-sans selection:bg-indigo-500/30">
            <header className="max-w-7xl mx-auto mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 tracking-tight">
                        Marketing Command Center
                    </h1>
                    <p className="text-slate-400 mt-2 text-lg">
                        Myfans / Candfans / Fantube & Industry Trends
                    </p>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-500 bg-slate-900 px-4 py-2 rounded-full border border-slate-800">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    System Operational
                    <span className="mx-2 text-slate-700">|</span>
                    Last Update: {new Date().toLocaleTimeString('ja-JP')}
                </div>
            </header>

            <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Column: Timeline (4 cols) */}
                <div className="lg:col-span-4 space-y-6">
                    <NewsTimeline news={news} />
                </div>

                {/* Center/Right Column: Insights & Trends (8 cols) */}
                <div className="lg:col-span-8 grid grid-cols-1 gap-6">
                    {/* Top Row: Trends */}
                    <div className="h-64">
                        <TrendWordCloud trends={trends} />
                    </div>

                    {/* Bottom Row: Influencer Feed */}
                    <div>
                        <InfluencerInsights posts={posts} />
                    </div>
                </div>
            </main>
        </div>
    );
}
