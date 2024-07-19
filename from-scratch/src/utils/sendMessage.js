const sendMessage = (socket, userId, currentChat, message, setMessages, setUserMessage) => {
  const receiverId = currentChat.userId === userId ? currentChat.agentId : currentChat.userId;
  const newMessage = {
    chatId: currentChat._id,
    senderId: userId,
    receiverId,
    message,
  };
  socket.emit('sendMessage', newMessage);
  setMessages(prev => [newMessage, ...prev]);
  setUserMessage('');
};

export default sendMessage;