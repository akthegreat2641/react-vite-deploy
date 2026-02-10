

const BASE_URL = 'http://localhost:3000/api/pages';

async function verify() {
    console.log('Starting Page API Verification...');

    // 1. Create a Page
    console.log('\n1. Creating Page...');
    const createPayload = {
        title: 'Test Page',
        slug: 'test-page-verification',
        description: 'This is a test page',
        headerLogo: 'https://example.com/logo.png',
        authorName: 'Test Author',
        publishDate: new Date().toISOString(),
        locationLabel: 'Test Location',
        headerBtn1Text: 'Btn 1',
        headerBtn1Link: 'https://example.com/1',
        headerBtn2Text: 'Btn 2',
        headerBtn2Link: 'https://example.com/2',
        category: 'Articles',
        published: true,
        sections: [
            { title: 'Intro', content: '<p>Hello World</p>', type: 'INFO', order: 0 }
        ],
        faqs: [
            { title: 'General', question: 'Why?', answer: 'Because.', order: 0 }
        ]
    };

    const createRes = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(createPayload)
    });

    if (!createRes.ok) {
        const text = await createRes.text();
        console.error('Create Failed:', createRes.status, text);
        process.exit(1);
    }

    const createdPage = await createRes.json();
    console.log('Page Created:', createdPage.id);

    if (createdPage.title !== createPayload.title) {
        console.error("Title mismatch"); process.exit(1);
    }

    // 2. List Pages
    console.log('\n2. Listing Pages...');
    const listRes = await fetch(BASE_URL);
    const pages = await listRes.json();
    console.log(`Found ${pages.length} pages.`);
    const found = pages.find((p: any) => p.id === createdPage.id);
    if (!found) {
        console.error('Created page not found in list');
        process.exit(1);
    }
    console.log('Page found in list.');

    // 3. Update Page
    console.log('\n3. Updating Page...');
    const updatePayload = {
        ...createPayload,
        title: 'Updated Test Page',
        description: 'Updated description'
    };
    const updateRes = await fetch(`${BASE_URL}/${createdPage.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatePayload)
    });

    if (!updateRes.ok) {
        console.error("Update failed"); process.exit(1);
    }

    const updatedPage = await updateRes.json();
    console.log("Page updated:", updatedPage.title);
    if (updatedPage.title !== 'Updated Test Page') {
        console.error("Update verification failed"); process.exit(1);
    }

    // 4. Delete Page
    console.log('\n4. Deleting Page...');
    const deleteRes = await fetch(`${BASE_URL}/${createdPage.id}`, {
        method: 'DELETE'
    });

    if (!deleteRes.ok) {
        console.error("Delete failed"); process.exit(1);
    }
    console.log("Delete successful");

    console.log("\nVERIFICATION SUCCESSFUL!");
}

verify().catch(err => {
    console.error("Verification script error:", err);
    process.exit(1);
});
