export default function Home() {
  return (
    <div style={{ padding: '40px', fontFamily: 'monospace' }}>
      <h1>OpenAI API Proxy</h1>
      <p>Замените <code>https://api.openai.com</code> на <code>https://{typeof window !== 'undefined' ? window.location.host : 'your-domain.vercel.app'}</code></p>
      
      <h2>Примеры использования:</h2>
      <pre style={{ background: '#f4f4f4', padding: '20px', borderRadius: '8px' }}>
{`# Список моделей
curl https://${typeof window !== 'undefined' ? window.location.host : 'your-domain.vercel.app'}/v1/models \\
  -H "Authorization: Bearer YOUR_API_KEY"

# Chat completions  
curl https://${typeof window !== 'undefined' ? window.location.host : 'your-domain.vercel.app'}/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "model": "gpt-3.5-turbo",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'`}
      </pre>
      
      <p>
        <a href="https://github.com/Mffff4/openAiProxy" target="_blank">
          GitHub Repository
        </a>
      </p>
    </div>
  );
}