import React              from 'react';
import { useTranslation } from 'react-i18next';
import ChatAvatar         from './chatAvatar';
import moment             from 'moment';
// import 'moment/locale/en';

moment.locale('en');

type Props = {
  data: {
    [key: string]: any
  };
  status: number;
  type?   : string; // card, top
};

const InfoUser: React.FC<Props> = ({ data, status, type }) => {
  const { t } = useTranslation();
  const statusData = [t('offline'), t('online'), t('busy')];
  const dateTimeToDisplay = (createDateTime: any) => {
    return createDateTime!=='null'&&createDateTime?moment(createDateTime).fromNow():'';
  };
  return (
    <>
    <div className={(type === "top") ? "user-card" : "chat-link chat-open"}>
      <ChatAvatar image={data.image} status={status} />
      <div className={(type==="top")?"user-info":"chat-info"}>
        <div className="chat-from">
          <div className={(type === "top") ? "lead-text name-text-title info-user-box" : "name name-text"}>{`${data.firstName} ${data.lastName}`}</div>
          {(type === "top") ? 
          <span className="badge span-online">
            <i className="status dot dot-text-lg dot-text-success"></i>
            <small className="text-status">{statusData[status]}</small>
          </span> : <span className="time">{dateTimeToDisplay(data.time)}</span>}
        </div>
        <div className="chat-context">
          <div className="text username-text">{data.email}</div>
        </div>
      </div>
    </div>
    </>
  )
}

export default InfoUser