import { useCurrentMember } from "@/features/serverMembers/api/useCurrentMember";
import { useServerId } from "@/hooks/useServerId";
import { cn } from "@/lib/utils";
import { DedupedReaction } from "../../convex/messages";
import { Hint } from "./Hint";
import { EmojiPopover } from "./EmojiPopover";
import { MdOutlineAddReaction } from "react-icons/md";

interface ReactionProps {
  data: DedupedReaction[];
  onChange: (value: string) => void;
}

export const Reactions = ({ data, onChange }: ReactionProps) => {
  const serverId = useServerId();
  const { data: currentMember } = useCurrentMember({ serverId });

  const currentMemberId = currentMember?._id;

  if (data.length === 0 || !currentMemberId) {
    return null;
  }

  return (
    <div className="flex items-center gap-1 mt-1 mb-1">
      {data.map((reaction) => (
        <Hint
          key={reaction.reactionDetails._id}
          label={`${reaction.count} ${reaction.count === 1 ? "person" : "people"} reacted with ${reaction.value}`}>
          <button
            onClick={() => onChange(reaction.value)}
            className={cn(
              "h-6 px-2 rounded-full bg-slate-200/70 border border-transparent text-slate-800 flex items-center gap-x-1",
              reaction.memberIds.includes(currentMemberId) &&
                "bg-blue-100/70 border-blue-500 text-white"
            )}>
            {reaction.value}
            <span
              className={cn(
                "text-xs font-semibold text-muted-foreground",
                reaction.memberIds.includes(currentMemberId) && "text-blue-500"
              )}>
              {reaction.count}
            </span>
          </button>
        </Hint>
      ))}
      <EmojiPopover
        hint="Add reaction"
        onEmojiSelect={(emoji) => onChange(emoji.native)}
      >
        <button className="h-7 px-3 rounded-full bg-slate-200/70 border border-transparent hover:border-slate-500 text-slate-800 flex items-center gap-x-1">
          <MdOutlineAddReaction className="size-4" />
        </button>
      </EmojiPopover>
    </div>
  );
};
