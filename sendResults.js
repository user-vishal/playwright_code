const fs = require('fs');
const { Client } = require('@elastic/elasticsearch');

// Elasticsearch client setup
const client = new Client({ node: 'http://localhost:9200' }); // Adjust the node URL if needed

// Read test results
const results = JSON.parse(fs.readFileSync('report.json'));

async function sendResults() {
  for (const suite of results.suites) {
    for (const test of suite.tests) {
      const body = {
        testName: test.title, // Adjust according to the structure of your report.json
        status: test.status, // Adjust if needed
        duration: test.duration, // Ensure this field is correctly mapped
        startTime: new Date(test.startTime).toISOString(), // Convert to ISO string if necessary
        endTime: new Date(test.endTime).toISOString(), // Convert to ISO string if necessary
        // Add any other relevant fields based on your test result structure
      };

      await client.index({
        index: 'playwright-test-results', // The index name you created
        body,
      });
    }
  }
  console.log('Test results sent to Elasticsearch');
}

sendResults().catch(console.log);