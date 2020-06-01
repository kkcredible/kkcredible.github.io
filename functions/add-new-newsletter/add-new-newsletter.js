const fileSystem = require('fs');
const util = require('util');

exports.handler = async (event, context) => {
  if (event.httpMethod != 'POST') {
    return;
  }

  let parameters = JSON.parse(event.body);

  try {
    const getNewslettersFrom = util.promisify(fileSystem.readFile).bind(fileSystem);
    let newsletters = await getNewslettersFrom('./src/database/newsletters.json').then((requestResults) => {
      return JSON.parse(requestResults);
    });

    newsletters.push({
      title: parameters.title,
      link: parameters.link,
    });

    fileSystem.writeFile('./src/database/newsletters.json', JSON.stringify(newsletters), function (err) {
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
