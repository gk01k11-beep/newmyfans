import { NextResponse } from 'next/server';
import { scrapeMyfansRankings } from '@/lib/agents/myfans_scraper';
import { analyzeMyfansData } from '@/lib/agents/myfans_analytics';

export const maxDuration = 300; // 5 minutes timeout for scraping
export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        console.log("Starting Myfans scraping job...");
        const creators = await scrapeMyfansRankings();

        if (!creators || creators.length === 0) {
            return NextResponse.json({
                success: false,
                message: "Failed to collect creator data or none found.",
                creators: [],
                report: null
            }, { status: 500 });
        }

        console.log(`Scraped ${creators.length} creators. Analyzing...`);
        const report = analyzeMyfansData(creators);

        return NextResponse.json({
            success: true,
            creators,
            report
        });

    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 });
    }
}
