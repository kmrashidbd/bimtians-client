import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import {
  useDeleteNotificationMutation,
  useFetchChatQuery,
} from "../../features/api/chatApi";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";

function Notification({ notifications, setSelectedChat }) {
  const [deleteNotification] = useDeleteNotificationMutation();
  const { data } = useFetchChatQuery();
  const handleClick = (notification) => {
    deleteNotification(notification.id);
    const chat = data?.find((chat) => chat.id === notification?.chatId);
    setSelectedChat(chat);
  };
  return (
    <div>
      {notifications?.length > 0 && (
        <Dropdown>
          <Dropdown.Toggle>
            <NotificationBadge
              count={notifications?.length}
              effect={Effect.SCALE}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-bell-fill"
              viewBox="0 0 16 16"
            >
              <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
            </svg>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {notifications?.map((notification) => (
              <Dropdown.Item
                onClick={() => handleClick(notification)}
                key={notification.id}
              >
                {notification.isGroupChat
                  ? `New Message in ${notification?.groupName}`
                  : `New Message from ${notification?.senderName}`}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      )}
    </div>
  );
}

export default Notification;
