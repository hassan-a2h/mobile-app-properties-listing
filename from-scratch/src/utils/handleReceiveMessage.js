import axios from 'axios';

async function handleReceiveMessage(socket, currentChat, userId, setMessages, data) {
  if (data.chatId === currentChat?._id) {
    if (data.receiverId === userId) {
      setMessages((prevMessages) => [data, ...prevMessages]);
      const savedMsg = await axios.post(`/api/c/messages/read`, 
        {
          id: data._id
        }
      );
      socket.emit('messagesRead', { userId: userId });
    }
  }
}

export default handleReceiveMessage;