"use client";

import React, { useState } from 'react';
import { MyfansCreator, TrendReport } from "@/types/myfans";
import { CreatorRankingTable } from "./CreatorRankingTable";
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Loader2, RefreshCw } from "lucide-react";

// Register ChartJS
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface AdultDashboardProps {
    initialCreators?: MyfansCreator[];
    initialReport?: TrendReport;
}

export function AdultDashboard() {
    const [loading, setLoading] = useState(false);
    const [creators, setCreators] = useState<MyfansCreator[]>([]);
    const [report, setReport] = useState<TrendReport | null>(null);
    const [lastUpdated, setLastUpdated] = useState<string | null>(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            // Call the API route we will create
            const res = await fetch('/api/myfans/scrape');
            if (!res.ok) throw new Error('Failed to fetch');
            const data = await res.json();

            setCreators(data.creators);
            setReport(data.report);
            setLastUpdated(new Date().toLocaleString('ja-JP'));
        } catch (error) {
            console.error(error);
            alert("データの取得に失敗しました。");
        } finally {
            setLoading(false);
        }
    };

    // Chart Data Preparation
    const priceChartData = report ? {
        labels: report.priceDistribution.map(d => d.range),
        datasets: [
            {
                label: 'プラン分布数',
                data: report.priceDistribution.map(d => d.count),
                backgroundColor: 'rgba(236, 72, 153, 0.6)', // Pink
            },
        ],
    } : null;

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'top' as const, labels: { color: 'white' } },
            title: { display: true, text: '価格帯分布 (円)', color: 'white' },
        },
        scales: {
            x: { ticks: { color: 'gray' }, grid: { color: '#333' } },
            y: { ticks: { color: 'gray' }, grid: { color: '#333' } }
        }
    };

    return (
        <div className="space-y-8 text-white min-h-screen bg-[#0a0a0a] p-6 rounded-xl border border-gray-800">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-800 pb-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
                        Myfans マーケティング解析 (アダルト特化)
                    </h1>
                    <p className="text-gray-400 mt-1">一般アダルトカテゴリのトレンドと競合分析</p>
                </div>
                <div className="flex items-center gap-4">
                    {lastUpdated && <span className="text-sm text-gray-500">最終更新: {lastUpdated}</span>}
                    <button
                        onClick={fetchData}
                        disabled={loading}
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus:ring-2 focus:ring-pink-500 disabled:opacity-50 disabled:pointer-events-none bg-pink-600 text-white hover:bg-pink-700 h-10 px-4 py-2"
                    >
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
                        データ更新
                    </button>
                </div>
            </div>

            {/* AI Summary Panel */}
            {report && (
                <div className="rounded-lg border border-pink-900/50 bg-gray-900/50 text-card-foreground shadow-sm">
                    <div className="flex flex-col space-y-1.5 p-6">
                        <h3 className="text-2xl font-semibold leading-none tracking-tight text-pink-400 flex items-center gap-2">
                            ✨ AI トレンド分析レポート
                        </h3>
                    </div>
                    <div className="p-6 pt-0">
                        <p className="text-lg leading-relaxed text-gray-200">
                            {report.aiSummary}
                        </p>
                    </div>
                </div>
            )}

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Visualizations */}
                <div className="space-y-6">
                    {/* Price Chart */}
                    <div className="rounded-lg border border-gray-800 bg-gray-900/50 text-card-foreground shadow-sm">
                        <div className="flex flex-col space-y-1.5 p-6">
                            <h3 className="text-xl font-semibold leading-none tracking-tight text-white">プラン価格分布</h3>
                        </div>
                        <div className="p-6 pt-0 h-64">
                            {priceChartData ? (
                                <Bar options={chartOptions} data={priceChartData} />
                            ) : (
                                <div className="h-full flex items-center justify-center text-gray-500">
                                    データ未取得
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Keywords */}
                    <div className="rounded-lg border border-gray-800 bg-gray-900/50 text-card-foreground shadow-sm">
                        <div className="flex flex-col space-y-1.5 p-6">
                            <h3 className="text-xl font-semibold leading-none tracking-tight text-white">特典トレンドワード</h3>
                        </div>
                        <div className="p-6 pt-0">
                            <div className="flex flex-wrap gap-2">
                                {report ? report.topKeywords.map((kw, i) => (
                                    <span
                                        key={kw.text}
                                        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${i < 3 ? 'border-pink-500/50 bg-pink-500/10 text-pink-300' : 'border-gray-700 bg-gray-800 text-gray-400'}`}
                                    >
                                        {kw.text} <span className="ml-1 text-xs opacity-70">({kw.value})</span>
                                    </span>
                                )) : (
                                    <span className="text-gray-500">データ未取得</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Ranking Table */}
                <div className="space-y-6 h-full">
                    <div className="rounded-lg border border-gray-800 bg-gray-900/50 text-card-foreground shadow-sm h-full">
                        <div className="p-6">
                            <h3 className="text-xl font-semibold leading-none tracking-tight text-white">クリエイターランキング (Top 50)</h3>
                            <p className="text-sm text-gray-400 mt-1">直近のフォロワー獲得数とプラン傾向</p>
                        </div>
                        <div className="p-0">
                            <CreatorRankingTable creators={creators} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
