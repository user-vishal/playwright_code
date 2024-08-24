const fs = require('fs');
// const { Client } = require('@elastic/elasticsearch');
// const client = new Client({ node: 'https://localhost:9200' });

const { Client } = require('@elastic/elasticsearch');
const client = new Client({
  node: 'https://192.168.100.20:9200',
  auth: {
    username: 'elastic',
    password: 'uRXG4Buiu0OcJ523rqeM'
  },
  ssl: {
    rejectUnauthorized: false
  },
  requestTimeout: 60000 // Set timeout to 60 seconds (adjust as needed)
});

async function sendResults() {
    const data = JSON.parse(fs.readFileSync('report.json', 'utf8'));
    const body = [];

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

                    body.push({ index: { _index: 'playwright-test-results' } });
                    body.push(testData);

                    console.log(`Prepared result for test: ${spec.title}`);
                }
            }
        }
    }

    if (body.length > 0) {
        await client.bulk({ refresh: true, body });
        console.log('Bulk indexing completed');
    }
}

sendResults().catch(console.error);

// async function sendResults() {
//     const data = JSON.parse(fs.readFileSync('report.json', 'utf8'));

//     for (const suite of data.suites) {
//         for (const subSuite of suite.suites) {
//             for (const spec of subSuite.specs) {
//                 for (const test of spec.tests) {
//                     const testData = {
//                         testName: spec.title,
//                         status: test.results[0].status,
//                         duration: test.results[0].duration,
//                         startTime: test.results[0].startTime,
//                     };

//                     await client.index({
//                         index: 'playwright-test-results',
//                         body: testData,
//                     });

//                     console.log(`Sent result for test: ${spec.title}`);
//                 }
//             }
//         }
//     }
// }

// sendResults().catch(console.error);
