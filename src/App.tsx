import { Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "./components/auth-provider"
import LoginPage from "./pages/login"
import DashboardLayout from "./layouts/dashboard-layout"
import LeadsPage from "./pages/leads"
import AnalyticsPage from "./pages/analytics"

function App() {
  const { isAuthenticated } = useAuth()

  return (
    <Routes>
      <Route path="/" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={isAuthenticated ? <DashboardLayout /> : <Navigate to="/" />}>
        <Route index element={<Navigate to="/dashboard/leads" replace />} />
        <Route path="leads" element={<LeadsPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
