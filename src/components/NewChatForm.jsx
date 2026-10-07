import { useState } from 'react'
import { normalizePhone } from '../utils/format'

function NewChatForm({ onCreate }) {
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    const normalized = normalizePhone(phone)

    if (normalized.length < 10) {
      setError('Введите номер полностью')
      return
    }

    onCreate(normalized)
    setPhone('')
    setError('')
  }

  return (
    <form className="new-chat" onSubmit={handleSubmit}>
      <div className="new-chat__row">
        <input
          className="new-chat__input"
          placeholder="Номер телефона, например 79991234567"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button className="button" type="submit">
          Создать
        </button>
      </div>
      {error && <p className="error">{error}</p>}
    </form>
  )
}

export default NewChatForm
