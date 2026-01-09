import Link from 'next/link';

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-slate-950 text-white">
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-pink-500">
                    AntiGravity Project Hub
                </h1>
            </div>

            <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-2 lg:text-left mt-20 gap-8">

                <Link
                    href="/marketing"
                    className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-slate-700 hover:bg-slate-800/50"
                >
                    <h2 className={`mb-3 text-2xl font-semibold flex items-center gap-2`}>
                        Marketing Dashboard <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">-&gt;</span>
                        <span className="text-xs bg-pink-600 px-2 py-1 rounded-full text-white">NEW</span>
                    </h2>
                    <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                        Myfans/Candfans/Fantube trends & X Influencer insights.
                    </p>
                </Link>

                <div className="group rounded-lg border border-slate-800 px-5 py-4 opacity-50 cursor-not-allowed">
                    <h2 className={`mb-3 text-2xl font-semibold`}>
                        Legacy Modules
                    </h2>
                    <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
                        Previous tools and analytics.
                    </p>
                </div>

            </div>
        </main>
    );
}
