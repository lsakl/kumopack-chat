import React from 'react';

type Props = {
  who   : string;
  name  : string;
  time  : Date;
};

const ChatMeta: React.FC<Props> = ({ who, name, time }) => {

  // const isToday = (date:Date) => {
  //   const today = new Date();
  //   return date.getDate() === today.getDate() &&
  //       date.getMonth() === today.getMonth() &&
  //       date.getFullYear() === today.getFullYear();
  // };

  const formatDate = (time:Date) => {
    const givenDate = new Date(time);
    const currentDate = new Date();

    const diffTime = Math.abs(currentDate.getTime() - givenDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 7) {
        return `${givenDate.getFullYear()}-${String(givenDate.getMonth() + 1).padStart(2, '0')}-${String(givenDate.getDate()).padStart(2, '0')} ${givenDate.toLocaleString("en-US", { hour: "numeric", minute: "numeric", hour12: true })}`;
    } else {
        return givenDate.toLocaleString("en-US", {
            weekday: "long",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        });
    }
  };

  return (
    <ul className="chat-meta">
        { who==="you" && <li>{name}</li> }
        <li>{formatDate(time)}</li>
    </ul>
  )
}

export default ChatMeta