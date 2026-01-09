import { MarketingSummary } from "@/components/dashboard/MarketingSummary";
import { PowerWordGenerator } from "@/components/dashboard/PowerWordGenerator";
import { RankingMatrix } from "@/components/dashboard/RankingMatrix";
import { TrendFeed } from "@/components/dashboard/TrendFeed";

export default function Home() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
            {/* Top Left: Trend Feed */}
            <div className="lg:col-span-5">
                <TrendFeed />
            </div>

            {/* Top Right: Marketing Summary */}
            <div className="lg:col-span-7">
                <MarketingSummary />
            </div>

            {/* Bottom: Ranking Matrix */}
            <div className="lg:col-span-8">
                <RankingMatrix />
            </div>

            {/* Floating/Bottom Right: Power Word Generator */}
            <div className="lg:col-span-4">
                <PowerWordGenerator />
            </div>
        </div>
    );
}
