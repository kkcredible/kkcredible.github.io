const Gists = require('gists');

exports.handler = async function(event, context) {
  try {
    if (event.httpMethod != 'POST') {
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
      })
    ;

    let parameters = JSON.parse(event.body);

    newsletters.push({
      title: parameters[0].title,
      link: parameters[0].link,
    });

    const options = {
      files: {
        'newsletters.json': {
          content: JSON.stringify(newsletters)
        }
      }
    };

    gists.edit('4ae6baef54175e1ddf8c186626b9f279', options);

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
