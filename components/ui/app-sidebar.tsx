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
                <SidebarMenuItem className="px-4 py-2 text-lg" key={item.title}>
                  <a href={item.href}>
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
