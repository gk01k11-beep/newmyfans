"use client";

import { useEffect, useState } from "react";
import { CreatorRankingTable } from "@/components/myfans/CreatorRankingTable";
import { MyfansCreator } from "@/types/myfans";
import { TrendingUp, Users, Activity, ExternalLink, Loader2 } from "lucide-react";

export default function MyfansDashboard() {
    const [loading, setLoading] = useState(true);
    const [creators, setCreators] = useState<MyfansCreator[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Fetch data from our API
        async function fetchData() {
            try {
                const res = await fetch('/api/myfans/ranking');
                const json = await res.json();
                if (json.success) {
                    setCreators(json.data);
                } else {
                    setError(json.error || 'Failed to fetch');
                }
            } catch (e) {
                setError('Connection failed');
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-gray-950 text-gray-100 p-8">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Myfans Market Analysis</h1>
                        <p className="text-gray-400">リアルタイム市場分析ダッシュボード</p>
                    </div>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors flex items-center gap-2"
                    >
                        <Activity className="h-4 w-4" />
                        <span>最新データを取得</span>
                    </button>
                </div>

                {/* Quick Stats Cards (Mock for V1) */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6 shadow-sm">
                        <div className="flex flex-row items-center justify-between pb-2">
                            <h3 className="text-sm font-medium text-gray-400">アクティブクリエイター</h3>
                            <Users className="h-4 w-4 text-blue-500" />
                        </div>
                        <div className="text-2xl font-bold">--</div>
                        <p className="text-xs text-gray-500 mt-1">+12% from last month</p>
                    </div>
                    <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6 shadow-sm">
                        <div className="flex flex-row items-center justify-between pb-2">
                            <h3 className="text-sm font-medium text-gray-400">平均プラン価格</h3>
                            <Activity className="h-4 w-4 text-green-500" />
                        </div>
                        <div className="text-2xl font-bold">¥--</div>
                        <p className="text-xs text-gray-500 mt-1">Video plans are trending up</p>
                    </div>
                </div>

                {/* Main Content Area */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-gray-900/30 rounded-lg border border-gray-800">
                        <Loader2 className="h-8 w-8 animate-spin text-blue-500 mb-4" />
                        <p className="text-gray-400">Myfansから最新データを取得しています...</p>
                        <p className="text-xs text-gray-600 mt-2">これには数秒かかる場合があります</p>
                    </div>
                ) : error ? (
                    <div className="p-8 text-center text-red-400 bg-red-900/10 border border-red-900 rounded-lg">
                        <p>エラーが発生しました: {error}</p>
                    </div>
                ) : (
                    <div className="grid gap-8 md:grid-cols-3">
                        {/* Ranking Table (Span 2) */}
                        <div className="md:col-span-2">
                            <CreatorRankingTable creators={creators} />
                        </div>

                        {/* Sidebar / Trends (Span 1) */}
                        <div className="space-y-8">
                            {/* Rapid Rising Section */}
                            <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <TrendingUp className="h-5 w-5 text-orange-500" />
                                    <h3 className="font-semibold">🔥 急上昇中の注目株</h3>
                                </div>
                                <div className="space-y-4">
                                    {/* Mock Trend Data derived from list (e.g. random for demo or top new entry) */}
                                    {creators.slice(0, 3).map(c => (
                                        <div key={c.userId} className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors">
                                            <div className="bg-orange-500/10 text-orange-500 font-bold w-6 h-6 flex items-center justify-center rounded text-xs">UP</div>
                                            <div className="overflow-hidden">
                                                <div className="font-medium truncate">{c.name}</div>
                                                <div className="text-xs text-gray-500">Rank #{c.rank}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Official News Section (Mock) */}
                            <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <ExternalLink className="h-5 w-5 text-blue-500" />
                                    <h3 className="font-semibold">運営の最新動向</h3>
                                </div>
                                <ul className="space-y-3 text-sm text-gray-400">
                                    <li className="p-2 hover:bg-gray-800 rounded cursor-pointer transition-colors">
                                        <span className="block text-gray-300 mb-1">システムメンテナンス</span>
                                        <span className="text-xs opacity-60">2024/03/20</span>
                                    </li>
                                    <li className="p-2 hover:bg-gray-800 rounded cursor-pointer transition-colors">
                                        <span className="block text-gray-300 mb-1">新機能リリース: AIチャット...</span>
                                        <span className="text-xs opacity-60">2024/03/15</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
