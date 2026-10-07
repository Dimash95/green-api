import { formatTime, getChatTitle } from '../utils/format'
import Avatar from './Avatar'

function ChatList({ chats, activePhone, onSelect }) {
  if (chats.length === 0) {
    return <p className="chat-list__empty">Чатов пока нет</p>
  }

  return (
    <ul className="chat-list">
      {chats.map((chat) => {
        const title = getChatTitle(chat)
        const lastMessage = chat.messages.at(-1)
        const isActive = chat.phone === activePhone

        return (
          <li key={chat.phone}>
            <button
              className={`chat-item ${isActive ? 'chat-item--active' : ''}`}
              onClick={() => onSelect(chat.phone)}
            >
              <Avatar title={title} />
              <div className="chat-item__body">
                <div className="chat-item__top">
                  <span className="chat-item__title">{title}</span>
                  {lastMessage && (
                    <span className="chat-item__time">{formatTime(lastMessage.time)}</span>
                  )}
                </div>
                <div className="chat-item__preview">
                  {lastMessage ? lastMessage.text : 'Нет сообщений'}
                </div>
              </div>
            </button>
          </li>
        )
      })}
    </ul>
  )
}

export default ChatList
