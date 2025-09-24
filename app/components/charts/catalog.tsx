import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Button } from "~/components/ui/button"
import { Badge } from "~/components/ui/badge"
import { ChevronRight, BarChart3, Users, Activity } from "lucide-react"
import { MiniChart } from "./ui/mini-chart"
import { Link } from "react-router"
import { chartCatalog } from "~/lib/charts/mocks"

export function ChartCatalog() {
    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <div className="w-64 bg-card border-r border-border p-6">
                <div className="mb-8">
                    <h1 className="text-xl font-semibold text-foreground">Analytics Hub</h1>
                    <p className="text-sm text-muted-foreground">Chart Catalog & Insights</p>
                </div>

                <nav className="space-y-2">
                    <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Navigation</div>
                    <Button variant="ghost" className="w-full justify-start text-primary bg-primary/10">
                        <BarChart3 className="mr-2 h-4 w-4" />
                        Chart Catalog
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                        <Activity className="mr-2 h-4 w-4" />
                        Real-time Data
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                        <Users className="mr-2 h-4 w-4" />
                        User Analytics
                    </Button>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-foreground mb-2">Chart Catalog</h2>
                    <p className="text-muted-foreground">
                        Navigate to detailed analytical views with comprehensive controls and insights
                    </p>
                </div>

                {/* Chart Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {chartCatalog.map((chart) => (
                        <Link key={chart.id} to={`/charts/${chart.id}`}>
                            <Card className="chart-widget-hover cursor-pointer group">
                                <CardHeader className="pb-3">
                                    <div className="flex items-center justify-between">
                                        <div className={`p-2 rounded-lg bg-${chart.color}/10`}>
                                            <div className={`text-${chart.color}`}>{chart.icon}</div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge variant="secondary" className="text-xs">
                                                {chart.status}
                                            </Badge>
                                            <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                        </div>
                                    </div>
                                    <div>
                                        <CardTitle className="text-lg">{chart.name}</CardTitle>
                                        <CardDescription className="text-sm">{chart.description}</CardDescription>
                                    </div>
                                </CardHeader>

                                <CardContent className="pt-0">
                                    {/* Mini Chart Preview */}
                                    <div className="h-24 mb-4 bg-muted/20 rounded-lg flex items-center justify-center">
                                        <MiniChart type={chart.preview} color={chart.color} />
                                    </div>

                                    {/* Metrics */}
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <div className="text-lg font-semibold text-foreground">{chart.metrics.primary}</div>
                                        </div>
                                        <div className="text-right">
                                            <div className={`text-sm font-medium text-${chart.color}`}>{chart.metrics.secondary}</div>
                                            <div className="text-xs text-muted-foreground">Last 24h</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
