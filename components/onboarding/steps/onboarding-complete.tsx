"use client"

import { CheckCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface OnboardingCompleteProps {
  userData: {
    fullName: string
    bio: string
    jobTitle: string
    location: string
    resume: any
    skills: string[]
    jobTypes: string[]
    industries: string[]
    salaryRange: string
    remotePreference: string
  }
}

export default function OnboardingComplete({ userData }: OnboardingCompleteProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="flex justify-center mb-4">
          <div className="rounded-full bg-emerald-100 p-3">
            <CheckCircle className="h-12 w-12 text-emerald-500" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">You're all set!</h2>
        <p className="text-gray-500 mt-2">
          Your profile is ready and Sorra's AI is now finding your perfect job matches
        </p>
      </div>

      <Card className="bg-emerald-50 border-emerald-100">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="rounded-full bg-emerald-500 text-white w-12 h-12 flex items-center justify-center font-bold text-xl">
              {userData.fullName
                .split(" ")
                .map((name) => name[0])
                .join("")
                .toUpperCase()}
            </div>
            <div>
              <h3 className="font-bold text-lg">{userData.fullName || "Your Name"}</h3>
              <p className="text-gray-600">{userData.jobTitle || "Your Job Title"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Profile Summary</h3>

        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-medium text-gray-500">Location</h4>
            <p>{userData.location || "Not specified"}</p>
          </div>

          {userData.skills.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-500">Skills</h4>
              <div className="flex flex-wrap gap-2 mt-1">
                {userData.skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {userData.jobTypes.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-500">Job Types</h4>
              <div className="flex flex-wrap gap-2 mt-1">
                {userData.jobTypes.map((type) => (
                  <Badge key={type} variant="outline">
                    {type}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {userData.industries.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-500">Industries</h4>
              <div className="flex flex-wrap gap-2 mt-1">
                {userData.industries.map((industry) => (
                  <Badge key={industry} variant="outline">
                    {industry}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {userData.resume && (
            <div>
              <h4 className="text-sm font-medium text-gray-500">Resume</h4>
              <p className="text-emerald-600">✓ Uploaded</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
        <h3 className="font-medium text-blue-800">What's next?</h3>
        <ul className="mt-2 space-y-2">
          <li className="flex items-start">
            <span className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs mr-2">
              1
            </span>
            <span>Our AI is analyzing your profile to find the best job matches</span>
          </li>
          <li className="flex items-start">
            <span className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs mr-2">
              2
            </span>
            <span>You'll receive personalized job recommendations within 24 hours</span>
          </li>
          <li className="flex items-start">
            <span className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs mr-2">
              3
            </span>
            <span>Complete your profile anytime to improve your matches</span>
          </li>
        </ul>
      </div>

      <div className="flex justify-center pt-4">
        <Button
          size="lg"
          className="bg-emerald-500 hover:bg-emerald-600"
          onClick={() => (window.location.href = "/dashboard")}
        >
          Go to Dashboard
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
