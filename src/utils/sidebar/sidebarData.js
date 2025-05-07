import {
    BellIcon,
    Briefcase,
    ContactIcon,
    Crown,
    FileText,
    FormInput,
    Layers,
    LayoutDashboard,
    Package,
    Settings2,
    ShieldUserIcon,
    User,
    Users,
    Users2,
  } from "lucide-react";
  
  export const data = {
    user: {
      name: "admin",
      email: "admin@admin.com",
      avatar: "/user.jpg",
    },
    teams: [
      {
        name: "Sewzee",
        logo: Crown,
        plan: "Super Admin",
      },
      {
        name: "Sewzee",
        logo: ShieldUserIcon,
        plan: "Admin",
      },
    ],
    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
        isActive: true,
        items: [],
        roles: ["super_admin", "admin"],
      },
      {
        title: "Customers List",
        url: "/dashboard/customer_list",
        icon: Users,
        isActive: true,
        items: [],
        roles: ["admin"],
      },
      {
        title: "Sellers List",
        url: "/dashboard/seller_list",
        icon: Users2,
        isActive: true,
        items: [],
        roles: ["admin"],
      }
    ],
    // projects: [
    //   {
    //     title: "Users",
    //     url: "/dashboard/users",
    //     icon: User,
    //     isActive: true,
    //     items: [],
    //     roles: ["super_admin"],
    //   },
    //   {
    //     title: "Configuration",
    //     name: "Configuration",
    //     url: "/dashboard/configuration",
    //     icon: FormInput,
    //     items: [
    //       {
    //         title: "Home",
    //         url: "/dashboard/configuration/home",
    //       },
    //       {
    //         title: "Service",
    //         url: "/dashboard/configuration/service",
    //       },
    //       {
    //         title: "Header & Footer",
    //         url: "/dashboard/configuration/header",
    //       },
    //       {
    //         title: "Internal Pages",
    //         url: "/dashboard/configuration/internal",
    //       },
    //     ],
    //     roles: ["super_admin"],
    //   },
    //   {
    //     title: "Blogs",
    //     name: "Blogs",
    //     url: "/dashboard/blogs",
    //     icon: FileText,
    //     roles: ["super_admin"],
    //   },
    //   {
    //     title: "Contact us form",
    //     name: "Contact us form",
    //     url: "/dashboard/contact-us",
    //     icon: ContactIcon,
    //     roles: ["super_admin", "admin"],
    //   },
    // ],
    // extra: [
    //   {
    //     title: "Forms",
    //     name: "Forms",
    //     url: "/forms",
    //     icon: FormInput,
    //     roles: ["super_admin", "admin"],
    //   },
    // ],
    // more: [
    //   {
    //     title: "Notifications",
    //     name: "Notifications",
    //     url: "/notifications",
    //     icon: BellIcon,
    //     roles: ["super_admin", "admin"],
    //   },
    //   {
    //     title: "Settings",
    //     url: "/settings",
    //     icon: Settings2,
    //     items: [],
    //     roles: ["super_admin", "admin"],
    //   },
    // ],
  };
  