// Type for the message
interface Message {
  message: string;
  timestamp: string;
}

// Use this function to send a message
export const sendMessage = (channelName: string,message: string): void => {
  const messageData: Message = { message, timestamp: new Date().toISOString() };
  localStorage.setItem(channelName, JSON.stringify(messageData));
  localStorage.removeItem(channelName); // Trigger the event even if the message hasn't changed
};


