# OpenAI API Proxy

Простой прокси для OpenAI API, развертываемый на Vercel.

## Использование

После деплоя просто замените `https://api.openai.com` на ваш домен Vercel:

```bash
# Вместо
curl https://api.openai.com/v1/chat/completions

# Используйте
curl https://your-proxy.vercel.app/v1/chat/completions
```

## Деплой на Vercel

1. Fork или скопируйте этот репозиторий
2. Подключите к Vercel
3. Деплойте
4. Готово!

## Особенности

- ✅ Полная совместимость с OpenAI API
- ✅ Поддержка всех методов (GET, POST, etc.)
- ✅ Передача всех заголовков
- ✅ Обработка query параметров
- ✅ Обработка ошибок

## Пример использования с OpenAI библиотекой

```javascript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: 'your-api-key',
  baseURL: 'https://your-proxy.vercel.app/v1',
});
```

```python
from openai import OpenAI

client = OpenAI(
    api_key="your-api-key",
    base_url="https://your-proxy.vercel.app/v1"
)
```