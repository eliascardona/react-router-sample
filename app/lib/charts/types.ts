import z from "zod";

export const chartTypeEnum = z.enum([
    'RADAR',
    'BAR'
])
export type ChartType = z.infer<typeof chartTypeEnum>;

const radarChartDimensionSchema = z.object({
    key: z.string(),
    label: z.string(),
    unit: z.string(),
    maxValue: z.number(),
    description: z.string()
})
export type RadarDimension = z.infer<typeof radarChartDimensionSchema>;

const radarChartSchema = z.object({
    type: z.literal(chartTypeEnum.enum.RADAR),
    baseData: radarChartDimensionSchema.array()
})
export type RadarChart = z.infer<typeof radarChartSchema>;

const chartContentSchema = z.discriminatedUnion('type', [
    radarChartSchema
])
export type ChartContent = z.infer<typeof chartContentSchema>;

const chartSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    status: z.string(),
    metrics: z.object({
        primary: z.string(),
        secondary: z.string()
    }),
    icon: z.any(),
    color: z.string(),
    preview: z.string(),
    content: chartContentSchema
})

export type Chart = z.infer<typeof chartSchema>;