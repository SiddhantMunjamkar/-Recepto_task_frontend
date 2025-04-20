"use client"

import { useState } from "react"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Search, Check } from "lucide-react"
import { generateInitialTeamMembers } from "../lib/data"
import { useOrganizationData } from "../lib/hooks"

interface AssignModalProps {
  onClose: () => void
  onAssign: (userId: string) => void
}

export function AssignModal({ onClose, onAssign }: AssignModalProps) {
  const [teamMembers] = useOrganizationData("recepto_team_members", generateInitialTeamMembers())
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedUser, setSelectedUser] = useState<string | null>(null)

  const filteredMembers = teamMembers.filter(
    (member) => member.role !== "Removed" && member.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="absolute left-1/2 top-1/2 z-10 w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-lg border bg-white shadow-lg">
      <div className="relative p-2">
        <Search className="absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          type="search"
          placeholder="Search"
          className="pl-8 pr-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="max-h-[200px] overflow-y-auto">
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            className="flex cursor-pointer items-center justify-between p-3 hover:bg-gray-50"
            onClick={() => setSelectedUser(member.id)}
          >
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-blue-100 text-blue-600">{member.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-sm">{member.name}</span>
            </div>

            {selectedUser === member.id && <Check className="h-4 w-4 text-blue-600" />}
          </div>
        ))}
      </div>

      <div className="flex justify-end border-t p-2">
        <Button
          variant="default"
          className="bg-blue-600 hover:bg-blue-700"
          disabled={!selectedUser}
          onClick={() => selectedUser && onAssign(selectedUser)}
        >
          Assign
        </Button>
      </div>
    </div>
  )
}
