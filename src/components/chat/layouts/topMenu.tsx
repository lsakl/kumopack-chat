import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import InfoUser  from './../profiles/infoUser';
import { PartnerContext } from './../context/centerContext';

interface TopMenuProps {
  setShowRightMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenChat: React.Dispatch<React.SetStateAction<boolean>>;
  showRightMenu: boolean;
}

const TopMenu: React.FC<TopMenuProps> = ({ setShowRightMenu, setOpenChat, showRightMenu }) => {
  const { t } = useTranslation();
  const { partner } = useContext(PartnerContext);

  function onOpen() {
    setShowRightMenu(!showRightMenu);
  }

  return (
    <div className='w-100' style={{height:"77px"}}>
      <div className="nk-chat-head">
        <ul className="nk-chat-head-info">
          <li className="nk-chat-body-close-arrow">
            <div onClick={() => setOpenChat(false)} className="btn btn-icon btn-trigger nk-chat-hide ms-n1"><em className="icon ni ni-arrow-left"></em></div>
          </li>
          <li className="nk-chat-head-user">
            <InfoUser data={{
              userId        : partner.userId,
              firstName     : partner.firstName,
              lastName      : partner.lastName,
              email         : partner.email,
              image         : partner.image,
              last_message  : '',
              userType      : partner.userType,
              time          : ''
            }} status={partner.status} type='top' />
          </li>
        </ul>
        <ul className="nk-chat-head-tools">
          <li>
            <button type="button" className="btn btn-view-profile-c-2">{t('viewProfile')}</button>
          </li>
          <li className="me-n1 me-md-n2">
            <div onClick={() => onOpen()} className='chat-profile-toggle'><em className="icon ni ni-more-h"></em></div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TopMenu;