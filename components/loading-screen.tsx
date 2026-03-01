import { Loader2 } from "lucide-react"

export default function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center flex flex-col items-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <div>
          <h2 className="text-2xl font-bold tracking-tight">ChronoXP</h2>
          <p className="text-sm text-muted-foreground mt-1">Loading your productivity data...</p>
        </div>
      </div>
    </div>
  )
}
