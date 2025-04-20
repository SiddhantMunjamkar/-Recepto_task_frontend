"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

type User = {
  id: string
  name: string
  role: "Admin" | "Member" | "Removed"
  organization: string
  avatar: string
}

type AuthContextType = {
  isAuthenticated: boolean
  user: User | null
  login: (username: string, password: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
})

export function useAuth() {
  return useContext(AuthContext)
}

const USERS_KEY = "recepto_users"
const CURRENT_USER_KEY = "recepto_current_user"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Initialize default users if they don't exist
    if (!localStorage.getItem(USERS_KEY)) {
      const defaultUsers = [
        {
          id: "1",
          name: "Anand Kumar",
          role: "Admin",
          organization: "Company name",
          avatar: "/avatars/anand.jpg",
        },
        {
          id: "2",
          name: "Olivia Rhye",
          role: "Admin",
          organization: "Company name",
          avatar: "/avatars/olivia.jpg",
        },
        {
          id: "3",
          name: "John Smith",
          role: "Member",
          organization: "Company name",
          avatar: "/avatars/john.jpg",
        },
      ]
      localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers))
    }

    // Check if user is already logged in
    const currentUser = localStorage.getItem(CURRENT_USER_KEY)
    if (currentUser) {
      setUser(JSON.parse(currentUser))
      setIsAuthenticated(true)
    }
  }, [])

  const login = (username: string, password: string) => {
    // In a real app, you would validate credentials against a backend
    // For this demo, we'll just check if the username exists in our local storage
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]")
    const foundUser = users.find((u: User) => u.name.toLowerCase() === username.toLowerCase())

    if (foundUser) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(foundUser))
      setUser(foundUser)
      setIsAuthenticated(true)
    } else {
      alert("Invalid credentials")
    }
  }

  const logout = () => {
    localStorage.removeItem(CURRENT_USER_KEY)
    setUser(null)
    setIsAuthenticated(false)
  }

  return <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>{children}</AuthContext.Provider>
}
