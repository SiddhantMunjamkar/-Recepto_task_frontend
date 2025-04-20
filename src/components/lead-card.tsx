import type { Lead } from "../lib/data"
import { Button } from "./ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react"
import { cn } from "../lib/utils"
import { AssignModal } from "./assign-modal"
import { generateInitialTeamMembers } from "../lib/data"
import { useOrganizationData } from "../lib/hooks"

interface LeadCardProps {
  lead: Lead
  onUnlock: (id: string) => void
  onLike: (id: string) => void
  onDislike: (id: string) => void
  onAssign: (id: string) => void
  showAssignModal: boolean
  onAssignTo: (leadId: string, userId: string) => void
  onCloseAssignModal: () => void
}

export function LeadCard({
  lead,
  onUnlock,
  onLike,
  onDislike,
  onAssign,
  showAssignModal,
  onAssignTo,
  onCloseAssignModal,
}: LeadCardProps) {
  const [teamMembers] = useOrganizationData("recepto_team_members", generateInitialTeamMembers())
  const assignedMember = lead.assignedTo ? teamMembers.find((member) => member.id === lead.assignedTo) : null

  return (
    <div className="relative rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow min-h-[60px]">
      <div
        className={cn(
          "absolute left-0 top-0 h-full w-1 rounded-l-2xl",
          lead.type === "ReceptoNet" ? "bg-blue-500" : "bg-orange-500",
        )}
      />

      <div className="p-4 pl-6">
        <div className="flex items-start gap-3">
          <Avatar className="h-10 w-10 rounded-md bg-gray-200">
            {lead.type === "ReceptoNet" ? (
              <div className="flex h-full w-full items-center justify-center bg-gray-700 text-white">A</div>
            ) : (
              <AvatarImage src="/avatars/jennifer.jpg" alt={lead.name} />
            )}
            <AvatarFallback className="bg-blue-100 text-blue-600">
              {lead.type === "ReceptoNet" ? "A" : lead.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="mb-1 font-medium">{lead.name}</div>
            <div className="flex items-center text-sm text-gray-500">
              <svg className="mr-1 h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 22C16 18 20 14.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 14.4183 8 18 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {lead.location}
            </div>

            <p className="mt-2 text-sm">{lead.message}</p>

            <div className="mt-2 flex items-center gap-4">
              <div className="flex items-center text-xs text-gray-500">
                <svg className="mr-1 h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {lead.timestamp}
              </div>

              {lead.type === "ReceptoNet" && (
                <div className="rounded-full bg-orange-100 px-2 py-0.5 text-xs text-orange-600">ReceptoNet</div>
              )}

              {lead.type === "OrgNetwork" && lead.groupName && (
                <div className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-600">
                  <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 20H22V18C22 16.3431 20.6569 15 19 15C18.0444 15 17.1931 15.4468 16.6438 16.1429M17 20H7M17 20V18C17 17.3438 16.8736 16.717 16.6438 16.1429M7 20H2V18C2 16.3431 3.34315 15 5 15C5.95561 15 6.80686 15.4468 7.35625 16.1429M7 20V18C7 17.3438 7.12642 16.717 7.35625 16.1429M7.35625 16.1429C8.0935 14.301 9.89482 13 12 13C14.1052 13 15.9065 14.301 16.6438 16.1429M15 7C15 8.65685 13.6569 10 12 10C10.3431 10 9 8.65685 9 7C9 5.34315 10.3431 4 12 4C13.6569 4 15 5.34315 15 7ZM21 10C21 11.1046 20.1046 12 19 12C17.8954 12 17 11.1046 17 10C17 8.89543 17.8954 8 19 8C20.1046 8 21 8.89543 21 10ZM7 10C7 11.1046 6.10457 12 5 12C3.89543 12 3 11.1046 3 10C3 8.89543 3.89543 8 5 8C6.10457 8 7 8.89543 7 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {lead.groupName}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            {!lead.isUnlocked ? (
              <Button
                variant="default"
                className="flex items-center gap-1 rounded-full px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700"
                onClick={() => onUnlock(lead.id)}
              >
                <svg className="h-4 w-4" />
                Unlock
                <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-100 text-xs text-yellow-800">
                  {lead.credits}
                </span>
              </Button>
            ) : (
              <div className="flex gap-1">
                <Button variant="outline" className="rounded-full border border-gray-200 px-3 py-1 text-sm" onClick={() => onAssign(lead.id)}>
                  Assign
                </Button>
                <Button variant="outline" className="rounded-full border border-gray-200 px-3 py-1 text-sm">
                  View Details
                </Button>
              </div>
            )}

            <div className="flex items-center gap-1">
              <div
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium ring-1 ring-offset-1",
                  lead.score >= 90 ? "bg-blue-100 text-blue-600" : "bg-green-100 text-green-600",
                )}
              >
                {lead.score}
              </div>

              <button
                className={cn("rounded p-1 hover:bg-gray-100", lead.isLiked ? "text-blue-600" : "text-gray-400")}
                onClick={() => onLike(lead.id)}
              >
                <ThumbsUp className="h-4 w-4" />
              </button>

              <button
                className={cn("rounded p-1 hover:bg-gray-100", lead.isDisliked ? "text-blue-600" : "text-gray-400")}
                onClick={() => onDislike(lead.id)}
              >
                <ThumbsDown className="h-4 w-4" />
              </button>

              <button className="rounded p-1 text-gray-400 hover:bg-gray-100">
                <MessageSquare className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {assignedMember && (
          <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 w-fit">
            <Avatar className="h-5 w-5">
              <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
                {assignedMember.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs text-gray-700">Assigned to {assignedMember.name}</span>
          </div>
        )}
      </div>

      {showAssignModal && (
        <AssignModal onClose={onCloseAssignModal} onAssign={(userId) => onAssignTo(lead.id, userId)} />
      )}
    </div>
  )
}
