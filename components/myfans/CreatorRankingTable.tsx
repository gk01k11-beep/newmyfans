"use client";

import { MyfansCreator } from "@/types/myfans";
import { ArrowUpRight, ExternalLink } from "lucide-react";

interface RankingTableProps {
    creators: MyfansCreator[];
}

export function CreatorRankingTable({ creators }: RankingTableProps) {
    return (
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-6">
                <h3 className="text-xl font-semibold leading-none tracking-tight">クリエイターランキング (TOP 50)</h3>
                <p className="text-sm text-muted-foreground mt-2">日次ランキングの最新データ</p>
            </div>
            <div className="p-6 pt-0">
                <div className="w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                        <thead className="[&_tr]:border-b">
                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground w-16">Rank</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Followers</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {creators.map((creator) => (
                                <tr key={creator.userId} className="border-b transition-colors hover:bg-muted/50">
                                    <td className="p-4 align-middle font-bold">{creator.rank}</td>
                                    <td className="p-4 align-middle">
                                        <div className="font-medium">{creator.name}</div>
                                        <div className="text-xs text-muted-foreground">ID: {creator.userId}</div>
                                    </td>
                                    <td className="p-4 align-middle">{creator.stats.followers}</td>
                                    <td className="p-4 align-middle text-right">
                                        <a
                                            href={creator.profileUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
                                        >
                                            <span className="mr-2">Profile</span>
                                            <ExternalLink className="h-4 w-4" />
                                        </a>
                                    </td>
                                </tr>
                            ))}
                            {creators.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="p-8 text-center text-muted-foreground">
                                        データが見つかりません
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
