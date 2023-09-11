import React, { useState } from 'react';

interface Props {
  children: React.ReactNode;
}

interface Partner {
  userId        : string;
  firstName     : string;
  lastName      : string;
  email         : string;
  image         : string;
  userType      : number;
  status        : number;
}

interface User {
  userId    : string;
  firstName : string;
  lastName  : string;
  email     : string;
  image     : string;
  userType  : number;
  status    : number;
  token     : string;
}

interface Messages {
  _id         : string;
  from        : string;
  to          : string;
  message     : string;
  data        : Record<string, any>;
  datetime    : string;
  messageType : string;
}

interface Status {
  contactUserId   : string;
  messageTo       : string;
  messageFrom     : string;
  lastMessage     : string;
  messageUpdate   : string;
  status          : number;
}

interface PartnerContextValue {
  partner: Partner;
  setPartner: (partner: Partner) => void;
}

interface UserContextValue {
  user: User;
  setUser: (user: User) => void;
}

interface MessagesContextValue {
  messages: Messages[];
  setMessages: (updater: (prevMessages: Messages[]) => Messages[]) => void;
}

interface StatusContextValue {
  status: Status[];
  setStatus: (updater: (prevStatus: Status[]) => Status[]) => void;
}

export const PartnerContext = React.createContext<PartnerContextValue>({
  partner: {
    userId        : '',
    firstName     : '',
    lastName      : '',
    email         : '',
    image         : '',
    userType      : 0,
    status        : 0
  },
  setPartner: () => {},
});

export const UserContext = React.createContext<UserContextValue>({
  user: {
    userId    : "",
    firstName : '',
    lastName  : '',
    email     : '',
    image     : '',
    userType  : 0,
    status    : 0,
    token     : "",
  },
  setUser: () => {},
});

export const MessagesContext = React.createContext<MessagesContextValue>({
  messages: [],
  setMessages: () => {},
});

export const StatusContext = React.createContext<StatusContextValue>({
  status: [],
  setStatus: () => {},
});


export const CenterContextProvider = ({ children }: Props) => {
  const [partner, setPartner] = useState<Partner>({
    userId       : '',
    firstName    : '',
    lastName     : '',
    email        : '',
    image        : '',
    userType     : 0,
    status       : 0
  });

  const [user, setUser] = useState<User>({
    userId    : "",
    firstName : '',
    lastName  : '',
    email     : '',
    image     : '',
    userType  : 0,
    status    : 0,
    token     : "",
  });

  const [messages, setMessages] = useState<Messages[]>([]);

  const [status, setStatus] = useState<Status[]>([]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <PartnerContext.Provider value={{ partner, setPartner }}>
        <MessagesContext.Provider value={{ messages, setMessages }}>
          <StatusContext.Provider value={{ status, setStatus }}>
            {children}
          </StatusContext.Provider>
        </MessagesContext.Provider>
      </PartnerContext.Provider>
    </UserContext.Provider>
  );
};
