import Sidebar from "../../components/layout/Sidebar.jsx"

export default function Analytics() {
  const metrics = [
    { 
      label: "Views this month", 
      value: "5,420",
      trend: "+12.5%",
      positive: true,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-coral" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )
    },
    { 
      label: "Avg. read time", 
      value: "4m 32s",
      trend: "+2.1%",
      positive: true,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-coral" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    { 
      label: "Subscriber clicks", 
      value: "182",
      trend: "-4.3%",
      positive: false,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-coral" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
        </svg>
      )
    },
  ]

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="space-y-6">
        
        {/* Header */}
        <section className="glass-panel p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="eyebrow flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Analytics
              </span>
              <h1 className="mt-4 font-display text-4xl">Track audience momentum</h1>
              <p className="mt-3 text-sm text-ink/70">Analyze how your audience interacts with your content.</p>
            </div>
            
            <div className="flex bg-ink/5 p-1 rounded-lg">
              <button className="px-4 py-1.5 text-sm font-medium bg-white text-ink rounded shadow-sm">30 days</button>
              <button className="px-4 py-1.5 text-sm font-medium text-ink/60 hover:text-ink">7 days</button>
              <button className="px-4 py-1.5 text-sm font-medium text-ink/60 hover:text-ink">24 hours</button>
            </div>
          </div>
        </section>

        {/* Metrics Overview */}
        <section className="grid gap-4 md:grid-cols-3">
          {metrics.map((metric) => (
            <div key={metric.label} className="glass-panel p-6 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-coral/10">
                    {metric.icon}
                  </div>
                  <div className="text-sm font-medium text-ink/70">{metric.label}</div>
                </div>
              </div>
              <div className="mt-4 flex items-end gap-3">
                <div className="font-display text-4xl">{metric.value}</div>
                <div className={`mb-1 text-sm font-medium ${metric.positive ? 'text-green-600' : 'text-red-500'}`}>
                  {metric.trend}
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Interactive Chart Placeholder */}
        <section className="glass-panel p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-xl">Engagement Overview</h2>
            <button className="text-sm font-medium text-coral hover:underline">Export CSV</button>
          </div>
          
          <div className="relative h-72 w-full mt-4 flex items-end gap-2 sm:gap-4 justify-between border-b border-ink/10 pb-4">
            {/* Generating mock bars using Array */}
            {[40, 70, 45, 90, 65, 80, 55, 100, 75, 85, 60, 95].map((height, i) => (
              <div key={i} className="group relative w-full h-full flex items-end justify-center">
                <div 
                  className="w-full bg-coral/20 rounded-t-sm transition-all duration-500 group-hover:bg-coral cursor-pointer"
                  style={{ height: `${height}%` }}
                ></div>
                {/* Tooltip on hover */}
                <div className="opacity-0 group-hover:opacity-100 absolute -top-10 bg-ink text-white text-xs px-2 py-1 rounded transition-opacity whitespace-nowrap z-10 pointer-events-none">
                  Day {i + 1}: {Math.floor(height * 42.4)} views
                </div>
              </div>
            ))}
            
            {/* Overlay Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none border-t border-ink/5 pt-4">
              <div className="w-full border-t border-ink/5 border-dashed"></div>
              <div className="w-full border-t border-ink/5 border-dashed"></div>
              <div className="w-full border-t border-ink/5 border-dashed"></div>
              <div className="w-full border-t border-ink/5 border-dashed"></div>
            </div>
          </div>
          
          {/* X-Axis labels */}
          <div className="flex justify-between mt-3 text-xs text-ink/50 px-2">
            <span>Apr 1</span>
            <span>Apr 15</span>
            <span>Apr 30</span>
          </div>

        </section>
      </div>
    </div>
  )
}

