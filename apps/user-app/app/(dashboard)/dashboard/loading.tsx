import Loader from "@repo/ui/loader";

export default function Loading() {
    return (
        <div className="flex-1 flex items-center justify-center min-h-screen">
            <Loader fullScreen={false} />
        </div>
    )
}