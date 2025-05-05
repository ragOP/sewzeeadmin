import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";

const NavbarItem = ({ title }) => {
  return (
    <div className="flex md:flex-row justify-between md:items-center p-4">
      <div className="flex flex-row mb-4 md:mb-0 gap-6">
        <SidebarTrigger className="-ml-1" />
        <div className="flex flex-col gap-1">
          <h1 className="text-xl md:text-xl font-semibold">{title}</h1>
          <NavbarBreadcrumb title={title} />
        </div>
      </div>
    </div>
  );
};

export default NavbarItem;

export const NavbarBreadcrumb = ({ title }) => {
  return (
    <header className="flex shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-6">
      <div className="flex items-center gap-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>{title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
};
