import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';
import { MyfansCreator } from '../../types/myfans';

const MYFANS_BASE_URL = 'https://myfans.jp';
const RANKING_URL = 'https://myfans.jp/ranking/creators?term=daily';

// Helper to determine if running locally
const isLocal = process.env.NODE_ENV === 'development' || !process.env.AWS_REGION;

export async function scrapeMyfansRankings(): Promise<MyfansCreator[]> {
    let browser;
    try {
        // Configure browser launch based on environment
        if (isLocal) {
            // Local development: expects a local Chrome installation
            // You might need to adjust the executablePath for your specific local machine if not auto-detected
            // or install 'puppeteer' as a dev dependency and use it just for executable path.
            // For simplicity in this specialized agent, we try to point to standard locations or assume user handles it.
            // However, robust local dev usually implies installing full 'puppeteer' as devDependency to get the binary.

            // Since we removed 'puppeteer' from prod deps, we need a way to run locally.
            // Strategy: Try to find common paths or rely on user having Chrome.

            browser = await puppeteer.launch({
                args: chromium.args,
                defaultViewport: chromium.defaultViewport,
                executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', // Mac default
                headless: true, // "new" is deprecated in newer puppeteer-core versions, true is safe
                ignoreHTTPSErrors: true,
            });
        } else {
            // Vercel / Production
            browser = await puppeteer.launch({
                args: chromium.args,
                defaultViewport: chromium.defaultViewport,
                executablePath: await chromium.executablePath(),
                headless: chromium.headless,
                ignoreHTTPSErrors: true,
            });
        }

        const page = await browser.newPage();

        // 1. Visit Homepage to handle Age Verification
        console.log("Navigating to homepage for age check...");
        await page.goto(MYFANS_BASE_URL, { waitUntil: 'networkidle2' });

        // Try to click the 18+ toggle if it exists
        try {
            // Selector: header button.MuiButton-root.bg-transparent (The gender/age toggle)
            const toggleSelector = 'header button.MuiButton-root.bg-transparent';
            const toggleBtn = await page.$(toggleSelector);

            if (toggleBtn) {
                await toggleBtn.click();

                // Wait for modal and click "Apply" (Confirmed as "General Adult")
                // Selector: div.MuiDialog-root button.MuiButton-containedPrimary
                const confirmSelector = 'div.MuiDialog-root button.MuiButton-containedPrimary';
                await page.waitForSelector(confirmSelector, { timeout: 3000 });
                await page.click(confirmSelector);
                console.log("Age verification passed via UI interaction.");

                // Wait for navigation or reload
                await page.waitForNavigation({ waitUntil: 'networkidle2' }).catch(() => { });
            }
        } catch (e) {
            console.log("Age verification step skipped or failed:", e);
        }

        // 2. Go to Ranking Page directly
        console.log("Navigating to ranking page...");
        await page.goto(RANKING_URL, { waitUntil: 'networkidle2' });

        const listSelector = 'main div.flex.flex-col.gap-4';
        await page.waitForSelector(listSelector, { timeout: 10000 }).catch(() => console.log('Ranking list not found'));

        // 3. Extract Data
        const creators = await page.evaluate(() => {
            // Selector for individual ranking items: a.flex.flex-1.items-center...
            const rows = document.querySelectorAll('a.flex.flex-1.items-center.justify-between');
            const results: any[] = [];

            rows.forEach((row) => {
                const nameEl = row.querySelector('div.flex.flex-col > div:first-child');
                const rankEl = row.querySelector('div:first-child > div');
                const followerEl = row.querySelector('div.flex.items-center.gap-1.text-xs');

                // Extract URL from the row itself (it is an anchor)
                const href = row.getAttribute('href');

                if (nameEl && href) {
                    const rankText = rankEl ? rankEl.textContent?.trim() : '0';
                    const rank = parseInt(rankText || '0', 10);

                    // Parse Stats (Hearts/Followers)
                    const followers = followerEl ? followerEl.textContent?.trim() || '0' : '0';

                    results.push({
                        rank,
                        name: nameEl.textContent?.trim() || 'Unknown',
                        userId: href.split('/').pop() || '',
                        profileUrl: `https://myfans.jp${href}`,
                        categoryTags: [],
                        stats: {
                            hearts: '0',
                            followers: followers
                        }
                    });
                }
            });
            return results;
        });

        return creators;
    } catch (error) {
        console.error("Scraping failed:", error);
        return [];
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}
