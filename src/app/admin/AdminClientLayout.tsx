"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  RiDashboardLine,
  RiBriefcaseLine,
  RiToolsLine,
  RiUserLine,
  RiChatQuoteLine,
  RiMailLine,
  RiHomeLine,
  RiLogoutBoxLine,
  RiScanLine,
} from "@remixicon/react";
import UserDropdown from "@/components/user-dropdown";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { BreadcrumbList } from "@/components/ui/breadcrumb";
import { BreadcrumbItem } from "@/components/ui/breadcrumb";
import { BreadcrumbLink } from "@/components/ui/breadcrumb";
import { BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import FeedbackDialog from "@/components/feedback-dialog";
import { useEffect } from "react";
import React from "react";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: RiDashboardLine },
  { name: "Projects", href: "/admin/projects", icon: RiBriefcaseLine },
  { name: "Skills", href: "/admin/skills", icon: RiToolsLine },
  { name: "About", href: "/admin/about", icon: RiUserLine },
  { name: "Testimonials", href: "/admin/testimonials", icon: RiChatQuoteLine },
  { name: "Messages", href: "/admin/contact", icon: RiMailLine },
];

export default function AdminClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  const segments = pathname.split("/").filter(Boolean);

  useEffect(() => {
    if (status === "authenticated" && (!session || session.user.role !== "admin")) {
      router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
    } else if (status === "unauthenticated") {
      router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
    }
  }, [session, status, router, pathname]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!session || session.user.role !== "admin") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center text-foreground">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-light">
    <SidebarProvider defaultOpen={true}>
      <Sidebar variant="inset">
        <SidebarHeader>
          <div className="flex items-center gap-2 px-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <span className="text-sm font-semibold">A</span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-sm font-semibold">Admin Panel</h1>
              <p className="text-xs text-muted-foreground">
                Portfolio Management
              </p>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarMenu>
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                const IconComponent = item.icon;

                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.name}
                    >
                      <Link href={item.href}>
                        <IconComponent className="size-4" />
                        <span>{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarGroup>
            <SidebarGroupLabel>Quick Actions</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="View Site">
                  <Link href="/">
                    <RiHomeLine className="size-4" />
                    <span>View Site</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={() => signOut()} tooltip="Sign Out">
                  <RiLogoutBoxLine className="size-4" />
                  <span>Sign Out</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>

          <div className="px-2 py-2">
            <div className="rounded-md bg-muted p-2 text-xs text-muted-foreground">
              Signed in as: {session.user.email}
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset className="overflow-hidden px-4 md:px-6 lg:px-8">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger className="-ms-4" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                {segments.map((segment, index) => {
                  const href = "/" + segments.slice(0, index + 1).join("/");
                  const isLast = index === segments.length - 1;

                  const navItem = navigation.find((item) => item.href === href);

                  return (
                    <React.Fragment key={href}>
                      {index > 0 && <BreadcrumbSeparator />}
                      <BreadcrumbItem>
                        {isLast ? (
                          <BreadcrumbPage>
                            {navItem?.name ?? segment}
                          </BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink href={href}>
                            {navItem?.name ?? segment}
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                    </React.Fragment>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 py-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
    </div>
  );
}


