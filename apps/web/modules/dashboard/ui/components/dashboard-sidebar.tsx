"use client"
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"
import { InboxIcon, LibraryBigIcon, LayoutDashboardIcon, MicIcon, PaletteIcon, CreditCardIcon } from "lucide-react"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail } from "@workspace/ui/components/sidebar"
import { usePathname } from "next/navigation"
import { cn } from "@workspace/ui/lib/utils"

const customerSupportItems = [
    {
        title:"Conversations",
        url:"/conversations",
        icon: InboxIcon
    },
    {
        title: "Knowledge Base",
        url:"/knowledge-base",
        icon:LibraryBigIcon
    }

];

const configurationItems = [
    {
        title: "Widget Customization",
        url: "/customization",
        icon: PaletteIcon,
    },
    {
        title: "Integrations",
        url: "/integrations",
        icon: LayoutDashboardIcon,
    },
    {
        title: "Voice Assistant",
        url: "/plugins/vapi",
        icon: MicIcon,
    },
];

const accountItems = [
    {
        title: "Plans & Billing",
        url: "/billing",
        icon: CreditCardIcon,
    },
];

export const DashboardSidebar = () => {
    const pathName = usePathname();
    const isActive = (url: string) => {
        if (url === "/") {
            return pathName === "/";
        }
        return pathName.startsWith(url);
    }

    return (
        <Sidebar className= "group" collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild size="lg">
                            <OrganizationSwitcher 
                            hidePersonal 
                            skipInvitationScreen
                            appearance={{
                                elements :{
                                    rootBox: "w-full! h-8!",
                                    avatarBox: "size-4! rounded-sm!",
                                    organizationSwitcherTrigger: "w-full! justify-start! group-data-[collapsed=icon]:size-8! group-data-[collapsed=icon]:p-2!",
                                    organizationPreview: "gap-2! group-data-[collapsed=icon]:justify-center!",
                                    organizationPreviewTextContainer: "group-data-[collapsed=icon]:hidden! text-xs! font-medium! text-sidebar-foreground!",
                                    organizationSwitcherTriggerIcon: "group-data-[collapsed=icon]:hidden! ml-auto! text-sidebar!",
                                }
                            }} 
                            />
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                {/* Customer Support Section */}
                <SidebarGroup>
                    <SidebarGroupLabel>Customer Support</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {customerSupportItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={isActive(item.url)}
                                        tooltip={item.title}
                                        className={cn(
                                            isActive(item.url) && "bg-gradient-to-b from-[#0b63f3] to-[#0b63f3] text-sidebar-primary-foreground hover:to-[#0b63f3]/90",
                                        )}
                                    >
                                        <a href={item.url}>
                                            <item.icon className="size-4" />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* Configuration Section */}
                <SidebarGroup>
                    <SidebarGroupLabel>Configuration</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {configurationItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={isActive(item.url)}
                                        tooltip={item.title}
                                    >
                                        <a href={item.url}>
                                            <item.icon className="size-4" />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* Account Section */}
                <SidebarGroup>
                    <SidebarGroupLabel>Account</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {accountItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={isActive(item.url)}
                                        tooltip={item.title}
                                    >
                                        <a href={item.url}>
                                            <item.icon className="size-4" />
                                            <span>{item.title}</span>
                                        </a>
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
                        <UserButton showName
                        appearance={{
                            elements: {
                                rootBox: "w-full! h-8!",
                                userButtonTrigger: "w-full! p-2! hover:bg-sidebar-accent! hover:text-sidebar-accent-foreground! group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2!",
                                userButtonBox: "w-full! flex-row-reverse! justify-end! gap-2! group-data-[collapsible=icon]:justify-center! text-sidebar-foreground!",
                                userButtonOuterIdentifier: "pl-0! group-data-[collapsible=icon]:hidden!",
                                avatarBox: "size-4!",
                            }
                        }}/>
                    </SidebarMenuItem>
                </SidebarMenu>    
            </SidebarFooter>        
           <SidebarRail />
        </Sidebar>
    )
}