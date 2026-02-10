"use client"

import { PageEditor } from "@/components/page-editor"
import { use } from "react"

export default function EditPagePage(props: { params: Promise<{ id: string }> }) {
    const params = use(props.params)
    return <PageEditor pageId={params.id} />
}
