import { useState } from "react";
import { useOrganizationData } from "../lib/hooks";
import { type Lead, generateInitialLeads } from "../lib/data";
import { LeadsList } from "../components/leads-list";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Search, X } from "lucide-react";
import { FilterModal } from "../components/filter-modal";

export default function LeadsPage() {
  const [leads, setLeads] = useOrganizationData<Lead[]>(
    "recepto_leads",
    generateInitialLeads()
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<string[]>([]);

  const filteredLeads = leads.filter((lead) => {
    if (!searchQuery) {
      return true;
    }
    const query = searchQuery.toLowerCase();
    return (
      lead.name?.toLowerCase().includes(query) ||
      lead.message.toLowerCase().includes(query) ||
      lead.location.toLowerCase().includes(query)
    );
  });

  return (
    <div className="container mx-auto">
      <div className="mb-4 flex items-center justify-between ">
        <div className="flex items-center ">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 " />
            <Input
              type="search"
              placeholder="What is the best tool for XYZ.XYZ..."
              className="w-[300px] pl-9 pr-8  border border-gray-200 shadow-sm min-h-[40px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                onClick={() => setSearchQuery("")}
              >
                {/* <X className="h-4 w-4" /> */}
              </button>
            )}
          </div>
        </div>

        <Button
          variant="outline"
          className="flex items-center gap-2  border border-gray-200 shadow-sm min-h-[40px]"
          onClick={() => setShowFilters(true)}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 4H14M4 8H12M6 12H10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Filters
          {appliedFilters.length > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-xs text-blue-600">
              {appliedFilters.length}
            </span>
          )}
        </Button>
      </div>

      <LeadsList leads={filteredLeads} />

      {showFilters && (
        <FilterModal
          onClose={() => setShowFilters(false)}
          appliedFilters={appliedFilters}
          setAppliedFilters={setAppliedFilters}
        />
      )}
    </div>
  );
}
