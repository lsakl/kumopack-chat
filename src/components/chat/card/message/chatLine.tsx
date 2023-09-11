import React  from 'react';
import moment from 'moment';
// import 'moment/locale/en';

moment.locale('en');

type Props = {
  time? : Date;
};

const ChatLine: React.FC<Props> = ({ time }) => {

  const dateTimeToDisplay = (createDateTime: any) => {
    return moment(createDateTime).fromNow();
  };

  // const datetime = new Date(time||new Date()).toLocaleString('en-US', { weekday: 'long', hour: 'numeric', minute: 'numeric', hour12: false });

  return (
      <div className="chat-sap">
        <div className="chat-sap-meta"><span>{dateTimeToDisplay(time)}</span></div>
      </div>
  )
}

export default ChatLine