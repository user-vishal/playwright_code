const fs = require('fs');
const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: 'https://localhost:9200' });

async function sendResults() {
    const data = JSON.parse(fs.readFileSync('report.json', 'utf8'));

    for (const suite of data.suites) {
        for (const subSuite of suite.suites) {
            for (const spec of subSuite.specs) {
                for (const test of spec.tests) {
                    const testData = {
                        testName: spec.title,
                        status: test.results[0].status,
                        duration: test.results[0].duration,
                        startTime: test.results[0].startTime,
                    };

                    await client.index({
                        index: 'playwright-test-results',
                        body: testData,
                    });

                    console.log(`Sent result for test: ${spec.title}`);
                }
            }
        }
    }
}

sendResults().catch(console.error);
