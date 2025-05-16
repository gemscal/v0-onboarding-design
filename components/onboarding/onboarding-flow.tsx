"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import BasicInfoStep from "./steps/basic-info-step"
import ResumeStep from "./steps/resume-step"
import PreferencesStep from "./steps/preferences-step"
import OnboardingComplete from "./steps/onboarding-complete"

const steps = [
  { id: 1, name: "Basic Info" },
  { id: 2, name: "Resume" },
  { id: 3, name: "Preferences" },
]

export default function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(1)
  const [userData, setUserData] = useState({
    fullName: "",
    bio: "",
    jobTitle: "",
    location: "",
    resume: null,
    skills: [],
    jobTypes: [],
    industries: [],
    salaryRange: "",
    remotePreference: "",
  })

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    } else {
      setCurrentStep(steps.length + 1) // Complete
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSkip = () => {
    handleNext()
  }

  const updateUserData = (data: Partial<typeof userData>) => {
    setUserData({ ...userData, ...data })
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-12">
      <div className="flex justify-center mb-8">
        <img src="/placeholder.svg?height=60&width=180" alt="Sorra Logo" className="h-12" />
      </div>

      {currentStep <= steps.length && (
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {steps.map((step) => (
              <div key={step.id} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                    step.id < currentStep
                      ? "bg-emerald-500 border-emerald-500 text-white"
                      : step.id === currentStep
                        ? "border-emerald-500 text-emerald-500"
                        : "border-gray-300 text-gray-400"
                  }`}
                >
                  {step.id < currentStep ? <CheckCircle className="h-5 w-5" /> : step.id}
                </div>
                <span
                  className={`text-sm mt-2 ${
                    step.id <= currentStep ? "text-emerald-500 font-medium" : "text-gray-400"
                  }`}
                >
                  {step.name}
                </span>
              </div>
            ))}
          </div>
          <div className="relative mt-2">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 rounded-full" />
            <div
              className="absolute top-0 left-0 h-1 bg-emerald-500 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            />
          </div>
        </div>
      )}

      <Card className="w-full shadow-lg border-0">
        <CardContent className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentStep === 1 && <BasicInfoStep userData={userData} updateUserData={updateUserData} />}
              {currentStep === 2 && <ResumeStep userData={userData} updateUserData={updateUserData} />}
              {currentStep === 3 && <PreferencesStep userData={userData} updateUserData={updateUserData} />}
              {currentStep === 4 && <OnboardingComplete userData={userData} />}
            </motion.div>
          </AnimatePresence>

          {currentStep <= steps.length && (
            <div className="flex justify-between mt-8">
              <Button variant="outline" onClick={handleBack} disabled={currentStep === 1}>
                Back
              </Button>
              <div className="flex gap-3">
                {currentStep === 2 && (
                  <Button variant="ghost" onClick={handleSkip}>
                    Skip
                  </Button>
                )}
                <Button onClick={handleNext} className="bg-emerald-500 hover:bg-emerald-600">
                  {currentStep === steps.length ? "Complete" : "Continue"}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
