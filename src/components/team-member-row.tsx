

import type { TeamMember } from "../lib/data"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { Button } from "./ui/button"
import { MoreHorizontal } from "lucide-react"

interface TeamMemberRowProps {
  member: TeamMember
  showActions: boolean
  onToggleActions: () => void
  onManageRole: () => void
  onRemoveFromTeam: () => void
}

export function TeamMemberRow({
  member,
  showActions,
  onToggleActions,
  onManageRole,
  onRemoveFromTeam,
}: TeamMemberRowProps) {
  return (
    <div className="grid grid-cols-5 items-center border-b p-4">
      <div className="col-span-1 flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarFallback className="bg-blue-100 text-blue-600">{member.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium">{member.name}</div>
          <div className="text-xs text-gray-500">Last active {member.lastActive}</div>
        </div>
      </div>

      <div className="col-span-1">
        <div
          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
            member.role === "Admin"
              ? "bg-blue-100 text-blue-600"
              : member.role === "Member"
                ? "bg-gray-100 text-gray-600"
                : "bg-red-100 text-red-600"
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current"></span>
          {member.role}
        </div>
      </div>

      <div className="col-span-1">{member.generated}</div>

      <div className="col-span-1">{member.unlocked}</div>

      <div className="col-span-1 flex items-center justify-between">
        {member.assigned > 0 && (
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-xs font-medium text-green-600">
            {member.assigned}
          </div>
        )}

        <div className="relative">
          <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full p-0" onClick={onToggleActions}>
            <MoreHorizontal className="h-4 w-4" />
          </Button>

          {showActions && (
            <div className="absolute right-0 top-full z-10 mt-1 w-[200px] rounded-md border bg-white shadow-lg">
              <div className="p-2 text-xs font-medium text-gray-500">Actions</div>
              <button
                className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm hover:bg-gray-50"
                onClick={onManageRole}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M10.325 4.317C10.751 2.561 13.249 2.561 13.675 4.317C13.7389 4.5808 13.8642 4.82578 14.0407 5.032C14.2172 5.23822 14.4399 5.39985 14.6907 5.50375C14.9414 5.60764 15.2132 5.65085 15.4838 5.62987C15.7544 5.60889 16.0162 5.5243 16.248 5.383C17.791 4.443 19.558 6.209 18.618 7.753C18.4769 7.98466 18.3924 8.24634 18.3715 8.51677C18.3506 8.78721 18.3938 9.05877 18.4975 9.30938C18.6013 9.55999 18.7627 9.78258 18.9687 9.95905C19.1747 10.1355 19.4194 10.2609 19.683 10.325C21.439 10.751 21.439 13.249 19.683 13.675C19.4192 13.7389 19.1742 13.8642 18.968 14.0407C18.7618 14.2172 18.6001 14.4399 18.4963 14.6907C18.3924 14.9414 18.3491 15.2132 18.3701 15.4838C18.3911 15.7544 18.4757 16.0162 18.617 16.248C19.557 17.791 17.791 19.558 16.247 18.618C16.0153 18.4769 15.7537 18.3924 15.4832 18.3715C15.2128 18.3506 14.9412 18.3938 14.6906 18.4975C14.44 18.6013 14.2174 18.7627 14.0409 18.9687C13.8645 19.1747 13.7391 19.4194 13.675 19.683C13.249 21.439 10.751 21.439 10.325 19.683C10.2611 19.4192 10.1358 19.1742 9.95929 18.968C9.7828 18.7618 9.56011 18.6001 9.30935 18.4963C9.05859 18.3924 8.78683 18.3491 8.51621 18.3701C8.24559 18.3911 7.98375 18.4757 7.752 18.617C6.209 19.557 4.442 17.791 5.382 16.247C5.5231 16.0153 5.60755 15.7537 5.62848 15.4832C5.64942 15.2128 5.60624 14.9412 5.50247 14.6906C5.3987 14.44 5.23726 14.2174 5.03127 14.0409C4.82529 13.8645 4.58056 13.7391 4.317 13.675C2.561 13.249 2.561 10.751 4.317 10.325C4.5808 10.2611 4.82578 10.1358 5.032 9.95929C5.23822 9.7828 5.39985 9.56011 5.50375 9.30935C5.60764 9.05859 5.65085 8.78683 5.62987 8.51621C5.60889 8.24559 5.5243 7.98375 5.383 7.752C4.443 6.209 6.209 4.442 7.753 5.382C8.753 5.99 10.049 5.452 10.325 4.317Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Manage Role
              </button>
              <button
                className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50"
                onClick={onRemoveFromTeam}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Remove from team
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
