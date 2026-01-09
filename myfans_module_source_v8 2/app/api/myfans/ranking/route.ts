import { NextResponse } from 'next/server';
import { scrapeMyfansRankings } from '@/lib/agents/myfans_scraper';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 60; // Set timeout to 60s for scraping

export async function GET() {
    try {
        const creators = await scrapeMyfansRankings();

        // In a real app, we would cache this result in a DB or Redis.
        // For now, we return the live scraped data.

        return NextResponse.json({
            success: true,
            data: creators,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ success: false, error: 'Failed to fetch rankings' }, { status: 500 });
    }
}
