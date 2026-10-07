import { useCallback, useState } from 'react'
import { sendMessage } from './api/greenApi'
import ChatWindow from './components/ChatWindow'
import LoginForm from './components/LoginForm'
import Sidebar from './components/Sidebar'
import { useLocalStorage } from './hooks/useLocalStorage'
import { useNotifications } from './hooks/useNotifications'

function App() {
  const [credentials, setCredentials] = useLocalStorage('credentials', null)
  const [chats, setChats] = useLocalStorage('chats', [])
  const [activePhone, setActivePhone] = useState(null)

  const activeChat = chats.find((chat) => chat.phone === activePhone)

  const addMessage = useCallback(
    (chatInfo, message) => {
      setChats((prev) => {
        const chat = prev.find((item) => item.phone === chatInfo.phone)
        const updated = {
          ...chatInfo,
          ...chat,
          messages: [...(chat?.messages ?? []), message],
        }

        return [updated, ...prev.filter((item) => item.phone !== chatInfo.phone)]
      })
    },
    [setChats],
  )

  const handleNotification = useCallback(
    (notification) => {
      if (notification.typeWebhook !== 'incomingMessageReceived') return

      const { senderData, messageData, idMessage, timestamp } = notification
      if (!senderData.chatId.endsWith('@c.us')) return

      const text =
        messageData.textMessageData?.textMessage ?? messageData.extendedTextMessageData?.text
      if (!text) return

      const chatInfo = {
        phone: senderData.chatId.replace('@c.us', ''),
        chatId: senderData.chatId,
        name: senderData.senderContactName || senderData.senderName,
      }

      addMessage(chatInfo, {
        id: idMessage,
        text,
        time: timestamp * 1000,
        outgoing: false,
      })
    },
    [addMessage],
  )

  useNotifications(credentials, handleNotification)

  function handleCreateChat(phone) {
    if (!chats.some((chat) => chat.phone === phone)) {
      setChats([{ phone, chatId: `${phone}@c.us`, messages: [] }, ...chats])
    }
    setActivePhone(phone)
  }

  async function handleSend(text) {
    const { idMessage } = await sendMessage(credentials, activeChat.chatId, text)

    addMessage(activeChat, {
      id: idMessage,
      text,
      time: Date.now(),
      outgoing: true,
    })
  }

  function handleLogout() {
    setCredentials(null)
    setChats([])
    setActivePhone(null)
  }

  if (!credentials) {
    return <LoginForm onLogin={setCredentials} />
  }

  return (
    <div className="app">
      <Sidebar
        chats={chats}
        activePhone={activePhone}
        onSelect={setActivePhone}
        onCreate={handleCreateChat}
        onLogout={handleLogout}
      />
      {activeChat ? (
        <ChatWindow chat={activeChat} onSend={handleSend} />
      ) : (
        <div className="placeholder">Выберите чат или создайте новый</div>
      )}
    </div>
  )
}

export default App
