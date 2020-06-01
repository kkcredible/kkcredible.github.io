const fileSystem = require('fs');
const util = require('util');
const path = require('path');

exports.handler = async (event, context) => {
  try {
    // const getNewslettersFrom = util.promisify(fileSystem.readFileSync).bind(fileSystem);
    const directories = util.readdir(fileSystem.readFileSync).bind(fileSystem);

    // fileSystem.readdir(path.join(), function (err, data) {
    //   console.log(data);
    // })

    return {
      statusCode: 200,
      body: JSON.stringify({
        newsletters: await directories(path.join()).then((requestResults) => {
          return JSON.parse(requestResults);
        })
      }),
    }
    // return {
    //   statusCode: 200,
    //   body: JSON.stringify({
    //     newsletters: await getNewslettersFrom('database/newsletters.json').then((requestResults) => {
    //       return JSON.parse(requestResults);
    //     })
    //   }),
    // }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}
