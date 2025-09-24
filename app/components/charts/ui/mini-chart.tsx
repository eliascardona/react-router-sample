interface MiniChartProps {
    type: string
    color: string
}

export function MiniChart({ type, color }: MiniChartProps) {
    const baseClasses = `stroke-${color} fill-${color}/20`

    if (type === "radar") {
        return (
            <svg width="80" height="60" viewBox="0 0 80 60" className="opacity-60">
                <polygon points="40,10 60,25 55,45 25,45 20,25" className={`${baseClasses} stroke-2 fill-opacity-20`} />
                <polygon points="40,15 55,27 50,40 30,40 25,27" className={`stroke-${color}/60 fill-${color}/10 stroke-1`} />
            </svg>
        )
    }

    if (type === "line") {
        return (
            <svg width="80" height="60" viewBox="0 0 80 60" className="opacity-60">
                <polyline points="10,45 25,35 40,25 55,30 70,20" className={`stroke-${color} stroke-2 fill-none`} />
                <circle cx="25" cy="35" r="2" className={`fill-${color}`} />
                <circle cx="55" cy="30" r="2" className={`fill-${color}`} />
            </svg>
        )
    }

    if (type === "bar") {
        return (
            <svg width="80" height="60" viewBox="0 0 80 60" className="opacity-60">
                <rect x="10" y="35" width="8" height="15" className={`fill-${color}`} />
                <rect x="25" y="25" width="8" height="25" className={`fill-${color}`} />
                <rect x="40" y="30" width="8" height="20" className={`fill-${color}`} />
                <rect x="55" y="20" width="8" height="30" className={`fill-${color}`} />
            </svg>
        )
    }

    return (
        <svg width="80" height="60" viewBox="0 0 80 60" className="opacity-60">
            <path d="M10,45 Q25,25 40,35 T70,25" className={`stroke-${color} stroke-2 fill-none`} />
        </svg>
    )
}
