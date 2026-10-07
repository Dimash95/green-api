function buildUrl({ apiUrl, idInstance, apiTokenInstance }, method) {
  return `${apiUrl}/waInstance${idInstance}/${method}/${apiTokenInstance}`
}

async function request(url, options) {
  const response = await fetch(url, options)

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return response.json()
}

export function getStateInstance(credentials) {
  return request(buildUrl(credentials, 'getStateInstance'))
}

export function sendMessage(credentials, chatId, message) {
  return request(buildUrl(credentials, 'sendMessage'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chatId, message }),
  })
}

export function receiveNotification(credentials, signal) {
  const url = `${buildUrl(credentials, 'receiveNotification')}?receiveTimeout=20`
  return request(url, { signal })
}

export function deleteNotification(credentials, receiptId) {
  const url = `${buildUrl(credentials, 'deleteNotification')}/${receiptId}`
  return request(url, { method: 'DELETE' })
}
