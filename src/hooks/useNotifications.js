import { useEffect } from 'react'
import { deleteNotification, receiveNotification } from '../api/greenApi'

const RETRY_DELAY = 3000

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export function useNotifications(credentials, onNotification) {
  useEffect(() => {
    if (!credentials) return

    const controller = new AbortController()

    async function poll() {
      while (!controller.signal.aborted) {
        try {
          const notification = await receiveNotification(credentials, controller.signal)
          if (!notification) continue

          onNotification(notification.body)
          await deleteNotification(credentials, notification.receiptId)
        } catch (error) {
          if (controller.signal.aborted) return
          console.error(error)
          await sleep(RETRY_DELAY)
        }
      }
    }

    poll()

    return () => controller.abort()
  }, [credentials, onNotification])
}
