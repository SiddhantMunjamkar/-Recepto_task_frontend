import { useState } from "react"
import type { TeamMember } from "../lib/data"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

interface EditTeamMemberModalProps {
  member: TeamMember
  onClose: () => void
  onSave: (updatedMember: TeamMember) => void
}

export function EditTeamMemberModal({ member, onClose, onSave }: EditTeamMemberModalProps) {
  const [role, setRole] = useState(member.role)

  const handleSave = () => {
    onSave({
      ...member,
      role: role, // Use selected role
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white shadow-lg">
        <div className="p-6">
          <div className="mb-4 flex items-center justify-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M17 20H22V18C22 16.3431 20.6569 15 19 15C18.0444 15 17.1931 15.4468 16.6438 16.1429M17 20H7M17 20V18C17 17.3438 16.8736 16.717 16.6438 16.1429M7 20H2V18C2 16.3431 3.34315 15 5 15C5.95561 15 6.80686 15.4468 7.35625 16.1429M7 20V18C7 17.3438 7.12642 16.717 7.35625 16.1429M7.35625 16.1429C8.0935 14.301 9.89482 13 12 13C14.1052 13 15.9065 14.301 16.6438 16.1429M15 7C15 8.65685 13.6569 10 12 10C10.3431 10 9 8.65685 9 7C9 5.34315 10.3431 4 12 4C13.6569 4 15 5.34315 15 7ZM21 10C21 11.1046 20.1046 12 19 12C17.8954 12 17 11.1046 17 10C17 8.89543 17.8954 8 19 8C20.1046 8 21 8.89543 21 10ZM7 10C7 11.1046 6.10457 12 5 12C3.89543 12 3 11.1046 3 10C3 8.89543 3.89543 8 5 8C6.10457 8 7 8.89543 7 10Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <h2 className="mb-1 text-center text-xl font-semibold">Edit Team Member</h2>
          <p className="mb-6 text-center text-sm text-gray-500">Make changes to team member information</p>

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium">
                Email Address
              </label>
              <Input id="email" type="email" placeholder="colleague@company.com" defaultValue={member.email} />
            </div>

            <div>
              <label htmlFor="role" className="mb-1 block text-sm font-medium">
                Role
              </label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-md z-50">
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Member">Member</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-6 flex justify-between gap-2">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Cancel
            </Button>
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={handleSave}>
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
