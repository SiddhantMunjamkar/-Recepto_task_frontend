// Header.tsx
import { useAuth } from "./auth-provider";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ChevronDown, Users } from "lucide-react";
import { useLocalStorage } from "../lib/hooks";

export function Header({ setSearchQuery, setAppliedFilters, appliedFilters }: any) {
  const { user } = useAuth();
  const [credits] = useLocalStorage("recepto_credits", 0);
  // const location = useLocation();
  // const isLeadsPage = location.pathname === "/dashboard/leads"; // Adjust path if needed

  return (
    <header className="flex items-center justify-between bg-white px-6 py-3 border border-gray-200 shadow-sm min-h-[60px]">
      {/* Left side: Company + Invite */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="rounded-md bg-blue-100 p-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 text-blue-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5v7.125c0 .621.504 1.125 1.125 1.125h13.75c.621 0 1.125-.504 1.125-1.125V10.5m-16 0L12 3l7.5 7.5m-16 0h16" />
            </svg>
          </div>
          <span className="text-sm font-medium text-gray-800">Company name</span>
        </div>

        <Button variant="outline" size="sm" className="border border-blue-600 text-blue-600 hover:bg-blue-50">
          <Users className="mr-1 h-4 w-4" />
          Invite
        </Button>
      </div>

      {/* Middle: Search bar for Leads
      {isLeadsPage && (
        <div className="flex flex-1 justify-center px-8">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search leads..."
              className="w-full rounded-lg border border-gray-200 bg-white px-10 py-2 text-sm shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      )} */}

      {/* Right side: Credits + Filters (if Leads) + Profile */}
      <div className="flex items-center gap-4">
        <Button variant="default" size="sm" className="bg-blue-600 text-white hover:bg-blue-700 text-sm font-semibold">
          <span className="mr-2"></span> {credits} credits
        </Button>

        {/* {isLeadsPage && (
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 rounded-lg border-gray-200 text-sm"
            onClick={() => setAppliedFilters([...appliedFilters, "new filter"])} // Add filter handling logic
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        )} */}

        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
            <AvatarFallback className="bg-blue-100 text-blue-600">
              {user?.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-medium">{user?.name}</span>
            <span className="text-xs text-green-500 font-medium">{user?.role}</span>
          </div>
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </div>
      </div>
    </header>
  );
}
