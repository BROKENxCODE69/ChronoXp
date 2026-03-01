"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAppStore } from "@/lib/store"
import { useAuth } from "@/components/auth-provider"
import { getXPProgressInLevel } from "@/lib/gamification"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  LayoutDashboard,
  ListTodo,
  BarChart3,
  BookOpen,
  Moon,
  Timer,
  Bot,
  Calendar,
  Sparkles,
  Music,
  Brain,
  RotateCcw,
  Trophy,
  Medal,
  Settings,
  LogOut,
  ChevronsUpDown,
  Zap,
} from "lucide-react"

const navMain = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Tasks", url: "/tasks", icon: ListTodo },
  { title: "Timeline", url: "/timeline", icon: Calendar },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Journal", url: "/journal", icon: BookOpen },
  { title: "Sleep", url: "/sleep", icon: Moon },
]

const navTools = [
  { title: "Deep Work", url: "/deep-work", icon: Timer },
  { title: "AI Mentor", url: "/mentor", icon: Bot },
  { title: "Planner", url: "/planner", icon: Calendar },
  { title: "Auto-Planner", url: "/auto-planner", icon: Sparkles },
  { title: "Focus Music", url: "/music", icon: Music },
]

const navMore = [
  { title: "Gamification", url: "/gamification", icon: Trophy },
  { title: "Knowledge", url: "/knowledge", icon: Brain },
  { title: "Retrospective", url: "/retrospective", icon: RotateCcw },
  { title: "Leaderboard", url: "/leaderboard", icon: Medal },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { profile } = useAppStore()
  const { user, isGuest, logout } = useAuth()

  const stats = profile?.stats
  const level = stats?.level ?? 1
  const totalXP = stats?.totalXP ?? 0
  const xpInLevel = getXPProgressInLevel(totalXP)
  const xpProgress = (xpInLevel / 1000) * 100
  const streak = stats?.currentStreak ?? 0

  const displayName = user?.displayName ?? (isGuest ? "Guest" : "User")
  const displayEmail = user?.email ?? (isGuest ? "Local mode" : "")
  const photoURL = user?.photoURL ?? undefined

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <SidebarHeader className="p-3">
        <Link href="/dashboard" className="flex items-center gap-2 px-1 group-data-[collapsible=icon]:justify-center">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Zap className="h-4 w-4" />
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-bold tracking-tight">ChronoXP</span>
            <span className="text-xs text-muted-foreground">Level {level}</span>
          </div>
        </Link>
        <div className="mt-2 px-1 group-data-[collapsible=icon]:hidden">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
            <span>{xpInLevel} / 1000 XP</span>
            {streak > 0 && <span className="text-orange-500">{streak}d streak</span>}
          </div>
          <Progress value={xpProgress} className="h-1.5" />
        </div>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navMain.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    tooltip={item.title}
                  >
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navTools.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    tooltip={item.title}
                  >
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>More</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navMore.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    tooltip={item.title}
                  >
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === "/settings"}
              tooltip="Settings"
            >
              <Link href="/settings">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent"
                >
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={photoURL} alt={displayName} />
                    <AvatarFallback className="text-xs bg-primary/10 text-primary">
                      {displayName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col text-left text-xs leading-tight">
                    <span className="truncate font-medium">{displayName}</span>
                    <span className="truncate text-muted-foreground">{displayEmail}</span>
                  </div>
                  <ChevronsUpDown className="ml-auto h-4 w-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56"
                side="top"
                align="start"
                sideOffset={4}
              >
                <DropdownMenuItem asChild>
                  <Link href="/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  {isGuest ? "Exit Guest Mode" : "Sign Out"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
