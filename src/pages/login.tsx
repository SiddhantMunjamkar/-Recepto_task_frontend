"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { useAuth } from "../components/auth-provider"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const { isAuthenticated, login } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard")
    }
  }, [isAuthenticated, navigate])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    login(email, password)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 px-4">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="text-blue-600">
            <img src="/Recepto.png" alt="Recepto" className="w-[150px] h-auto" />
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
          </div>
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">LOGIN</h1>
          <p className="mt-2 text-sm text-gray-600">Sign in to your account</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <Label htmlFor="email-address" className="sr-only">
                Email address
              </Label>
              <Input
                id="email-address"
                name="email"
                type="text"
                autoComplete="email"
                required
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <Label htmlFor="password" className="sr-only">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
