"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AreaChart,
  Bell,
  LayoutGrid,
  Map,
  RadioTower,
  Settings,
  User,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { useSidebar } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const navItems = [
  { href: "/dashboard", icon: LayoutGrid, label: "Overview" },
  { href: "/dashboard/map", icon: Map, label: "Map View" },
  { href: "/dashboard/reports", icon: AreaChart, label: "Reports" },
  { href: "/dashboard/alerts", icon: Bell, label: "Alerts" },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { state } = useSidebar();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <RadioTower className="w-8 h-8 text-primary" />
          <span className="font-headline text-2xl group-data-[collapsible=icon]:hidden">
            TelePowerX
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} passHref>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  icon={<item.icon />}
                  tooltip={item.label}
                >
                  {item.label}
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
         <SidebarMenu>
            <SidebarMenuItem>
                <Link href="/dashboard/settings" passHref>
                    <SidebarMenuButton icon={<Settings />} tooltip="Settings" isActive={pathname === '/dashboard/settings'}>
                        Settings
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
                 <div className="flex items-center gap-3 rounded-md px-3 py-2 text-primary-foreground transition-all hover:text-accent-foreground group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:aspect-square group-data-[collapsible=icon]:w-auto">
                     <Avatar className="h-8 w-8">
                        <AvatarImage src="https://placehold.co/32x32.png" alt="User" data-ai-hint="man suit" />
                        <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                    <div className="group-data-[collapsible=icon]:hidden">
                        <p className="text-sm font-medium leading-none text-foreground">Admin</p>
                        <p className="text-xs leading-none text-muted-foreground">admin@telepowerx.com</p>
                    </div>
                 </div>
            </SidebarMenuItem>
         </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
