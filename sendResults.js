const fs = require('fs');
const { Client } = require('@elastic/elasticsearch');

// Elasticsearch client setup
const client = new Client({ node: 'http://localhost:9200' }); // Adjust the node URL if needed

// Read test results
const results = JSON.parse(fs.readFileSync('report.json'));

async function sendResults() {
  for (const test of results.suites) {
    const body = {
      testName: test.name,
      status: test.status,
      duration: test.duration,
      startTime: test.startTime,
      endTime: test.endTime,
      // Add any other relevant fields based on your test result structure
    };

    await client.index({
      index: 'playwright-test-results', // The index name you created
      body,
    });
  }
  console.log('Test results sent to Elasticsearch');
}

sendResults().catch(console.log);
