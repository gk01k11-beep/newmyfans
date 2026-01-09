import { Copy, RefreshCw, Wand2 } from "lucide-react";

export function PowerWordGenerator() {
    const words = [
        { text: "IMMERSE", type: "primary" },
        { text: "EXCLUSIVE", type: "secondary" },
        { text: "UNCENSORED", type: "accent" },
        { text: "INTERACTIVE", type: "primary" },
        { text: "COMMUNITY", type: "accent" },
        { text: "PREMIUM", type: "secondary" },
        { text: "PRIVATE", type: "primary" },
        { text: "LIVE", type: "secondary" },
    ];

    const getColor = (type: string) => {
        switch (type) {
            case 'primary': return 'border-primary text-primary hover:bg-primary/10';
            case 'secondary': return 'border-secondary text-secondary hover:bg-secondary/10';
            case 'accent': return 'border-accent text-accent hover:bg-accent/10';
            default: return 'border-gray-500 text-gray-500';
        }
    }

    return (
        <div className="bg-[#1E1E1E] rounded-xl border border-white/10 p-4 shadow-lg shadow-primary/5">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                    <Wand2 className="w-4 h-4 text-purple-400" />
                    <h3 className="font-semibold text-white text-sm">Power Word Generator</h3>
                </div>
                <button className="text-gray-400 hover:text-white transition-colors">
                    <RefreshCw className="w-3 h-3" />
                </button>
            </div>

            <div className="flex flex-wrap gap-2">
                {words.map((word, i) => (
                    <button
                        key={i}
                        className={`px-3 py-1 rounded-full text-xs font-bold border transition-all ${getColor(word.type)}`}
                    >
                        {word.text}
                    </button>
                ))}
            </div>

            <div className="mt-4 pt-3 border-t border-white/5 flex justify-center">
                <button className="text-xs text-gray-400 hover:text-white flex items-center">
                    <Copy className="w-3 h-3 mr-1" /> Copy All
                </button>
            </div>
        </div>
    );
}
