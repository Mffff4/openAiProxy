export default async function handler(req, res) {
  const { path } = req.query;
  const apiPath = Array.isArray(path) ? path.join('/') : path;
  
  const url = `https://api.openai.com/v1/${apiPath}${req.url.includes('?') ? '?' + req.url.split('?')[1] : ''}`;
  
  try {
    const response = await fetch(url, {
      method: req.method,
      headers: {
        ...req.headers,
        host: 'api.openai.com',
      },
      body: req.method !== 'GET' && req.method !== 'HEAD' ? JSON.stringify(req.body) : undefined,
    });

    const data = await response.text();
    
    res.status(response.status);
    response.headers.forEach((value, key) => {
      if (!['content-encoding', 'transfer-encoding', 'connection'].includes(key.toLowerCase())) {
        res.setHeader(key, value);
      }
    });
    
    res.send(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Proxy error' });
  }
}