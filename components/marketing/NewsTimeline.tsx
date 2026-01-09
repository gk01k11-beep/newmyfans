import React from 'react';
import { NewsItem, PlatformType } from '../../types/marketing';
import { ExternalLink } from 'lucide-react';

interface NewsTimelineProps {
    news: NewsItem[];
}

const platformColors: Record<PlatformType, string> = {
    myfans: 'bg-pink-500',
    candfans: 'bg-green-500',
    fantube: 'bg-yellow-500',
    fanza: 'bg-red-600',
    mgs: 'bg-purple-600',
    x: 'bg-black',
};

const platformLabels: Record<PlatformType, string> = {
    myfans: 'Myfans',
    candfans: 'Candfans',
    fantube: 'Fantube',
    fanza: 'FANZA',
    mgs: 'MGS',
    x: 'X',
};

export const NewsTimeline: React.FC<NewsTimelineProps> = ({ news }) => {
    return (
        <div className="w-full bg-slate-900/50 backdrop-blur-md border border-slate-700 rounded-xl p-6 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <span className="mr-2 text-indigo-400">⚡</span>
                プラットフォーム・アップデート
            </h2>

            <div className="relative border-l-2 border-slate-700 ml-3 space-y-8">
                {news.length === 0 ? (
                    <div className="ml-6 text-slate-400">最新のニュースはありません。</div>
                ) : (
                    news.map((item) => (
                        <div key={item.id} className="relative ml-6 group">
                            {/* Dot */}
                            <span className={`absolute -left-[31px] top-1 h-4 w-4 rounded-full border-2 border-slate-900 ${platformColors[item.platform]} group-hover:scale-125 transition-transform duration-300 shadow-lg shadow-${item.platform}-500/50`}></span>

                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                                <div className="flex items-center gap-2">
                                    <span className={`px-2 py-0.5 rounded textxs font-bold text-white text-[10px] uppercase tracking-wider ${platformColors[item.platform]}`}>
                                        {platformLabels[item.platform]}
                                    </span>
                                    <span className="text-slate-400 text-xs font-mono">{item.date}</span>
                                </div>
                            </div>

                            <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block mt-1 group-hover:translate-x-1 transition-transform duration-200"
                            >
                                <h3 className="text-white font-medium hover:text-indigo-300 transition-colors flex items-center gap-2">
                                    {item.title}
                                    <ExternalLink size={14} className="opacity-50 group-hover:opacity-100" />
                                </h3>
                                {item.summary && (
                                    <p className="text-slate-400 text-sm mt-1 line-clamp-2">
                                        {item.summary}
                                    </p>
                                )}
                            </a>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
