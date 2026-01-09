import { ArrowDown, ArrowRight, ArrowUp } from "lucide-react";

export function RankingMatrix() {
    return (
        <div className="bg-[#1E1E1E] rounded-xl border border-white/10 overflow-hidden flex flex-col h-full min-h-[300px]">
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <h2 className="font-semibold text-white">Ranking Matrix</h2>
                <div className="flex items-center space-x-2 text-xs text-gray-400">
                    <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-green-500 mr-1" /> Rising</span>
                    <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-red-500 mr-1" /> Falling</span>
                </div>
            </div>

            <div className="flex-1 overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-white/5 text-gray-400 font-medium">
                        <tr>
                            <th className="px-4 py-3">Platform</th>
                            <th className="px-4 py-3">Daily Rank</th>
                            <th className="px-4 py-3">Weekly Change</th>
                            <th className="px-4 py-3">Top Category</th>
                            <th className="px-4 py-3">Note</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        <tr className="hover:bg-white/5 transition-colors">
                            <td className="px-4 py-3 font-medium text-white">FANZA</td>
                            <td className="px-4 py-3">1</td>
                            <td className="px-4 py-3 text-green-400 flex items-center">
                                <ArrowUp className="w-3 h-3 mr-1" /> +2
                            </td>
                            <td className="px-4 py-3">VR/AV</td>
                            <td className="px-4 py-3 text-gray-500">Strong VR sales</td>
                        </tr>
                        <tr className="hover:bg-white/5 transition-colors">
                            <td className="px-4 py-3 font-medium text-white">MGS</td>
                            <td className="px-4 py-3">2</td>
                            <td className="px-4 py-3 text-red-400 flex items-center">
                                <ArrowDown className="w-3 h-3 mr-1" /> -1
                            </td>
                            <td className="px-4 py-3">Amateur</td>
                            <td className="px-4 py-3 text-gray-500">Dip in new releases</td>
                        </tr>
                        <tr className="hover:bg-white/5 transition-colors">
                            <td className="px-4 py-3 font-medium text-white">FanClubs</td>
                            <td className="px-4 py-3">3</td>
                            <td className="px-4 py-3 text-yellow-400 flex items-center">
                                <ArrowRight className="w-3 h-3 mr-1" /> 0
                            </td>
                            <td className="px-4 py-3">Creator Specific</td>
                            <td className="px-4 py-3 text-gray-500">Stable</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
