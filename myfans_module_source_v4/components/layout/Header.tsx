import { Bell, Search, UserCircle } from "lucide-react";

export function Header() {
    return (
        <header className="h-16 border-b border-white/10 bg-[#121212]/50 backdrop-blur-md sticky top-0 z-40 px-6 flex items-center justify-between ml-64">
            <div className="flex items-center">
                <div className="flex items-center px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse mr-2" />
                    <span className="text-xs font-bold text-red-400 tracking-wider">LIVE MODE</span>
                </div>
                <span className="ml-4 text-sm font-mono text-gray-500">14:32:05 UTC</span>
            </div>

            <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/5 transition-colors relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-secondary rounded-full border border-[#121212]" />
                </button>

                <div className="flex items-center space-x-3 pl-4 border-l border-white/10">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-medium text-white">NeoMarketer</p>
                        <p className="text-xs text-gray-400">Pro Plan</p>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-secondary p-[2px]">
                        <div className="w-full h-full rounded-full bg-[#121212] flex items-center justify-center">
                            <UserCircle className="w-full h-full text-gray-300" />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
