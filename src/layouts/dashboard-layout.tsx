import { Outlet } from "react-router-dom"
import { Sidebar } from "../components/sidebar"
import { Header } from "../components/header"

export default function DashboardLayout() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 overflow-auto bg-gray-50 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
