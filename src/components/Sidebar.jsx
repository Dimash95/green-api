import ChatList from './ChatList'
import NewChatForm from './NewChatForm'

function Sidebar({ chats, activePhone, onSelect, onCreate, onLogout }) {
  return (
    <aside className="sidebar">
      <header className="sidebar__header">
        <h1 className="sidebar__title">Чаты</h1>
        <button className="link-button" onClick={onLogout}>
          Выйти
        </button>
      </header>

      <NewChatForm onCreate={onCreate} />
      <ChatList chats={chats} activePhone={activePhone} onSelect={onSelect} />
    </aside>
  )
}

export default Sidebar
