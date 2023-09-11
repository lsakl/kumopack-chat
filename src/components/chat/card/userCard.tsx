import React, { useContext }  from 'react';
import InfoUser               from './../profiles/infoUser';
import LastMessage            from './../card/message/lastMessage';
import { PartnerContext }     from './../context/centerContext';

type Props = {
  data: {
    [key: string]: any
  };
};

const UserCard: React.FC<Props> = ({ data }) => {
  const { partner, setPartner } = useContext(PartnerContext);

  function partnerSelected(data:any) {
    setPartner({ ...partner, 
      userId      : data._id,
      firstName   : data.firstName,
      lastName    : data.lastName,
      email       : data.email,
      image       : data.image,
      status      : data.status,
    });

  }
  
  return (
      <li className={(partner.userId===data._id)?"chat-item active":"chat-item"} onClick={() => partnerSelected(data)}>
        <InfoUser data={data} status={data.status} type='card' />
        <LastMessage value={data.lastMessage} />
      </li>
  );
};

export default UserCard;
