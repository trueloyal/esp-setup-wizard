"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useParams, useSearchParams, usePathname } from "next/navigation"
import Image from "next/image"
import { ESPS, type Step, type NextStep } from "@/lib/esps"

function CodeBlock({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false)

  function copy() {
    navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="mt-3 rounded-lg overflow-hidden border border-gray-200">
      <div className="flex items-center justify-between px-3 py-1.5 bg-gray-100 border-b border-gray-200">
        <span className="text-xs text-gray-500 font-medium">{label}</span>
        <button
          onClick={copy}
          className="text-xs text-gray-500 hover:text-[#001e45] transition-colors font-medium print:hidden"
        >
          {copied ? "Copied ✓" : "Copy"}
        </button>
      </div>
      <pre className="px-4 py-3 text-sm text-gray-800 bg-gray-50 overflow-x-auto font-mono whitespace-pre-wrap">
        {value}
      </pre>
    </div>
  )
}

function StepCard({
  step,
  isActive,
  isComplete,
  onComplete,
  printMode,
  stepUrl,
}: {
  step: Step
  isActive: boolean
  isComplete: boolean
  onComplete: () => void
  printMode: boolean
  stepUrl: string
}) {
  const [linkCopied, setLinkCopied] = useState(false)
  const showContent = isActive || isComplete || printMode

  function copyLink() {
    navigator.clipboard.writeText(stepUrl)
    setLinkCopied(true)
    setTimeout(() => setLinkCopied(false), 2000)
  }

  return (
    <div
      className={`rounded-xl border-2 transition-all ${
        printMode
          ? "border-gray-200 bg-white"
          : isComplete
          ? "border-[#f8b4c3] bg-[#f8b4c3]/10"
          : isActive
          ? "border-[#001e45] bg-white shadow-sm"
          : "border-gray-100 bg-white opacity-60"
      }`}
    >
      <div className="p-5">
        <div className="flex items-start gap-4">
          <div
            className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-semibold ${
              !printMode && isComplete
                ? "bg-[#f8b4c3] text-[#001e45]"
                : isActive || printMode
                ? "bg-[#001e45] text-white"
                : "bg-gray-100 text-gray-400"
            }`}
          >
            {!printMode && isComplete ? "✓" : step.id}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-medium text-[#001e45]">{step.title}</h3>
              {isActive && !printMode && (
                <button
                  onClick={copyLink}
                  className="flex-shrink-0 flex items-center gap-1 text-xs text-gray-400 hover:text-[#001e45] transition-colors print:hidden"
                  title="Copy link to this step"
                >
                  {linkCopied ? (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5 text-green-500">
                        <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                      </svg>
                      <span className="text-green-500">Copied</span>
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
                        <path d="M7.628 1.099a.75.75 0 0 1 .744 0l2.546 1.474A.75.75 0 1 1 10.173 3.9L8 2.653 5.827 3.9a.75.75 0 1 1-.745-1.327L7.628 1.1ZM3.75 5.5A.75.75 0 0 1 4.5 6.25v5.5h7v-5.5a.75.75 0 0 1 1.5 0V12a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1V6.25A.75.75 0 0 1 3.75 5.5Z" />
                      </svg>
                      <span>Copy link</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {showContent && (
              <>
                <p className="mt-1.5 text-sm text-gray-600 leading-relaxed">{step.body}</p>

                {step.image && (
                  <div className="mt-4 rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-auto object-contain max-h-72 print:max-h-none"
                    />
                  </div>
                )}

                {step.codeBlocks?.map((block) => (
                  <CodeBlock key={block.label} label={block.label} value={block.value} />
                ))}

                {step.tip && (
                  <div className="mt-3 flex items-start gap-2 p-3 rounded-lg bg-[#f8b4c3]/20 border border-[#f8b4c3]/40">
                    <span className="text-sm mt-0.5">💡</span>
                    <p className="text-[#001e45] text-sm">{step.tip}</p>
                  </div>
                )}

                {step.action && (
                  <a
                    href={step.action.href || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-sm text-[#001e45] font-medium hover:underline"
                  >
                    {step.action.label} →
                  </a>
                )}

                {isActive && !isComplete && !printMode && (
                  <button
                    onClick={onComplete}
                    className="mt-4 px-4 py-2 bg-[#001e45] text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity print:hidden"
                  >
                    Mark complete & continue →
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function ProviderPageContent() {
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()
  const searchParams = useSearchParams()

  const providerId = params.provider as string
  const esp = ESPS.find((e) => e.id === providerId)

  const initialStep = (() => {
    const s = parseInt(searchParams.get("step") ?? "1", 10)
    return isNaN(s) ? 0 : Math.max(0, s - 1)
  })()

  const [currentStep, setCurrentStep] = useState(initialStep)
  const [done, setDone] = useState(false)
  const [printMode, setPrintMode] = useState(false)

  useEffect(() => {
    if (printMode) {
      window.print()
      setPrintMode(false)
    }
  }, [printMode])

  if (!esp) return null

  const totalSteps = esp.steps.length

  function advance() {
    if (currentStep < totalSteps - 1) {
      const next = currentStep + 1
      setCurrentStep(next)
      router.replace(pathname + "?step=" + (next + 1))
    } else {
      setDone(true)
    }
  }

  function stepUrl(idx: number) {
    return window.location.origin + pathname + "?step=" + (idx + 1)
  }

  if (done) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <header className="bg-[#001e45] px-6 py-4 print:hidden">
          <Image src="/trueloyal-logo.png" alt="TrueLoyal" width={160} height={48} priority className="h-10 w-auto" />
        </header>

        <div className="flex-1 px-4 py-12">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <div className="w-16 h-16 rounded-full bg-[#f8b4c3] flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-[#001e45]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-2xl font-semibold text-[#001e45]">{esp.name} connected</h1>
              <p className="mt-2 text-gray-500 text-sm max-w-sm mx-auto">
                Your ESP is connected to TrueLoyal. Before going live, send a test event to confirm everything is working.
              </p>
            </div>

            {esp.whatNext && esp.whatNext.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-[#001e45] mb-4">What&apos;s next?</h2>
                <div className="space-y-3">
                  {esp.whatNext.map((item: NextStep, idx: number) => (
                    <div key={idx} className="bg-white rounded-xl border-2 border-gray-100 p-5">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#f8b4c3]/40 flex items-center justify-center text-sm font-semibold text-[#001e45]">
                          {idx + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-[#001e45]">{item.title}</h3>
                          <p className="mt-1 text-sm text-gray-600 leading-relaxed">{item.body}</p>
                          {item.action && (
                            <a href={item.action.href} target="_blank" rel="noopener noreferrer" className="inline-block mt-2 text-sm text-[#001e45] font-medium hover:underline">
                              {item.action.label} →
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 flex flex-col sm:flex-row gap-3 print:hidden">
              <button
                onClick={() => router.push("/")}
                className="flex-1 py-2.5 px-4 bg-[#001e45] text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity text-center"
              >
                Connect another provider
              </button>
              <a
                href="https://app.trueloyal.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-4 border border-gray-200 rounded-lg text-sm font-medium text-[#001e45] hover:bg-gray-50 transition-colors text-center"
              >
                Open TrueLoyal Admin
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-[#001e45] px-6 py-4 print:hidden">
        <Image src="/trueloyal-logo.png" alt="TrueLoyal" width={160} height={48} priority className="h-10 w-auto" />
      </header>

      <div className="flex-1 px-4 py-12 print:py-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6 print:mb-4">
            <div className="flex items-center justify-between print:hidden">
              <button
                onClick={() => router.push("/")}
                className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
              >
                ← All providers
              </button>
              <button
                onClick={() => setPrintMode(true)}
                className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-[#001e45] transition-colors"
                title="Print or save as PDF"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M4 2a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2h.5A2.5 2.5 0 0 1 15 6.5v4a1.5 1.5 0 0 1-1.5 1.5H13v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-1h-.5A1.5 1.5 0 0 1 1 10.5v-4A2.5 2.5 0 0 1 3.5 4H4V2Zm2 2h4V2.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5V4Zm-2 5.5v2h8v-2H4Z" clipRule="evenodd" />
                </svg>
                Print / Save PDF
              </button>
            </div>

            <div className="mt-3 flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl ${esp.logoBg} flex items-center justify-center flex-shrink-0 p-2.5`}>
                <Image src={esp.logo} alt={esp.name} width={32} height={32} className="w-full h-full object-contain" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-[#001e45]">{esp.name} setup</h1>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mb-6 print:hidden">
            <div className="flex justify-between text-xs text-gray-400 mb-1.5">
              <span>Step {Math.min(currentStep + 1, totalSteps)} of {totalSteps}</span>
              <span>{Math.round((currentStep / totalSteps) * 100)}% complete</span>
            </div>
            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#f8b4c3] rounded-full transition-all duration-500"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-3">
            {esp.steps.map((step, idx) => (
              <StepCard
                key={step.id}
                step={step}
                isActive={idx === currentStep}
                isComplete={idx < currentStep}
                onComplete={advance}
                printMode={printMode}
                stepUrl={typeof window !== "undefined" ? stepUrl(idx) : ""}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProviderClient() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
      <ProviderPageContent />
    </Suspense>
  )
}
