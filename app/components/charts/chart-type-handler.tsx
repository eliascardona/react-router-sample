import type { Chart, ChartContent } from "~/lib/charts/types"
import { ProfileRadarChart } from "./profile-radar-chart"

export const ChartTypeHandler = ({
    chart
}: {
    chart: Chart | undefined
}) => {
    if (!chart) {
        return (
            <div className='p-4 text-lg'>
                no pudimos encontrar el chart solicitado, el Id es inválido
            </div>
        )
    }
    return <>{renderChart(chart.content)}</>
}

const renderChart = (chartContent: ChartContent) => {
    switch (chartContent.type) {
        case 'RADAR': {
            const radarDimensions = chartContent.baseData
            return (
                <ProfileRadarChart radarDimensions={radarDimensions} />
            )
        }
        default:
            return <>tipo de chart no válido</>;
    }
}