import Link from "next/link";
import { Activity, BarChart2, Settings, Trophy, User } from "lucide-react";
import { cn } from "@/lib/utils";

const SidebarItem = ({ icon: Icon, label, active = false }: { icon: any, label: string, active?: boolean }) => (
    <div className={cn(
        "flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer transition-colors group",
        active ? "bg-primary/20 text-primary border-r-2 border-primary" : "text-gray-400 hover:bg-white/5 hover:text-white"
    )}>
        <Icon className={cn("w-5 h-5", active ? "text-primary" : "text-gray-400 group-hover:text-white")} />
        <span className="font-medium text-sm">{label}</span>
    </div>
);

export function Sidebar() {
    return (
        <aside className="w-64 h-screen bg-[#1E1E1E] border-r border-white/10 flex flex-col fixed left-0 top-0 overflow-y-auto z-50">
            <div className="p-6">
                <div className="flex items-center space-x-2 mb-8">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                        <Activity className="w-5 h-5 text-white" />
                    </div>
                    <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                        AMI Dashboard
                    </h1>
                </div>

                <nav className="space-y-1">
                    <SidebarItem icon={Activity} label="Trend Feed" active />
                    <SidebarItem icon={Trophy} label="Rankings" />
                    <SidebarItem icon={BarChart2} label="Analysis" />
                    <SidebarItem icon={Settings} label="Settings" />
                </nav>
            </div>

            <div className="mt-auto p-6 border-t border-white/10">
                <div className="flex items-center space-x-3 text-gray-400 hover:text-white cursor-pointer transition-colors">
                    <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                        <User className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-medium">Support</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
