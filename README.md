# WhatsApp Chat

Простой веб-интерфейс для отправки и получения текстовых сообщений в WhatsApp через [GREEN-API](https://green-api.com).

Демо: https://green-mjdb8liyy-dimash95s-projects.vercel.app/

## Возможности

- Вход по `idInstance`, `apiTokenInstance` и `apiUrl` из личного кабинета GREEN-API
- Создание чата по номеру телефона
- Отправка текстовых сообщений ([SendMessage](https://green-api.com/docs/api/sending/SendMessage/))
- Получение входящих сообщений через [HTTP API](https://green-api.com/docs/api/receiving/technology-http-api/) (`ReceiveNotification` + `DeleteNotification`)

## Стек

React 19, Vite, CSS

## Запуск

Нужен Node.js 20.19+ или 22.12+.

```bash
git clone https://github.com/Dimash95/green-api.git
cd green-api
npm install
npm run dev
```

Открыть http://localhost:5173

Сборка:

```bash
npm run build
npm run preview
```

## Настройка инстанса

Инстанс должен быть авторизован (WhatsApp привязан по QR-коду в личном кабинете).

Чтобы входящие сообщения приходили через HTTP API, в настройках инстанса:

- поле `webhookUrl` должно быть пустым
- должно быть включено получение входящих сообщений (`incomingWebhook`)

## Структура

```
src/
  api/greenApi.js            запросы к GREEN-API
  hooks/useNotifications.js  получение входящих сообщений
  hooks/useLocalStorage.js   сохранение данных между перезагрузками
  utils/format.js            форматирование телефона и времени
  components/                компоненты интерфейса
  App.jsx                    состояние приложения
```
