export function normalizePhone(value) {
  const digits = value.replace(/\D/g, '')

  if (digits.length === 11 && digits.startsWith('8')) {
    return `7${digits.slice(1)}`
  }

  return digits
}

export function formatPhone(phone) {
  const match = phone.match(/^(\d)(\d{3})(\d{3})(\d{2})(\d{2})$/)
  if (!match) return `+${phone}`

  const [, country, code, part1, part2, part3] = match
  return `+${country} ${code} ${part1}-${part2}-${part3}`
}

export function formatTime(timestamp) {
  return new Date(timestamp).toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function getChatTitle(chat) {
  return chat.name || formatPhone(chat.phone)
}
