

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { TeamMemberRow } from "../components/team-member-row"
import { generateInitialTeamMembers, generateChartData } from "../lib/data"
import { useOrganizationData } from "../lib/hooks"
import { AnalyticsChart } from "../components/analytics-chart"
import { EditTeamMemberModal } from "../components/edit-team-member-modal"

export default function AnalyticsPage() {
  const [teamMembers, setTeamMembers] = useOrganizationData("recepto_team_members", generateInitialTeamMembers())
  const [chartData] = useState(generateChartData())
  const [editMember, setEditMember] = useState<string | null>(null)
  const [showActions, setShowActions] = useState<string | null>(null)

  const handleRemoveFromTeam = (memberId: string) => {
    setTeamMembers(teamMembers.map((member) => (member.id === memberId ? { ...member, role: "Removed" } : member)))
  }

  const handleManageRole = (memberId: string) => {
    setEditMember(memberId)
  }

  const memberToEdit = teamMembers.find((m) => m.id === editMember)

  return (
    <div className="container mx-auto ">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 ">
        <Card className="border border-gray-200 shadow-sm min-h-[60px]">
          <CardHeader className="flex flex-row items-center pb-2 ">
            <div className="flex items-center gap-2 text-blue-600">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 22C16 18 20 14.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 14.4183 8 18 12 22Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <CardTitle className="ml-2">ReceptoNet Leads</CardTitle>
            <svg
              className="ml-1 h-4 w-4 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 16V16.01"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="mb-2 text-3xl font-bold">404</div>
            <div className="mb-4 text-xs text-gray-500">Total</div>

            <div className="h-[200px] w-full">
              <AnalyticsChart data={chartData.receptoNetData} color="#3b82f6" />
            </div>

            <div className="mt-4 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                <span>Unlocked</span>
                <span className="font-medium">179 users</span>
              </div>

              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-gray-300"></div>
                <span>Yet to Unlock</span>
                <span className="font-medium">394 users</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <Card className="border border-gray-200 shadow-sm min-h-[60px]">
            <CardContent className="flex items-center justify-between p-6">
              <div className="flex items-center gap-4">
                <div className="text-blue-600">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7 11L12 6L17 11M12 18V7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Liked Leads</div>
                  <div className="text-4xl font-bold">23.4K</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 shadow-sm min-h-[60px]">
            <CardContent className="flex items-center justify-between p-6">
              <div className="flex items-center gap-4">
                <div className="text-green-600">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M17 20H22V18C22 16.3431 20.6569 15 19 15C18.0444 15 17.1931 15.4468 16.6438 16.1429M17 20H7M17 20V18C17 17.3438 16.8736 16.717 16.6438 16.1429M7 20H2V18C2 16.3431 3.34315 15 5 15C5.95561 15 6.80686 15.4468 7.35625 16.1429M7 20V18C7 17.3438 7.12642 16.717 7.35625 16.1429M7.35625 16.1429C8.0935 14.301 9.89482 13 12 13C14.1052 13 15.9065 14.301 16.6438 16.1429M15 7C15 8.65685 13.6569 10 12 10C10.3431 10 9 8.65685 9 7C9 5.34315 10.3431 4 12 4C13.6569 4 15 5.34315 15 7ZM21 10C21 11.1046 20.1046 12 19 12C17.8954 12 17 11.1046 17 10C17 8.89543 17.8954 8 19 8C20.1046 8 21 8.89543 21 10ZM7 10C7 11.1046 6.10457 12 5 12C3.89543 12 3 11.1046 3 10C3 8.89543 3.89543 8 5 8C6.10457 8 7 8.89543 7 10Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Assigned Leads</div>
                  <div className="text-4xl font-bold">23.4K</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border border-gray-200 shadow-sm min-h-[60px]">
          <CardHeader className="flex flex-row items-center pb-2">
            <div className="flex items-center gap-2 text-blue-600">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9 19V13C9 11.8954 8.10457 11 7 11H5C3.89543 11 3 11.8954 3 13V19C3 20.1046 3.89543 21 5 21H7C8.10457 21 9 20.1046 9 19ZM9 19V9C9 7.89543 9.89543 7 11 7H13C14.1046 7 15 7.89543 15 9V19M9 19C9 20.1046 9.89543 21 11 21H13C14.1046 21 15 20.1046 15 19M15 19V5C15 3.89543 15.8954 3 17 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H17C15.8954 21 15 20.1046 15 19Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <CardTitle className="ml-2">Org Network Leads</CardTitle>
            <svg
              className="ml-1 h-4 w-4 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 16V16.01"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="mb-2 text-3xl font-bold">594</div>
            <div className="mb-4 text-xs text-gray-500">Total</div>

            <div className="h-[200px] w-full">
              <AnalyticsChart data={chartData.orgNetworkData} color="#f97316" />
            </div>

            <div className="mt-4 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                <span>Contacted</span>
                <span className="font-medium">179 users</span>
              </div>

              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-gray-300"></div>
                <span>Yet to Contact</span>
                <span className="font-medium">394 users</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-6">
          <Card className="border border-gray-200 shadow-sm min-h-[60px]">
            <CardContent className="flex items-center justify-between p-6">
              <div className="flex items-center gap-4">
                <div className="text-blue-600">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7 11L12 6L17 11M12 18V7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Liked Leads</div>
                  <div className="text-4xl font-bold">23.4K</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 shadow-sm min-h-[60px]">
            <CardContent className="flex items-center justify-between p-6">
              <div className="flex items-center gap-4">
                <div className="text-green-600">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M17 20H22V18C22 16.3431 20.6569 15 19 15C18.0444 15 17.1931 15.4468 16.6438 16.1429M17 20H7M17 20V18C17 17.3438 16.8736 16.717 16.6438 16.1429M7 20H2V18C2 16.3431 3.34315 15 5 15C5.95561 15 6.80686 15.4468 7.35625 16.1429M7 20V18C7 17.3438 7.12642 16.717 7.35625 16.1429M7.35625 16.1429C8.0935 14.301 9.89482 13 12 13C14.1052 13 15.9065 14.301 16.6438 16.1429M15 7C15 8.65685 13.6569 10 12 10C10.3431 10 9 8.65685 9 7C9 5.34315 10.3431 4 12 4C13.6569 4 15 5.34315 15 7ZM21 10C21 11.1046 20.1046 12 19 12C17.8954 12 17 11.1046 17 10C17 8.89543 17.8954 8 19 8C20.1046 8 21 8.89543 21 10ZM7 10C7 11.1046 6.10457 12 5 12C3.89543 12 3 11.1046 3 10C3 8.89543 3.89543 8 5 8C6.10457 8 7 8.89543 7 10Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Assigned Leads</div>
                  <div className="text-4xl font-bold">23.4K</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="mt-6 border border-gray-200 shadow-sm min-h-[60px]">
        <CardContent className="p-0">
          <div className="grid grid-cols-5 border-b p-4 text-sm font-medium text-gray-500">
            <div className="col-span-1">Team</div>
            <div className="col-span-1 flex items-center">
              Role
              <svg
                className="ml-1 h-4 w-4 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 16V16.01"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="col-span-1 flex items-center">
              Generated
              <svg
                className="ml-1 h-4 w-4 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 16V16.01"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="col-span-1 flex items-center">
              Unlocked
              <svg
                className="ml-1 h-4 w-4 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 16V16.01"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="col-span-1 flex items-center">
              Assigned
              <svg
                className="ml-1 h-4 w-4 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 16V16.01"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {teamMembers.map((member) => (
            <TeamMemberRow
              key={member.id}
              member={member}
              showActions={showActions === member.id}
              onToggleActions={() => setShowActions(showActions === member.id ? null : member.id)}
              onManageRole={() => handleManageRole(member.id)}
              onRemoveFromTeam={() => handleRemoveFromTeam(member.id)}
            />
          ))}

          <div className="flex items-center justify-between border-t p-4">
            <Button variant="outline" className="flex items-center gap-1">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M19 12H5M5 12L12 19M5 12L12 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Previous
            </Button>

            <div className="flex items-center gap-1 ">
              <Button variant="outline" className="h-8 w-8 p-0  border-none ">
                1
              </Button>
              <Button variant="outline" className="h-8 w-8 p-0  border-none">
                2
              </Button>
              <span className="px-1">...</span>
              <Button variant="outline" className="h-8 w-8 p-0  border-none">
                6
              </Button>
              <Button variant="outline" className="h-8 w-8 p-0  border-none">
                7
              </Button>
            </div>

            <Button variant="outline" className="flex items-center gap-1">
              Next
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
          </div>
        </CardContent>
      </Card>

      {memberToEdit && (
        <EditTeamMemberModal
          member={memberToEdit}
          onClose={() => setEditMember(null)}
          onSave={(updatedMember) => {
            setTeamMembers(teamMembers.map((m) => (m.id === updatedMember.id ? updatedMember : m)))
            setEditMember(null)
          }}
        />
      )}
    </div>
  )
}
