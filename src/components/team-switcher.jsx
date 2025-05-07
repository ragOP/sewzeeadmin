import { Crown, ShieldUserIcon } from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  // SidebarTrigger,
} from "@/components/ui/sidebar";

export function TeamSwitcher({ role }) {
  const isSuperAdmin = role === "super_admin";
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
            {isSuperAdmin ? (
              <Crown className="size-4" />
            ) : (
              <ShieldUserIcon className="size-4" />
            )}
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{"SEWZEE"}</span>
            <span className="truncate text-xs">
              {isSuperAdmin ? "Super Admin" : "Admin"}
            </span>
          </div>
          {/* <SidebarTrigger className="-ml-1" /> */}

          {/* <ChevronsUpDown className="ml-auto" /> */}
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

{
  /* <DropdownMenu>
<DropdownMenuTrigger asChild>
  <SidebarMenuButton
    size="lg"
    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
  >
    <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
      <activeTeam.logo className="size-4" />
    </div>
    <div className="grid flex-1 text-left text-sm leading-tight">
      <span className="truncate font-medium">{activeTeam.name}</span>
      <span className="truncate text-xs">{activeTeam.plan}</span>
    </div>
    <ChevronsUpDown className="ml-auto" />
  </SidebarMenuButton>
</DropdownMenuTrigger>
<DropdownMenuContent
  className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
  align="start"
  side={isMobile ? "bottom" : "right"}
  sideOffset={4}
>
  <DropdownMenuLabel className="text-muted-foreground text-xs">
    Type
  </DropdownMenuLabel>
  {teams.map((team, index) => (
    <DropdownMenuItem
      key={team.name}
      onClick={() => setActiveTeam(team)}
      className="gap-2 p-2"
    >
      <div className="flex size-6 items-center justify-center rounded-xs border">
        <team.logo className="size-4 shrink-0" />
      </div>
      {team.name}
      <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
    </DropdownMenuItem>
  ))}
</DropdownMenuContent>
</DropdownMenu> */
}
