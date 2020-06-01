const Gists = require('gists');
const querystring = require('querystring');

exports.handler = async function (event, context) {
  try {
    if (event.httpMethod != 'GET') {
      return {
        statusCode: 405,
        body: 'Request method not supported'
      };
    }

    const gists = new Gists({
      username: 'hirenkeradiya@gmail.com',
      password: 'BQ&n43nX%7'
    });

    let newsletters = [];
    await gists.get('4ae6baef54175e1ddf8c186626b9f279')
      .then(function (response) {
        newsletters = JSON.parse(response.body.files['newsletters.json'].content)
      });

    let newsletterKey = event.queryStringParameters.id - 1;

    return {
      statusCode: 200,
      body: JSON.stringify({
        status: 200,
        newsletter: newsletters[newsletterKey]
      }),
    }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}
