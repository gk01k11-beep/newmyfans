import React from 'react';
import { InfluencerPost } from '../../types/marketing';
import { Twitter, ArrowUpRight, BrainCircuit } from 'lucide-react';

interface InfluencerInsightsProps {
    posts: InfluencerPost[];
}

export const InfluencerInsights: React.FC<InfluencerInsightsProps> = ({ posts }) => {
    return (
        <div className="w-full bg-slate-900/50 backdrop-blur-md border border-slate-700 rounded-xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center">
                    <span className="mr-2 text-blue-400">💎</span>
                    インフルエンサー・インサイト
                </h2>
                <span className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded border border-slate-600">
                    AI要約中
                </span>
            </div>

            <div className="grid grid-cols-1 gap-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                {posts.map((post) => (
                    <div key={post.id} className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50 hover:border-slate-500 transition-colors">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-inner">
                                    {post.accountName[0]}
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-sm leading-tight">{post.accountName}</h4>
                                    <span className="text-slate-500 text-xs">{post.accountId}</span>
                                </div>
                            </div>
                            <a
                                href={post.url}
                                target="_blank"
                                rel="noreferrer"
                                className="text-slate-500 hover:text-blue-400 transition-colors"
                            >
                                <Twitter size={16} />
                            </a>
                        </div>

                        {/* Content */}
                        <p className="text-slate-300 text-sm mb-3 whitespace-pre-wrap leading-relaxed">
                            {post.content}
                        </p>

                        {/* AI Insight */}
                        {post.marketingInsight && (
                            <div className="bg-indigo-900/30 border border-indigo-500/30 rounded p-3 mt-3 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-1 opacity-10">
                                    <BrainCircuit size={40} className="text-indigo-400" />
                                </div>
                                <div className="flex items-start gap-2 relative z-10">
                                    <BrainCircuit size={16} className="text-indigo-400 mt-0.5 shrink-0" />
                                    <div>
                                        <span className="text-xs font-bold text-indigo-300 block mb-0.5">Marketing AI Insight</span>
                                        <p className="text-indigo-100 text-xs">
                                            {post.marketingInsight}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Footer / Topics */}
                        <div className="mt-3 flex flex-wrap gap-2">
                            {post.topics.map((topic, i) => (
                                <span key={i} className="text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded-full border border-slate-700">
                                    #{topic}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
