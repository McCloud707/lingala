import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "lingala",
  description: "language learning application",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <body>
        <div className="max-h-screen">
          <SidebarTrigger className="mt-2.5" />
        </div>
        {children}
      </body>
    </SidebarProvider>
  );
}
