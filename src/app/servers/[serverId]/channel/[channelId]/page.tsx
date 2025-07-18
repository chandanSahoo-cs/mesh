"use client";

import { useGetChannelById } from "@/features/channels/api/useGetChannelById";
import { useGetMessages } from "@/features/messages/api/useGetMessages";
import { useChannelId } from "@/hooks/useChannelId";
import { LoaderIcon, TriangleAlertIcon } from "lucide-react";
import { ChatInput } from "./components/ChatInput";
import { Header } from "./components/Header";
import { MessageList } from "@/components/MessageList";

const ChannelIdPage = () => {
  const channelId = useChannelId();
  console.log("channelId:", channelId);
  const { data: channel, isLoading: channelLoading } = useGetChannelById({
    channelId: channelId,
  });

  const { results, status,loadMore } = useGetMessages({ channelId });

  if (channelLoading || status === "LoadingFirstPage") {
    return (
      <div className="h-full flex flex-1 items-center justify-center">
        <LoaderIcon className="animate-spin size-5 text-muted-foreground" />
      </div>
    );
  }
  if (!channel) {
    return (
      <div className="h-full flex flex-1 flex-col gap-y-2 items-center justify-center">
        <TriangleAlertIcon className="size-5 text-destructive" />
        <span className="text-sm text-muted-foreground">Channel not found</span>
      </div>
    );
  }
  return (
    <div className="flex flex-col h-full">
      <Header channelName={channel.name} />
      <MessageList
      channelName={channel.name}
      channelCreationTime={channel._creationTime}
      data={results}
      loadMore={loadMore}
      isLoadingMore={status === "LoadingMore"}
      canLoadMore={status === "CanLoadMore"}
      />
      <ChatInput placeholder={`Message # ${channel.name}`} />
    </div>
  );
};

export default ChannelIdPage;
