"use client"

import { useParams } from "next/navigation"
import { CollegeEditor } from "@/components/college-editor"

export default function CollegePageAdmin() {
  const params = useParams()
  const collegeId = params?.id as string

  return <CollegeEditor collegeId={collegeId} />
}




