"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface BasicInfoStepProps {
  userData: {
    fullName: string
    bio: string
    jobTitle: string
    location: string
  }
  updateUserData: (data: Partial<typeof userData>) => void
}

export default function BasicInfoStep({ userData, updateUserData }: BasicInfoStepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (field: string, value: string) => {
    updateUserData({ [field]: value })

    // Clear error when user types
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" })
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Tell us about yourself</h2>
        <p className="text-gray-500 mt-2">Let's start with some basic information to set up your profile</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            placeholder="Enter your full name"
            value={userData.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            className={errors.fullName ? "border-red-500" : ""}
          />
          {errors.fullName && <p className="text-sm text-red-500">{errors.fullName}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="jobTitle">Current Job Title</Label>
          <Input
            id="jobTitle"
            placeholder="e.g. Software Engineer, Product Manager"
            value={userData.jobTitle}
            onChange={(e) => handleChange("jobTitle", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Select value={userData.location} onValueChange={(value) => handleChange("location", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select your location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="remote">Remote</SelectItem>
              <SelectItem value="new-york">New York, USA</SelectItem>
              <SelectItem value="san-francisco">San Francisco, USA</SelectItem>
              <SelectItem value="london">London, UK</SelectItem>
              <SelectItem value="berlin">Berlin, Germany</SelectItem>
              <SelectItem value="singapore">Singapore</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Professional Bio</Label>
          <Textarea
            id="bio"
            placeholder="Tell us a bit about your professional background and interests"
            value={userData.bio}
            onChange={(e) => handleChange("bio", e.target.value)}
            rows={4}
          />
          <p className="text-xs text-gray-500">This will help us match you with the right opportunities</p>
        </div>
      </div>
    </div>
  )
}
