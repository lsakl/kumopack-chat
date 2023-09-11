import React, { useRef, useState, useContext, useEffect }               from 'react';
import ReactLoading                                                     from "react-loading";
import UserCard                                                         from '../card/userCard';
import useOutsideClick                                                  from './../hooks/useOutsideClick';
import { PartnerContext, UserContext, StatusContext, MessagesContext }  from './../context/centerContext';
import { useTranslation }                                               from 'react-i18next';
import { getUserListData }                                              from "../service/serviceChat";
import isEqual                                                          from 'lodash/isEqual';

type LeftMenuProps = {
  socket: any;
  setOpenChat: (value: boolean) => void;
};

const LeftMenu: React.FC<LeftMenuProps> = ({ socket, setOpenChat }) => {
  const [showModal, setShowModal]             = useState(false);
  const [searchUser, setSearchUser]           = useState<string>('');
  const [searchBefore, setSearchBefore]       = useState<string>('');
  const [partnerDataList, setPartnerDataList] = useState<any[]>([]);
  const [page, setPage]                       = useState<number>(1);
  const [loading, setLoading]                 = useState<boolean>(false);
  const [loadingEnd, setLoadingEnd]           = useState<boolean>(false);
  const [onlineTotal, setOnlineTotal]         = useState<number>(0);

  const { user }                              = useContext(UserContext);
  const { partner, setPartner }               = useContext(PartnerContext);
  const { status, setStatus }                 = useContext(StatusContext);
  const { messages }                          = useContext(MessagesContext);

  const ref                                   = useRef<HTMLDivElement>(null);
  const loadingRef                            = useRef<HTMLDivElement>(null);

  const { t } = useTranslation();
  const limit = Math.ceil((window.innerHeight-130)/100);  
  const getUserList = async () => {
    let _page = page;
    if(searchBefore!==searchUser){
      _page = 1;
      setPage(1);
    }
    const response = await getUserListData(user.userId, searchUser, _page, limit);
    if(response.status===200  && response.data.length>0){

      if(page===1 || (response.search===searchUser && searchUser !== searchBefore)){
        setPartner({ ...partner,
          userId        : response.data[0]._id,
          firstName     : response.data[0].firstName,
          lastName      : response.data[0].lastName,
          email         : response.data[0].email,
          image         : response.data[0].image,
          userType      : response.data[0].userType,
          status        : response.data[0].status,
        });
      }
      
      if(response.search===searchUser && searchUser !== searchBefore){
        setPartnerDataList([...response.data]);
        setSearchBefore(response.search);
        setLoadingEnd(false);
      }else{
        setPartnerDataList([...partnerDataList, ...response.data]);
      }

      setPage(_page+1);
      setLoading(false);
    }else if(response.total>0 && response.data.length===0){
      setLoadingEnd(true);
    }else{
      setPartner({ ...partner,
        userId        : '',
        firstName     : '',
        lastName      : '',
        email         : '',
        image         : '',
        userType      : 0,
        status        : 0,
      });
      setPartnerDataList([]);
      setLoadingEnd(true);
    }
	};

  useOutsideClick(ref, () => {
    setShowModal(false);
  });

  useEffect(() => {
    const currentLoadingRef = loadingRef.current;
  
    if (loadingRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              if(socket && user && !loading){
                getUserList();
              }
            }
          });
        },
        {
          threshold: 0.1,
        }
      );
  
      observer.observe(loadingRef.current);
  
      return () => {
        observer.unobserve(currentLoadingRef as Element);
      };
    }
    // eslint-disable-next-line
  }, [user, partner, loading]);

  useEffect(()=>{
    getUserList();
    // eslint-disable-next-line
  }, [])

  useEffect(()=>{
    if(searchUser!==''){
      getUserList();
    }
    // eslint-disable-next-line
  }, [searchUser])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchUser(event.target.value);
  };

  useEffect(() => {
    const getStatus = () => {
      if (socket && user && partnerDataList.length && document.visibilityState === 'visible') {
        socket.emit('chat_status', {
          userId : user.userId,
          partner : partnerDataList.map(partner => partner._id),
          date: new Date()
        });
      }
    };
    getStatus();
    const intervalId = setInterval(getStatus, 15000);

    return () => {
      clearInterval(intervalId);
    };
  }, [socket, user, partnerDataList, messages]);

  useEffect(() => {
		if (socket) {
			socket.on("chat_status", (data: any) => {
        setOnlineTotal(data.online);
				setStatus(data.data);
			});
		}
    // eslint-disable-next-line
	}, [socket]);

  useEffect(() => {
    if(partnerDataList.length && status.length){
      const statusList = new Map(status.map(item => [item.contactUserId, item]));
      const data = partnerDataList.map(item => {
        const statusItem = statusList.get(item._id);
        const who = statusItem?.messageFrom === user.userId ? 'คุณ : ': '';
        return {
          ...item,
          status      : statusItem?.status,
          from        : statusItem?.messageFrom,
          to          : statusItem?.messageTo,
          lastMessage : who + (statusItem?.lastMessage || ''),
          time        : statusItem?.messageUpdate,
        };
      }).sort((a, b) => +(new Date(b.time)) - +(new Date(a.time)));

      if (!isEqual(data, partnerDataList)) {
        setPartnerDataList(data);
        setPartner({ ...partner, status: statusList.get(partner.userId)?.status || 0 });
      }
    }
    // eslint-disable-next-line
	}, [status]);

  return (
    <div className='left-menu-box bg-white'>
      <div className="nk-chat-aside-head p-4" >
        <div className="nk-chat-aside-user">
          <h6 className="title-message">{t('message')} <span className="badge span-online-count">{onlineTotal}</span></h6>
        </div>
        <ul className="nk-chat-aside-tools g-2">
          <li>
            <div ref={ref} className="dropdown"
              style={{
                position: "relative"
              }}
            >
              <div onClick={() => setShowModal(!showModal)}>
                <div className="btn btn-icon btn-sm btn-trigger dropdown-toggle show" ><em className="icon ni ni-more-h"></em></div>
              </div>
              {showModal && (
                <div className=" dropdown-menu-end border bg-white shadow-sm p-0"
                  style={{
                    position: "absolute",
                    right: 0,
                    top: 20,
                    zIndex: 15,
                    borderRadius: "8px",
                    minWidth: "178px",
                    padding: "0 0"
                  }}
                >
                  <ul className="link-list-opt no-bdr p-0">
                    <li>
                      <a href={"/"}><em className="icon ni ni-eye"></em><span className='w-100'>{t('viewProfile')}</span></a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </li>
        </ul>
      </div>
      <div className=' px-3 pr-4 pb-3'>
        {/* input search */}
        <div className=''>
          <div className="form-control-wrap">
            <div className="form-icon form-icon-left"><em className="icon ni ni-search"></em></div>
            <input type="text" className="form-control search-user-list" id="default-03" placeholder={t('search')||''} value={searchUser} onChange={handleChange} />
          </div>
        </div>
      </div>
      <div className='overflow-scroll  scroll_gray px-3 pr-4' style={{ maxHeight: "calc(100vh - 130px)", minWidth: "330px", paddingBottom: "15px" }}>
        {/* user list */}
        <div className='nk-chat-aside-body mt-2' >
          {partnerDataList.length > 0 ?( partnerDataList.map((item, key) => (
            <div key={key} onClick={() => setOpenChat(true)} className={'card-list-under-line'}>
              <UserCard data={item} />
            </div>
          ))
        ):(
          <div className='card-list-under-line' >
            <li className="chat-item">
              <div className="chat-link chat-open">
                <div className="d-flex">
                  <div className="flex-shrink-0">
                    <em className="icon ni ni-sad search-not-found-icon"></em>
                  </div>
                  <div className="flex-grow-1 ms-3 search-not-found-text">
                    <b>{t('userInformationNotFound')}</b> {t('pleaseMakeAureAllApellingsAreRorrectOrTryUsingDifferentKeywords')}
                  </div>
                </div>
              </div>
            </li>
          </div>
        )}
          { !loading && !loadingEnd && partnerDataList.length > 0 && (
            <div className='d-flex justify-content-center' ref={loadingRef}>
              <ReactLoading type="bubbles" color="#B15FCE" height={100} width={50} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default LeftMenu