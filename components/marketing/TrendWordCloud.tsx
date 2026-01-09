import React from 'react';
import { TrendKeyword } from '../../types/marketing';

interface TrendWordCloudProps {
    trends: TrendKeyword[];
}

export const TrendWordCloud: React.FC<TrendWordCloudProps> = ({ trends }) => {
    // Simple size calculation
    const getFontSize = (count: number) => {
        const max = Math.max(...trends.map(t => t.count));
        const min = Math.min(...trends.map(t => t.count));
        if (max === min) return '1rem';

        // Scale between 0.8rem and 2.5rem
        const scale = (count - min) / (max - min);
        const size = 0.8 + (scale * 1.7);
        return `${size}rem`;
    };

    const getColor = (category: TrendKeyword['category']) => {
        switch (category) {
            case 'genre': return 'text-pink-400';
            case 'marketing': return 'text-blue-400';
            case 'tech': return 'text-emerald-400';
            default: return 'text-slate-300';
        }
    };

    return (
        <div className="w-full bg-slate-900/50 backdrop-blur-md border border-slate-700 rounded-xl p-6 shadow-xl flex flex-col h-full">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <span className="mr-2 text-pink-500">🔥</span>
                トレンド・キーワード
            </h2>

            <div className="flex-grow flex flex-wrap content-center justify-center gap-x-6 gap-y-4 p-4 bg-slate-800/30 rounded-lg">
                {trends.map((trend, i) => (
                    <span
                        key={i}
                        className={`font-bold transition-all duration-300 hover:scale-110 cursor-pointer ${getColor(trend.category)} hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]`}
                        style={{ fontSize: getFontSize(trend.count) }}
                        title={`${trend.growth && trend.growth > 0 ? '+' : ''}${trend.growth}% growth`}
                    >
                        #{trend.keyword}
                    </span>
                ))}
            </div>

            <div className="mt-4 flex gap-4 justify-center text-xs text-slate-500">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-pink-400"></span>ジャンル</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-400"></span>マーケティング</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400"></span>機能・テック</span>
            </div>
        </div>
    );
};
