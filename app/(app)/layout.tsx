"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { useAppStore } from "@/lib/store"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { Separator } from "@/components/ui/separator"
import LoadingScreen from "@/components/loading-screen"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, isGuest, isLoading: authLoading } = useAuth()
  const { initializeApp, loading: storeLoading } = useAppStore()
  const router = useRouter()

  useEffect(() => {
    if (!authLoading && !user && !isGuest) {
      router.push("/")
    }
  }, [user, isGuest, authLoading, router])

  useEffect(() => {
    if (user || isGuest) {
      initializeApp()
    }
  }, [user, isGuest, initializeApp])

  if (authLoading || storeLoading) {
    return <LoadingScreen />
  }

  if (!user && !isGuest) {
    return null
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 !h-4" />
        </header>
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
