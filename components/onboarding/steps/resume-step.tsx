"use client"

import type React from "react"

import { useState } from "react"
import { Upload, FileText, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface ResumeStepProps {
  userData: {
    resume: any
  }
  updateUserData: (data: Partial<{ resume: any }>) => void
}

export default function ResumeStep({ userData, updateUserData }: ResumeStepProps) {
  const [dragActive, setDragActive] = useState(false)
  const [fileError, setFileError] = useState("")
  const [fileName, setFileName] = useState("")

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file: File) => {
    setFileError("")

    // Check file type
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]
    if (!validTypes.includes(file.type)) {
      setFileError("Please upload a PDF or Word document")
      return
    }

    // Check file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setFileError("File size must be less than 5MB")
      return
    }

    setFileName(file.name)
    updateUserData({ resume: file })
  }

  const removeFile = () => {
    setFileName("")
    updateUserData({ resume: null })
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Upload your resume</h2>
        <p className="text-gray-500 mt-2">
          This step is optional, but a resume helps us match you with better opportunities
        </p>
      </div>

      {!fileName ? (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center ${
            dragActive ? "border-emerald-500 bg-emerald-50" : "border-gray-300"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="p-3 rounded-full bg-emerald-50">
              <Upload className="h-8 w-8 text-emerald-500" />
            </div>
            <div>
              <p className="text-lg font-medium">Drag and drop your resume here</p>
              <p className="text-sm text-gray-500 mt-1">Supports PDF, DOC, DOCX (Max 5MB)</p>
            </div>
            <div className="flex items-center">
              <span className="text-gray-400 mx-2">or</span>
            </div>
            <Label htmlFor="resume-upload" className="cursor-pointer">
              <Button variant="outline" type="button">
                Browse files
              </Button>
              <input
                id="resume-upload"
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx"
                onChange={handleChange}
              />
            </Label>
          </div>
        </div>
      ) : (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Resume uploaded</CardTitle>
            <CardDescription>Your resume is ready for AI analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg">
              <FileText className="h-8 w-8 text-emerald-500" />
              <div className="flex-1 truncate">
                <p className="font-medium">{fileName}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" onClick={removeFile} className="ml-auto">
              Remove
            </Button>
          </CardFooter>
        </Card>
      )}

      {fileError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{fileError}</AlertDescription>
        </Alert>
      )}

      <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-amber-500" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-amber-800">Why upload a resume?</h3>
            <div className="mt-2 text-sm text-amber-700">
              <p>Sorra's AI will analyze your resume to:</p>
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>Extract your skills and experience</li>
                <li>Suggest job matches based on your background</li>
                <li>Highlight your strengths to potential employers</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
