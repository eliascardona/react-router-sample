import { ArrowLeft, Download, RefreshCw, Settings, Share2 } from "lucide-react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";

export function ChartDetailsHeader() {
    return (
        <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
            <div className="flex items-center justify-between p-6">
                <div className="flex items-center gap-4">
                    <Link to="/charts">
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Regresar al catálogo
                        </Button>
                    </Link>
                </div>
                {/* Chart quick actions */}
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Refresh
                    </Button>

                    <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                    </Button>

                    <Button variant="outline" size="sm">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                    </Button>

                    <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}