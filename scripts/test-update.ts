async function main() {
    const collegeId = "cmijqtgmo00007knku7vtl8vi" // IIT Bombay ID from logs
    const url = `http://localhost:3000/api/colleges/${collegeId}`

    const payload = {
        name: "IIT Bombay Updated",
        location: "Mumbai, India",
        image: "",
        logo: "",
        featured: false
    }

    try {
        const res = await fetch(url, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        })

        console.log("Status:", res.status)
        const text = await res.text()
        console.log("Response:", text)
    } catch (error) {
        console.error("Fetch error:", error)
    }
}

main()
