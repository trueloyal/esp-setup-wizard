"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { ESPS } from "@/lib/esps"

export default function Home() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-[#001e45] px-6 py-4">
        <Image
          src="/trueloyal-logo.png"
          alt="TrueLoyal"
          width={160}
          height={48}
          priority
          className="h-10 w-auto"
        />
      </header>

      <div className="flex-1 px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 text-center">
            <div className="inline-block bg-[#001e45] rounded-2xl px-8 py-5 mb-6">
              <Image
                src="/trueloyal-logo.png"
                alt="TrueLoyal"
                width={220}
                height={66}
                priority
                className="h-16 w-auto"
              />
            </div>
            <h1 className="text-2xl font-semibold text-[#001e45]">
              Email Integration Setup Guide
            </h1>
            <p className="mt-3 text-gray-500 text-sm max-w-lg mx-auto leading-relaxed">
              Connect your email service provider to TrueLoyal to automate loyalty emails — enrollment confirmations, points updates, rewards notifications, and more.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ESPS.map((esp) => (
              <button
                key={esp.id}
                onClick={() => router.push(`/${esp.id}`)}
                className="text-left p-5 rounded-xl border-2 border-gray-100 bg-white hover:border-[#f8b4c3] hover:shadow-sm transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-xl ${esp.logoBg} flex items-center justify-center p-2.5`}>
                    <Image
                      src={esp.logo}
                      alt={esp.name}
                      width={32}
                      height={32}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <div className="font-medium text-[#001e45]">{esp.name}</div>
                    <div className="text-sm text-gray-500 mt-0.5">{esp.description}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <footer className="text-center py-6 text-xs text-gray-400">
        Need help? Contact your TrueLoyal onboarding manager.
      </footer>
    </div>
  )
}
