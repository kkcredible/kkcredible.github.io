const fileSystem = require('fs');
const util = require('util');
const querystring = require('querystring');

exports.handler = async (event, context) => {
  try {
    if (event.httpMethod != 'POST') {
      return;
    }

    let parameters = JSON.parse(event.body);
    let newsletterKey = event.queryStringParameters.id - 1;

    const getNewslettersFrom = util.promisify(fileSystem.readFile).bind(fileSystem);
    let newsletters = await getNewslettersFrom('./database/newsletters.json').then((requestResults) => {
      return JSON.parse(requestResults);
    });

    newsletters[newsletterKey].title = parameters.title;
    newsletters[newsletterKey].link = parameters.link;

    fileSystem.writeFile('./database/newsletters.json', JSON.stringify(newsletters), function (err) {
      if (err) throw err;
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        status: 200
      }),
    }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}
