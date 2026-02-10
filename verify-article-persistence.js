const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:3000/api/articles';

async function testArticlePersistence() {
    try {
        console.log('1. Creating Test Article...');
        const createRes = await fetch(BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: 'Test Persistence ' + Date.now(),
                content: 'Initial Content',
                sections: []
            })
        });

        if (!createRes.ok) {
            const txt = await createRes.text();
            throw new Error(`Failed to create: ${createRes.status} ${txt}`);
        }

        const created = await createRes.json();
        console.log('   Created Article ID:', created.id);

        // ---------------------------------------------------------

        console.log('2. Updating Article Content & Sections...');
        const updatePayload = {
            title: created.title,
            content: '<p>Updated Content Persistence Check</p>', // Use HTML like the editor does
            sections: [
                { title: 'Section 1', content: '<p>Sec 1 Content</p>', order: 0 },
                { title: 'Section 2', content: '<p>Sec 2 Content</p>', order: 1 }
            ]
        };

        const updateRes = await fetch(`${BASE_URL}/${created.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatePayload)
        });

        if (!updateRes.ok) {
            const txt = await updateRes.text();
            throw new Error(`Failed to update: ${updateRes.status} ${txt}`);
        }
        const updated = await updateRes.json();
        console.log('   Update response Content:', updated.content);

        // ---------------------------------------------------------

        console.log('3. Fetching Article to Verify...');
        const getRes = await fetch(`${BASE_URL}/${created.id}`);
        const fetched = await getRes.json();

        console.log('   Fetched Content:', fetched.content);
        console.log('   Fetched Sections:', JSON.stringify(fetched.sections, null, 2));

        const contentMatch = fetched.content === updatePayload.content;
        const sectionsMatch = fetched.sections && fetched.sections.length === 2 &&
            fetched.sections[0].title === 'Section 1';

        if (contentMatch && sectionsMatch) {
            console.log('SUCCESS: Content and Sections persisted correctly.');
        } else {
            console.error('FAILURE: Data mismatch.');
            if (!contentMatch) console.error('  Content mismatch.');
            if (!sectionsMatch) console.error('  Sections mismatch.');
        }

    } catch (error) {
        console.error('TEST FAILED:', error);
    }
}

testArticlePersistence();
