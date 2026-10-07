import { formatPhone, getChatTitle } from '../utils/format'
import Avatar from './Avatar'
import MessageInput from './MessageInput'
import MessageList from './MessageList'

function ChatWindow({ chat, onSend }) {
  const title = getChatTitle(chat)

  return (
    <section className="chat">
      <header className="chat__header">
        <Avatar title={title} />
        <div>
          <div className="chat__title">{title}</div>
          <div className="chat__subtitle">{formatPhone(chat.phone)}</div>
        </div>
      </header>

      <MessageList messages={chat.messages} />
      <MessageInput key={chat.phone} onSend={onSend} />
    </section>
  )
}

export default ChatWindow
