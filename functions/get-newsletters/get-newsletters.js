const fileSystem = require('fs');
const util = require('util');
const path = require("path")

exports.handler = async (event, context) => {
  try {
    const getNewslettersFrom = util.promisify(fileSystem.readFileSync).bind(fileSystem);

    return {
      statusCode: 200,
      body: JSON.stringify({
        newsletters: await getNewslettersFrom(path.join(process.cwd(), './database/newsletters.json')).then((requestResults) => {
          return JSON.parse(requestResults);
        })
      }),
    }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}
