import { useAuth } from "./auth-provider"
import { Button } from "./ui/button"
import { useNavigate } from "react-router-dom"

interface LogoutModalProps {
  onClose: () => void
}

export function LogoutModal({ onClose }: LogoutModalProps) {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex flex-col items-left ">
          <img src="/Recepto.png" alt="Recepto Logo" className="w-[120px] mb-4 items-center" />

          <h2 className="text-2xl font-semibold mb-1">Log out ?</h2>
          <p className="text-gray-500 text-sm mb-6">You’d have to login again to the platform.</p>

          <div className="flex w-full flex-col gap-2">
            <Button
              onClick={handleLogout}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 text-sm"
            >
              Logout
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 rounded-lg py-2 text-sm"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
