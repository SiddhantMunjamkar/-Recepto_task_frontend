

import { useState } from "react"
import type { Lead } from "../lib/data"
import { LeadCard } from "./lead-card"
import { useOrganizationData, useLocalStorage } from "../lib/hooks"

interface LeadsListProps {
  leads: Lead[]
}

export function LeadsList({ leads }: LeadsListProps) {
  const [allLeads, setAllLeads] = useOrganizationData<Lead[]>("recepto_leads", [])
  const [credits, setCredits] = useLocalStorage("recepto_credits", 0)
  const [showAssignModal, setShowAssignModal] = useState<string | null>(null)

  const handleUnlock = (id: string) => {
    const lead = allLeads.find((l) => l.id === id)
    if (!lead) return

    if (credits < lead.credits) {
      alert("Not enough credits!")
      return
    }

    setCredits((prev) => prev - lead.credits)

    setAllLeads(allLeads.map((l) => (l.id === id ? { ...l, isUnlocked: true } : l)))
  }

  const handleLike = (id: string) => {
    setAllLeads(allLeads.map((l) => (l.id === id ? { ...l, isLiked: true, isDisliked: false } : l)))
  }

  const handleDislike = (id: string) => {
    setAllLeads(allLeads.map((l) => (l.id === id ? { ...l, isLiked: false, isDisliked: true } : l)))
  }

  const handleAssign = (id: string) => {
    setShowAssignModal(id)
  }

  const handleAssignTo = (leadId: string, userId: string) => {
    setAllLeads(allLeads.map((l) => (l.id === leadId ? { ...l, assignedTo: userId } : l)))
    setShowAssignModal(null)
  }

  return (
    <div className="space-y-4">
      {leads.map((lead) => (
        <LeadCard
          key={lead.id}
          lead={lead}
          onUnlock={handleUnlock}
          onLike={handleLike}
          onDislike={handleDislike}
          onAssign={handleAssign}
          showAssignModal={showAssignModal === lead.id}
          onAssignTo={handleAssignTo}
          onCloseAssignModal={() => setShowAssignModal(null)}
        />
      ))}
    </div>
  )
}
