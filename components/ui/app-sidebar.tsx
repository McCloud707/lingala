import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

/*
     Translate
     Read
     Listen
     Fill
     Flashcards
     Chat
     Scenarios
*/

const items = [
  {
    title: "Learn",
    href: "/dashboard/learn/",
  },
  {
    title: "Translate",
    href: "/dashboard/translate/",
  },
  {
    title: "Read",
    href: "/dashboard/read/",
  },
  {
    title: "Cloze",
    href: "/dashboard/cloze/",
  },
  {
    title: "Flashcards",
    href: "/dashboard/flashcards/",
  },
  {
    title: "Chat",
    href: "/dashboard/chat/",
  },
  {
    title: "Scenarios",
    href: "/dashboard/scenarios/",
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="bg-white border-black border-l-2">
      <SidebarHeader className="bg-white" title="Lingala">
        <div className="flex items-center justify-between">
          <h1 className="font-medium px-4 text-2xl">Lingala</h1>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="w-full">
              {items.map((item) => (
                <SidebarMenuItem
                  className="px-3 py-1.5 text-base rounded-md hover:bg-gray-100"
                  key={item.title}
                >
                  <a className="" href={item.href}>
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className=""></SidebarFooter>
    </Sidebar>
  );
}
