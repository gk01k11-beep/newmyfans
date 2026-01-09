import { Heart, MessageCircle, RefreshCw, Twitter } from "lucide-react";

const trends = [
    { id: 1, type: "news", source: "IndustryNews", text: "AdultCon 2024 sees 30% rise in VR interest.", sentiment: "positive", time: "14:31" },
    { id: 2, type: "tweet", source: "@satoshi19890101", text: "New regulation proposal for online platforms sparks debate.", sentiment: "mixed", time: "14:29" },
    { id: 3, type: "tweet", source: "@fukumenkantoku", text: "Platform X faces backlash over payment issues.", sentiment: "negative", time: "14:25" },
    { id: 4, type: "news", source: "FANZA", text: "Amateur rankings dominated by 'First Person' view this week.", sentiment: "positive", time: "14:20" },
    { id: 5, type: "tweet", source: "@chinkai69", text: "Just dropped a new guide on increasing click-through rates!", sentiment: "positive", time: "14:15" },
];

export function TrendFeed() {
    return (
        <div className="bg-[#1E1E1E] rounded-xl border border-white/10 overflow-hidden flex flex-col h-[400px]">
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <h2 className="font-semibold text-white">Real-time Trend Feed</h2>
                <button className="text-gray-400 hover:text-white transition-colors">
                    <RefreshCw className="w-4 h-4" />
                </button>
            </div>

            <div className="overflow-y-auto flex-1 p-2 space-y-2">
                {trends.map((trend) => (
                    <div key={trend.id} className="bg-[#2A2A2A]/50 p-3 rounded-lg border border-white/5 hover:border-primary/30 transition-all group">
                        <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-2 mb-1">
                                {trend.type === 'tweet' ? <Twitter className="w-3 h-3 text-blue-400" /> : <MessageCircle className="w-3 h-3 text-emerald-400" />}
                                <span className="text-xs font-mono text-gray-400">{trend.time}</span>
                            </div>
                            {trend.sentiment === 'positive' && <Heart className="w-3 h-3 text-green-500 fill-green-500" />}
                            {trend.sentiment === 'negative' && <Heart className="w-3 h-3 text-red-500 fill-red-500" />}
                            {trend.sentiment === 'mixed' && <RefreshCw className="w-3 h-3 text-yellow-500" />}
                        </div>
                        <p className="text-sm text-gray-200 line-clamp-2 mb-1">
                            {trend.text}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-primary/80">[{trend.source}]</span>
                            <span className={
                                `text-[10px] px-1.5 py-0.5 rounded uppercase font-bold tracking-wider
                 ${trend.sentiment === 'positive' ? 'bg-green-500/10 text-green-400' :
                                    trend.sentiment === 'negative' ? 'bg-red-500/10 text-red-400' : 'bg-yellow-500/10 text-yellow-400'}`
                            }>
                                {trend.sentiment}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
