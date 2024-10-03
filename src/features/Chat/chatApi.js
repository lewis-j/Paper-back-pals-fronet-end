import API from "../../lib/authAxios";

export const getMessages = async (roomId) => {
  try {
    const res = await API.get(`chat/${roomId}/messages`);
    console.log("responsone from our chat api", res);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const enterChatRoom = async (user2Id) => {
  try {
    const res = await API.post(`chat/room`, { user2Id });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getChatRooms = async (userId) => {
  try {
    const res = await API.get(`http://localhost:3000/chat/rooms/${userId}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
const chatApi = { getChatRooms, enterChatRoom, getMessages };
export default chatApi;
