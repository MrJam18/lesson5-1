export const addChat = (name, chatID) => ({
    type: 'CHAT_LIST::ADD_CHAT',
    chatID, name
})
export const deleteChat = (chatID) => ({
    type: "CHAT_LIST::DELETE_CHAT",
    chatID
})