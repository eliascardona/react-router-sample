import { Button } from "~/components/ui/button";

export function GenericHeader() {
    return (
        <div className="w-full rounded-md shadow-md">
            <div className="p-4 flex justify-between">
                <h2 className="font-medium">Logotype</h2>
                <div className="flex">
                    <Button type="button">
                        Login
                    </Button>
                    <Button type="button" variant="outline">
                        Sign up
                    </Button>
                </div>
            </div>
        </div>
    )
}