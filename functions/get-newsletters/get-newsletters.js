const fileSystem = require('fs');
const util = require('util');

exports.handler = async (event, context) => {
  try {
    const getNewslettersFrom = util.promisify(fileSystem.readdir).bind(fileSystem);

    return {
      statusCode: 200,
      body: JSON.stringify({
        newsletters: await getNewslettersFrom('../').then((requestResults) => {
          return requestResults;
        })
      }),
    }
    // const getNewslettersFrom = util.promisify(fileSystem.readFile).bind(fileSystem);

    // return {
    //   statusCode: 200,
    //   body: JSON.stringify({
    //     newsletters: await getNewslettersFrom('./src/database/newsletters.json').then((requestResults) => {
    //       return JSON.parse(requestResults);
    //     })
    //   }),
    // }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}
