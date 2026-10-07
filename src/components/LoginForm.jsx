import { useState } from 'react'
import { getStateInstance } from '../api/greenApi'

const DEFAULT_API_URL = 'https://api.green-api.com'

function LoginForm({ onLogin }) {
  const [idInstance, setIdInstance] = useState('')
  const [apiTokenInstance, setApiTokenInstance] = useState('')
  const [apiUrl, setApiUrl] = useState(DEFAULT_API_URL)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()

    const credentials = {
      idInstance: idInstance.trim(),
      apiTokenInstance: apiTokenInstance.trim(),
      apiUrl: apiUrl.trim().replace(/\/+$/, ''),
    }

    setLoading(true)
    setError('')

    try {
      const { stateInstance } = await getStateInstance(credentials)

      if (stateInstance !== 'authorized') {
        setError(`Инстанс не авторизован (${stateInstance})`)
        return
      }

      onLogin(credentials)
    } catch {
      setError('Не удалось подключиться. Проверьте данные')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login">
      <form className="login__form" onSubmit={handleSubmit}>
        <h1 className="login__title">Вход</h1>
        <p className="login__subtitle">Данные инстанса из личного кабинета GREEN-API</p>

        <label className="field">
          <span>idInstance</span>
          <input value={idInstance} onChange={(e) => setIdInstance(e.target.value)} required />
        </label>

        <label className="field">
          <span>apiTokenInstance</span>
          <input
            value={apiTokenInstance}
            onChange={(e) => setApiTokenInstance(e.target.value)}
            required
          />
        </label>

        <label className="field">
          <span>apiUrl</span>
          <input value={apiUrl} onChange={(e) => setApiUrl(e.target.value)} required />
        </label>

        {error && <p className="error">{error}</p>}

        <button className="button" type="submit" disabled={loading}>
          {loading ? 'Проверяем...' : 'Войти'}
        </button>
      </form>
    </div>
  )
}

export default LoginForm
