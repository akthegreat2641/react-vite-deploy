import { NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import path from "path"

export async function POST(req: Request) {
    try {
        const formData = await req.formData()
        const file = formData.get("file") as File

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
        }

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        // Ensure uploads directory exists
        const uploadDir = path.join(process.cwd(), "public/uploads")
        try {
            await mkdir(uploadDir, { recursive: true })
        } catch (e) {
            // Ignore error if it already exists
        }

        // Create unique filename
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
        const ext = path.extname(file.name)
        const filename = file.name.replace(/\.[^/.]+$/, "") + "-" + uniqueSuffix + ext
        const filepath = path.join(uploadDir, filename)

        await writeFile(filepath, buffer)

        return NextResponse.json({ url: `/uploads/${filename}` })
    } catch (error) {
        console.error("Upload error:", error)
        return NextResponse.json({ error: "Upload failed" }, { status: 500 })
    }
}
