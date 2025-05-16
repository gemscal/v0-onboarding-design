"use client"

import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, ChevronsUpDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface PreferencesStepProps {
  userData: {
    skills: string[]
    jobTypes: string[]
    industries: string[]
    salaryRange: string
    remotePreference: string
  }
  updateUserData: (data: Partial<typeof userData>) => void
}

const skillOptions = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "Java",
  "C#",
  "SQL",
  "NoSQL",
  "AWS",
  "Azure",
  "Docker",
  "Kubernetes",
  "UI/UX Design",
  "Product Management",
  "Agile",
  "Scrum",
  "DevOps",
  "Machine Learning",
  "Data Science",
  "Blockchain",
  "Marketing",
  "Sales",
]

const industryOptions = [
  "Technology",
  "Finance",
  "Healthcare",
  "Education",
  "E-commerce",
  "Media",
  "Entertainment",
  "Manufacturing",
  "Retail",
  "Transportation",
  "Energy",
  "Consulting",
  "Real Estate",
  "Hospitality",
  "Non-profit",
]

const jobTypeOptions = ["Full-time", "Part-time", "Contract", "Freelance", "Internship"]

export default function PreferencesStep({ userData, updateUserData }: PreferencesStepProps) {
  const [open, setOpen] = useState(false)
  const [industryOpen, setIndustryOpen] = useState(false)
  const [skillInput, setSkillInput] = useState("")

  const handleSkillSelect = (skill: string) => {
    if (!userData.skills.includes(skill)) {
      updateUserData({ skills: [...userData.skills, skill] })
    }
    setSkillInput("")
  }

  const handleRemoveSkill = (skill: string) => {
    updateUserData({
      skills: userData.skills.filter((s) => s !== skill),
    })
  }

  const handleJobTypeToggle = (jobType: string) => {
    if (userData.jobTypes.includes(jobType)) {
      updateUserData({
        jobTypes: userData.jobTypes.filter((t) => t !== jobType),
      })
    } else {
      updateUserData({ jobTypes: [...userData.jobTypes, jobType] })
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Job Preferences</h2>
        <p className="text-gray-500 mt-2">Help us understand what you're looking for in your next role</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <Label>Skills</Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
                {skillInput || "Select or type skills..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder="Search skills..." value={skillInput} onValueChange={setSkillInput} />
                <CommandList>
                  <CommandEmpty>No skill found. Type to add custom skill.</CommandEmpty>
                  <CommandGroup>
                    {skillOptions
                      .filter((skill) => skill.toLowerCase().includes(skillInput.toLowerCase()))
                      .map((skill) => (
                        <CommandItem key={skill} value={skill} onSelect={() => handleSkillSelect(skill)}>
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              userData.skills.includes(skill) ? "opacity-100" : "opacity-0",
                            )}
                          />
                          {skill}
                        </CommandItem>
                      ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          <div className="flex flex-wrap gap-2 mt-2">
            {userData.skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="px-3 py-1">
                {skill}
                <button onClick={() => handleRemoveSkill(skill)} className="ml-2 text-gray-500 hover:text-gray-700">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            {userData.skills.length === 0 && (
              <p className="text-sm text-gray-500">Add skills to help us find the right job matches</p>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <Label>Industries of Interest</Label>
          <Popover open={industryOpen} onOpenChange={setIndustryOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" role="combobox" aria-expanded={industryOpen} className="w-full justify-between">
                {userData.industries.length > 0 ? `${userData.industries.length} selected` : "Select industries..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder="Search industries..." />
                <CommandList>
                  <CommandEmpty>No industry found.</CommandEmpty>
                  <CommandGroup>
                    {industryOptions.map((industry) => (
                      <CommandItem
                        key={industry}
                        value={industry}
                        onSelect={() => {
                          const newIndustries = userData.industries.includes(industry)
                            ? userData.industries.filter((i) => i !== industry)
                            : [...userData.industries, industry]
                          updateUserData({ industries: newIndustries })
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            userData.industries.includes(industry) ? "opacity-100" : "opacity-0",
                          )}
                        />
                        {industry}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          <div className="flex flex-wrap gap-2 mt-2">
            {userData.industries.map((industry) => (
              <Badge key={industry} variant="secondary" className="px-3 py-1">
                {industry}
                <button
                  onClick={() => {
                    updateUserData({
                      industries: userData.industries.filter((i) => i !== industry),
                    })
                  }}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            {userData.industries.length === 0 && (
              <p className="text-sm text-gray-500">Select industries you're interested in working in</p>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <Label>Job Types</Label>
          <div className="flex flex-wrap gap-2">
            {jobTypeOptions.map((jobType) => (
              <Button
                key={jobType}
                type="button"
                variant={userData.jobTypes.includes(jobType) ? "default" : "outline"}
                className={userData.jobTypes.includes(jobType) ? "bg-emerald-500 hover:bg-emerald-600" : ""}
                onClick={() => handleJobTypeToggle(jobType)}
              >
                {jobType}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between">
            <Label>Salary Expectations</Label>
            <span className="text-sm font-medium">{userData.salaryRange || "$50,000 - $150,000+"}</span>
          </div>
          <Select value={userData.salaryRange} onValueChange={(value) => updateUserData({ salaryRange: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select salary range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="$30,000 - $50,000">$30,000 - $50,000</SelectItem>
              <SelectItem value="$50,000 - $80,000">$50,000 - $80,000</SelectItem>
              <SelectItem value="$80,000 - $120,000">$80,000 - $120,000</SelectItem>
              <SelectItem value="$120,000 - $150,000">$120,000 - $150,000</SelectItem>
              <SelectItem value="$150,000+">$150,000+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label>Remote Work Preference</Label>
          <Select
            value={userData.remotePreference}
            onValueChange={(value) => updateUserData({ remotePreference: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select remote work preference" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="remote-only">Remote Only</SelectItem>
              <SelectItem value="hybrid">Hybrid (Some Remote, Some Office)</SelectItem>
              <SelectItem value="office">In-Office</SelectItem>
              <SelectItem value="flexible">Flexible (No Preference)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
