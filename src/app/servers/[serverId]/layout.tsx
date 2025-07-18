"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Thread } from "@/features/messages/components/Thread";
import { Profile } from "@/features/serverMembers/components/Profile";
import { usePanel } from "@/hooks/usePanel";
import { LoaderIcon } from "lucide-react";
import { Id } from "../../../../convex/_generated/dataModel";
import { ServerSidebar } from "./components/ServerSidebar";
import { Sidebar } from "./components/Sidebar";
import { Toolbar } from "./components/Tootlbar";

interface ServerIdLayoutProps {
  children: React.ReactNode;
}

const ServerIdLayout = ({ children }: ServerIdLayoutProps) => {
  const { parentMessageId, profileMemberId, onClose } = usePanel();

  const showPanel = !!parentMessageId || !!profileMemberId;

  return (
    <div className="h-full">
      <Toolbar />
      <div className="flex h-[calc(100vh-40px)]">
        <Sidebar />
        <ResizablePanelGroup
          direction="horizontal"
          autoSaveId="mesh_server_layout">
          <ResizablePanel
            defaultSize={20}
            minSize={11}
            className="bg-[#5e2c5f]">
            <ServerSidebar />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel minSize={20} defaultSize={80}>{children}</ResizablePanel>
          {showPanel && (
            <>
              <ResizableHandle withHandle />
              <ResizablePanel minSize={20} defaultSize={29}>
                {parentMessageId ? (
                  <Thread
                    messageId={parentMessageId as Id<"messages">}
                    onClose={onClose}
                  />
                ) : profileMemberId ? (
                  <Profile
                    serverMemberId={profileMemberId as Id<"serverMembers">}
                    onClose={onClose}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <LoaderIcon className="size-5 animate-spin text-muted-foreground" />
                  </div>
                )}
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default ServerIdLayout;
