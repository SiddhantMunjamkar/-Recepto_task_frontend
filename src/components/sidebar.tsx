"use client"

import { Link, useLocation } from "react-router-dom"
import { BarChart2, LogOut, User } from "lucide-react"
import { cn } from "../lib/utils"
import { LogoutModal } from "./logout-modal"
import { useState } from "react"

export function Sidebar() {
  const location = useLocation()
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  const isActive = (path: string) => {
    return location.pathname.includes(path)
  }

  return (
    <>
      <div className="flex h-screen w-[124px] flex-col  bg-white border border-gray-200 shadow-sm min-h-[60px]">
        <div className="flex h-16 items-center justify-center  border-gray-200 shadow-sm min-h-[60px]">
          <Link to="/dashboard">
            <div className="text-blue-600">
            <img src="/Recepto.png" alt="Recepto" className="w-[100px] h-auto" />
              {/* <svg width="100" height="24" viewBox="0 0 100 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M39.8 5.2H35L30.6 12.5L26.2 5.2H21.4L28.4 16.4V23H32.8V16.4L39.8 5.2Z" fill="currentColor" />
                <path d="M48.8 5.2H44.4V23H48.8V5.2Z" fill="currentColor" />
                <path d="M63.4 5.2H59V16.4L52 5.2H47.6V23H52V11.8L59 23H63.4V5.2Z" fill="currentColor" />
                <path d="M73.8 9.6H78.2V23H82.6V9.6H87V5.2H73.8V9.6Z" fill="currentColor" />
                <path
                  d="M97.4 19.4C96.2 19.4 95.2 18.4 95.2 17.2C95.2 16 96.2 15 97.4 15C98.6 15 99.6 16 99.6 17.2C99.6 18.4 98.6 19.4 97.4 19.4Z"
                  fill="currentColor"
                />
                <path d="M13.8 5.2H9.4V23H13.8V5.2Z" fill="currentColor" />
                <path d="M4.4 5.2H0V23H4.4V5.2Z" fill="currentColor" />
              </svg> */}
            </div>
          </Link>
        </div>

        <div className="mt-6 px-2 text-xs font-semibold text-gray-500">MAIN</div>

        <nav className="mt-2 flex flex-col gap-1 px-2">
          <Link
            to="/dashboard/leads"
            className={cn(
              "flex flex-col items-center rounded-md py-3 text-gray-500 hover:bg-gray-100",
              isActive("/leads") && "bg-blue-50 text-blue-600",
            )}
          >
            <User className="h-5 w-5" />
            <span className="mt-1 text-xs">Leads</span>
          </Link>

          <Link
            to="/dashboard/analytics"
            className={cn(
              "flex flex-col items-center rounded-md py-3 text-gray-500 hover:bg-gray-100",
              isActive("/analytics") && "bg-blue-50 text-blue-600",
            )}
          >
            <BarChart2 className="h-5 w-5" />
            <span className="mt-1 text-xs">Analytics</span>
          </Link>
        </nav>

        <div className="mt-6 px-2 text-xs font-semibold text-gray-500">MORE</div>

        <div className="mt-auto px-2 pb-4">
          <button
            onClick={() => setShowLogoutModal(true)}
            className="flex w-full flex-col items-center rounded-md py-3 text-gray-500 hover:bg-gray-100"
          >
            <LogOut className="h-5 w-5" />
            <span className="mt-1 text-xs">Logout</span>
          </button>
        </div>
      </div>

      {showLogoutModal && <LogoutModal onClose={() => setShowLogoutModal(false)} />}
    </>
  )
}
