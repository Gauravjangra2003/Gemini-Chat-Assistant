const storageKey = (userId) => `ai-assistant-chats:${userId}`

export function loadChats(userId) {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey(userId)))
    return Array.isArray(saved) ? saved : []
  } catch {
    return []
  }
}

export function saveChats(userId, chats) {
  localStorage.setItem(storageKey(userId), JSON.stringify(chats))
}
