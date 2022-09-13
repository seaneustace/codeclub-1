//https://hello-worker-code-club.seanworker.workers.dev/

async function readRequestBody(request) {
  const { headers } = request;
  const contentType = headers.get('content-type') || '';

  if (contentType.includes('application/json')) {
    return JSON.stringify(await request.json());
  } else if (contentType.includes('application/text')) {
    return request.text();
  } else if (contentType.includes('text/html')) {
    return request.text();
  } else if (contentType.includes('form')) {
    const formData = await request.formData();
    const body = {};
    for (const entry of formData.entries()) {
      body[entry[0]] = entry[1];
    }
    return JSON.stringify(body);
  } else {
    // Perhaps some other type of data was submitted in the form
    // like an image, or some other binary data.
    return 'a POST';
  }
}

async function handleRequest(request) {
  const reqBody = await readRequestBody(request);
  const retBody = `The request method was ${reqBody}`;
  const json = JSON.stringify(retBody);
  return new Response(json);
}

addEventListener('fetch', event => {
  const { request } = event;
  const { url } = request;

  if (url.includes('form')) {
    return event.respondWith(rawHtmlResponse(someForm));
  }
  if (request.method === 'POST') {
    const json = JSON.stringify("The request method was a POST");
    return event.respondWith(
    new Response(json, {
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
    })
  );
  } 
  
  else if (request.method === 'GET') {
    const json = JSON.stringify("The request method was a GET");
    return event.respondWith(
    new Response(json, {
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
    })
  );
  }
});
