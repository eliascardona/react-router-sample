import { chartTypeEnum, type Chart, type ChartContent } from "./types"
import { BarChart3, TrendingUp, Users, DollarSign, Activity, PieChart } from "lucide-react"

const radarSample: ChartContent = {
    type: chartTypeEnum.enum.RADAR,
    baseData: [
        {
            key: 'edadPromedio',
            label: 'Edad Promedio',
            unit: 'años',
            maxValue: 70,
            description: 'Edad promedio del segmento'
        },
        {
            key: 'estanciaPromedio',
            label: 'Estancia Promedio',
            unit: 'noches',
            maxValue: 6,
            description: 'Noches promedio por reserva'
        },
        {
            key: 'gastoTotal',
            label: 'Gasto Total',
            unit: '$',
            maxValue: 500,
            description: 'Gasto total promedio por estancia'
        },
        {
            key: 'satisfaccion',
            label: 'Satisfacción',
            unit: '/5',
            maxValue: 5,
            description: 'Score de satisfacción del huésped'
        },
        {
            key: 'frecuenciaAnual',
            label: 'Frecuencia Anual',
            unit: 'visitas',
            maxValue: 10,
            description: 'Número de visitas por año'
        },
        {
            key: 'gastosExtras',
            label: 'Gastos Extras',
            unit: '$',
            maxValue: 150,
            description: 'Gasto en servicios adicionales'
        },
        {
            key: 'lealtad',
            label: 'Lealtad',
            unit: '/10',
            maxValue: 10,
            description: 'Índice de lealtad a la marca'
        },
        {
            key: 'recomendacion',
            label: 'NPS',
            unit: '/10',
            maxValue: 10,
            description: 'Net Promoter Score'
        },
        {
            key: 'puntualidad',
            label: 'Puntualidad',
            unit: '/10',
            maxValue: 10,
            description: 'Índice de cumplimiento de horarios'
        },
        {
            key: 'digitalizacion',
            label: 'Adopción Digital',
            unit: '/10',
            maxValue: 10,
            description: 'Uso de servicios digitales'
        }
    ]
}

export const chartCatalog = [
    {
        id: "guest-profile-radar",
        name: "Guest Segment Analysis",
        description: "Multidimensional comparison of guest segments",
        type: "Radar Chart",
        status: "Active",
        metrics: { primary: "8 Segments", secondary: "92% Accuracy" },
        icon: <PieChart className="h-5 w-5" />,
        color: "chart-1",
        preview: "radar",
        content: radarSample
    },
    {
        id: "revenue-trends",
        name: "Revenue Performance",
        description: "Monthly revenue trends and forecasting",
        status: "Updated",
        metrics: { primary: "$2.4M", secondary: "+15.3%" },
        icon: <TrendingUp className="h-5 w-5" />,
        color: "chart-2",
        preview: "line",
        content: radarSample
    },
    {
        id: "customer-satisfaction",
        name: "Customer Satisfaction",
        description: "NPS scores and satisfaction metrics",
        status: "Live",
        metrics: { primary: "8.5/10", secondary: "↑ 0.3" },
        icon: <BarChart3 className="h-5 w-5" />,
        color: "chart-3",
        preview: "bar",
        content: radarSample
    },
    {
        id: "occupancy-rates",
        name: "Occupancy Analytics",
        description: "Real-time occupancy and booking patterns",
        status: "Active",
        metrics: { primary: "87%", secondary: "Peak: 94%" },
        icon: <Activity className="h-5 w-5" />,
        color: "chart-4",
        preview: "area",
        content: radarSample
    },
    {
        id: "market-analysis",
        name: "Market Positioning",
        description: "Competitive analysis and market share",
        status: "Updated",
        metrics: { primary: "23% Share", secondary: "Rank #2" },
        icon: <Users className="h-5 w-5" />,
        color: "chart-5",
        preview: "scatter",
        content: radarSample
    },
    {
        id: "financial-overview",
        name: "Financial Dashboard",
        description: "Comprehensive financial metrics and KPIs",
        status: "Live",
        metrics: { primary: "$450K", secondary: "ROI: 18%" },
        icon: <DollarSign className="h-5 w-5" />,
        color: "chart-1",
        preview: "multi",
        content: radarSample
    },
] as Chart[]