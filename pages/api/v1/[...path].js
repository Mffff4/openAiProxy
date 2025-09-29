export default async function handler(req, res) {
  const { path } = req.query;
  const apiPath = Array.isArray(path) ? path.join('/') : path || '';
  
  // Построение URL с query параметрами
  const urlSearchParams = new URLSearchParams();
  Object.entries(req.query).forEach(([key, value]) => {
    if (key !== 'path') {
      if (Array.isArray(value)) {
        value.forEach(v => urlSearchParams.append(key, v));
      } else {
        urlSearchParams.append(key, value);
      }
    }
  });
  
  const queryString = urlSearchParams.toString();
  const url = `https://api.openai.com/v1/${apiPath}${queryString ? '?' + queryString : ''}`;
  
  try {
    // Подготовка заголовков
    const headers = { ...req.headers };
    delete headers.host;
    delete headers['content-length'];
    
    // Подготовка тела запроса
    let body = undefined;
    if (req.method !== 'GET' && req.method !== 'HEAD' && req.body) {
      body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    }
    
    const response = await fetch(url, {
      method: req.method,
      headers,
      body,
    });

    const data = await response.text();
    
    // Копирование заголовков ответа
    response.headers.forEach((value, key) => {
      if (!['content-encoding', 'transfer-encoding', 'connection', 'content-length'].includes(key.toLowerCase())) {
        res.setHeader(key, value);
      }
    });
    
    res.status(response.status).send(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Proxy error', message: error.message });
  }
}
