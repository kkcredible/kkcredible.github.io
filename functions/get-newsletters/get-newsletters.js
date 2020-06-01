const Gists = require('gists');

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
        newsletters = response.body.files['newsletters.json'].content
      })
    ;

    return {
      statusCode: 200,
      body: JSON.stringify({
        newsletters: JSON.parse(newsletters)
      }),
    }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}
