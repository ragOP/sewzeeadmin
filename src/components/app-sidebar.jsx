import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Input } from "./ui/input";
import { filterItemsByRole } from "@/utils/sidebar/filterItemsByRole";
import { data } from "@/utils/sidebar/sidebarData";

export function AppSidebar({ ...props }) {

  const filteredNavMain = filterItemsByRole(data.navMain, "admin");
  const filteredMore = filterItemsByRole(data.more, "admin");
  const userInfo = data.user;

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} role="admin" />
        <Input placeholder="Search" className="bg-white" />
      </SidebarHeader>
      <SidebarContent className="overflow-y-auto [&::-webkit-scrollbar]:hidden">
        <NavMain items={filteredNavMain} showHeader={false} />
        <NavMain items={filteredMore} showHeader={true} header={"More"} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userInfo} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
