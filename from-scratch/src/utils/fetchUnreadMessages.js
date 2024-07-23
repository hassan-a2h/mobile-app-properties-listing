import axios from "axios";

const fetchUnreadMessages = async (userId) => {
  let unreadMessages = 0;
  try {
    const response = await axios.get(`/api/c/unread-messages/${userId}`);
    unreadMessages = response.data;
    console.log('unread messages at the moment:', unreadMessages);
  } catch (error) {
    console.error('Error fetching unread messages:', error);
  }
  
  console.log('unreadMessages from inside function:', unreadMessages);
  return unreadMessages;
};

export default fetchUnreadMessages;