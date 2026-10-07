import { useState } from 'react'

function MessageInput({ onSend }) {
  const [text, setText] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()

    const message = text.trim()
    if (!message || sending) return

    setSending(true)
    setError('')

    try {
      await onSend(message)
      setText('')
    } catch {
      setError('Не удалось отправить сообщение')
    } finally {
      setSending(false)
    }
  }

  return (
    <form className="message-input" onSubmit={handleSubmit}>
      {error && <p className="error">{error}</p>}
      <div className="message-input__row">
        <input
          className="message-input__field"
          placeholder="Сообщение"
          value={text}
          onChange={(e) => setText(e.target.value)}
          autoFocus
        />
        <button className="button" type="submit" disabled={sending || !text.trim()}>
          Отправить
        </button>
      </div>
    </form>
  )
}

export default MessageInput
