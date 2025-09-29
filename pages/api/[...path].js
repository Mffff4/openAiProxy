export default async function handler(req, res) {
  // Получаем путь из URL
  const path = req.query.path ? req.query.path.join('/') : '';
  
  // Строим URL для OpenAI API
  const url = `https://api.openai.com/${path}${req.url.includes('?') ? '?' + req.url.split('?').slice(1).join('?') : ''}`;
  
  try {
    // Копируем заголовки, исключая проблемные
    const headers = {};
    Object.keys(req.headers).forEach(key => {
      if (!['host', 'content-length', 'connection'].includes(key.toLowerCase())) {
        headers[key] = req.headers[key];
      }
    });
    
    // Готовим тело запроса
    let body;
    if (req.method !== 'GET' && req.method !== 'HEAD' && req.body) {
      body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    }
    
    // Делаем запрос к OpenAI
    const response = await fetch(url, {
      method: req.method,
      headers: headers,
      body: body
    });
    
    // Получаем данные как ArrayBuffer для корректной передачи
    const data = await response.arrayBuffer();
    
    // Устанавливаем статус
    res.status(response.status);
    
    // Копируем только безопасные заголовки ответа
    const skipHeaders = ['content-encoding', 'transfer-encoding', 'connection', 'content-length'];
    response.headers.forEach((value, key) => {
      if (!skipHeaders.includes(key.toLowerCase())) {
        res.setHeader(key, value);
      }
    });
    
    // Отправляем ответ как Buffer
    res.end(Buffer.from(data));
    
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Proxy failed', details: error.message });
  }
}
