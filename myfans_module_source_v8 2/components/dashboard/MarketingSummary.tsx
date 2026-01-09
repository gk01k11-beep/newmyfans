import { Sparkles } from "lucide-react";

export function MarketingSummary() {
    return (
        <div className="bg-[#1E1E1E] rounded-xl border border-white/10 p-6 flex flex-col h-[400px] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -z-10 group-hover:bg-primary/30 transition-all" />

            <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                <h2 className="font-semibold text-white">AI Marketing Summary</h2>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                <p className="text-sm text-gray-300 leading-relaxed">
                    <strong className="text-primary">Market Insight:</strong> Significant shift towards immersive experiences (VR/AR). Key performance indicators suggest a 15% increase in subscriptions for interactive content platforms.
                </p>

                <ul className="space-y-3">
                    <li className="flex items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 mr-3 flex-shrink-0" />
                        <span className="text-sm text-gray-400">VR/AR adoption is accelerating among premium users.</span>
                    </li>
                    <li className="flex items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 mr-3 flex-shrink-0" />
                        <span className="text-sm text-gray-400">Subscription models are outperforming PPV in the amateur sector.</span>
                    </li>
                    <li className="flex items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 mr-3 flex-shrink-0" />
                        <span className="text-sm text-gray-400">Niche content (e.g., ASMR) is showing highest engagement growth.</span>
                    </li>
                    <li className="flex items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 mr-3 flex-shrink-0" />
                        <span className="text-sm text-gray-400"><strong className="text-white">Action:</strong> Prioritize community-building features for retention.</span>
                    </li>
                </ul>
            </div>

            <div className="mt-4 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Updated: 5 mins ago</span>
                    <span className="px-2 py-1 bg-white/5 rounded text-gray-300">Confidence: 92%</span>
                </div>
            </div>
        </div>
    );
}
