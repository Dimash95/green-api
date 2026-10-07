import { formatTime } from '../utils/format'

function Message({ message }) {
  return (
    <div className={`message ${message.outgoing ? 'message--outgoing' : ''}`}>
      <span className="message__text">{message.text}</span>
      <span className="message__time">{formatTime(message.time)}</span>
    </div>
  )
}

export default Message
