export default async function handler(req, res) {
  // Получаем путь из URL
  const path = req.query.path ? req.query.path.join('/') : '';
  
  // Строим URL для OpenAI API
  const url = `https://api.openai.com/${path}${req.url.includes('?') ? '?' + req.url.split('?').slice(1).join('?') : ''}`;
  
  try {
    // Копируем заголовки, исключая проблемные
    const headers = {};
    Object.keys(req.headers).forEach(key => {
      if (!['host', 'content-length'].includes(key.toLowerCase())) {
        headers[key] = req.headers[key];
      }
    });
    
    // Готовим тело запроса
    let body;
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      body = JSON.stringify(req.body);
    }
    
    // Делаем запрос к OpenAI
    const response = await fetch(url, {
      method: req.method,
      headers: headers,
      body: body
    });
    
    // Получаем данные
    const data = await response.text();
    
    // Устанавливаем статус
    res.status(response.status);
    
    // Копируем заголовки ответа
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });
    
    // Отправляем ответ
    res.end(data);
    
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Proxy failed' });
  }
}