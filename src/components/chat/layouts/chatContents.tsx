import React, {useContext, useRef, useEffect, useState} from 'react'
import ReactLoading                                     from "react-loading";
import { PartnerContext, UserContext,  MessagesContext} from './../context/centerContext'
import Message                                          from '../card/message/message'

interface ChildProps {
  socket: any;
}

const ChatContents: React.FC<ChildProps> = ({ socket }) => {

  const { user }                      = useContext(UserContext);
  const { partner }                   = useContext(PartnerContext);
  const { messages, setMessages }     = useContext(MessagesContext);
  const [loading, setLoading]         = useState<boolean>(false);
  const [loadingEnd, setLoadingEnd]   = useState<boolean>(false);
  const [goToBottom, setGoToBottom]   = useState<boolean>(false);
  const [temporary, setTemporary]     = useState<any[]>([]);
  const [refs, setRefs]               = useState<{ [key: string]: React.RefObject<HTMLDivElement> }>({});
  const loadingRef                    = useRef<HTMLDivElement>(null);
  const scollRef                      = useRef<HTMLDivElement>(null);
  const limit                         = 10;

  const isSameDay = (dateStr1: string, dateStr2: string): boolean => {
    const d1 = new Date(dateStr1);
    const d2 = new Date(dateStr2);
    return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
  };

  useEffect(() => {
    const currentLoadingRef = loadingRef.current;
  
    if (loadingRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              if(socket && user && partner && messages.length && !loading){
                socket.emit('chat_history_more', {
                  userId : user.userId,
                  partnerId : partner.userId,
                  lastMessage : messages[0],
                  limit : limit
                });
                setLoading(false);
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
  }, [socket, messages, user, partner, loading]);  
  
  useEffect(() => {
		if (socket) {
			socket.on("chat_history_more", (data: any) => {
        if(data.data.length){
          setTemporary((prevMessagesTemp) => [...data.data, ...prevMessagesTemp]);
          setLoadingEnd(false);
        }else{
          if(data.status===201){
            setLoadingEnd(true);
          }
        }
			});

      socket.on("chat_message", (data: any) => {
        if(data){
          setMessages((prevMessages) => [...prevMessages, ...[data].filter(item2 => !prevMessages.some(item1 => item1._id === item2._id))]);
          handleGoToBottom();
        }
			});
		}
    // eslint-disable-next-line
	}, [socket]);

  const handleScrollToElement = (index: string) => {
    refs[index]?.current?.scrollIntoView();
  };

  useEffect(() => {
		const groupedData: any = {};
		temporary.forEach((item:any) => {
		if (!groupedData[item._id]) {
			groupedData[item._id] = item;
		}
		});
		const uniqueData = Object.values(groupedData) as any[];
    
    setTimeout(async() => {
      if(uniqueData.length && temporary.length){
        setMessages((prevMessages) => [...uniqueData.filter(item2 => !prevMessages.some(item1 => item1._id === item2._id)), ...prevMessages]);
        const newRefs: { [key: string]: React.RefObject<HTMLDivElement> } = {};
        messages.forEach(msg => {
          newRefs[msg._id] = React.createRef<HTMLDivElement>();
        });
        setRefs(newRefs);
        handleScrollToElement(messages[limit]?messages[limit]._id:'');
        setLoading(false);

        setTemporary([]);
      }
    }, 500);
    // eslint-disable-next-line
	}, [temporary]);

  useEffect(() => {
    const handleScroll = () => {

      if(scollRef.current){
        let { scrollTop } = scollRef.current;
        
        if(Math.abs(scrollTop)>100){
          setGoToBottom(true);
        }else{
          setGoToBottom(false);
        }
      }

    }


    if (scollRef.current) {
      scollRef.current.addEventListener('scroll', handleScroll);
    }

    const divScollLoadMoreRef = scollRef.current;

    return () => {
      if (divScollLoadMoreRef) {
        divScollLoadMoreRef.removeEventListener('scroll', handleScroll);
      }
    };
  }, [scollRef]);

  useEffect(() => {
    handleGoToBottom();
  }, []);

  const handleGoToBottom = () => {
    if (scollRef.current) {
        const totalHeight = scollRef.current.scrollHeight;
        scollRef.current.scroll({
            top: totalHeight,
            behavior: 'smooth'
        });
        setTimeout(() => {
            scollRef.current?.scroll({
                top: 0,
                behavior: 'smooth'
            });
        }, 100);

        setGoToBottom(false);
    }
  };

  return (
    <div className="message-container" >
      {goToBottom && (
      <button className="goto-chat-bottom-button d-flex align-items-center" onClick={handleGoToBottom}>
        <em className="icon ni ni-arrow-down"></em>
      </button>
      )}
      <div className="overflow-scroll w-full scroll_gray chat-scoll-down" ref={scollRef}>
        <div className="p-4">
          { messages.length === 0 && (
            <div className='d-flex justify-content-center' ref={loadingRef}>
              <ul className="chat-meta">
                  <li>ยังไม่มีประวัติการสนทนา</li>
              </ul>
            </div>
          )}
          { loadingEnd && messages.length > 0 && (
            <div className='d-flex justify-content-center' ref={loadingRef}>
              <ul className="chat-meta">
                  <li>สิ้นสุดประวัติการสนทนา</li>
              </ul>
            </div>
          )}
          { !loading && !loadingEnd && messages.length > 0 && (
            <div className='d-flex justify-content-center' ref={loadingRef}>
              <ReactLoading type="bubbles" color="#B15FCE" height={100} width={50} />
            </div>
          )}
          {messages.length > 0 && messages.map((item, key) => (
              item.messageType === "message" && ((item.from === user.userId && item.to === partner.userId) || (item.from === partner.userId && item.to === user.userId)) && (
                <div key={key} ref={refs[item._id]}>
                  { messages[key-1] && !isSameDay(item.datetime, messages[key-1].datetime) && (
                    <Message 
                      type="line"
                      datetime={new Date(messages[key].datetime)}
                    />
                  )}
                  <Message
                    key={key}
                    type={item.messageType}
                    who={(item.from===user.userId)?'me':'you'}
                    name={(item.from===user.userId)?'':`${partner.firstName} ${partner.lastName}`}
                    data={item.message} 
                    datetime={new Date(item.datetime)}
                  />
                </div>
              )
          ))}

          {/*<Message 
            type="message" 
            who={"you"}
            name={"นาย สมาณย์ ฉันมิตร"}
            data={"ฉันต้องการผลิตกระเป๋าเป้สำหรับนักเดินทาง ฉันอยากให้มีความทนทานและมีฟีเจอร์พิเศษเช่นช่องเสียบแท่นชาร์จและกันน้ำ"} 
            datetime={new Date()}
          />

          <Message 
            type="line"
            datetime={new Date()}
          />

          <Message 
            type="file" 
            who={"you"}
            name={"นาย สมาณย์ ฉันมิตร"}
            data={{url:"/download?key=dddddddddd", fileName: "แบบร่าง.pdf",size:'1.2 MB'}}
            datetime={new Date()}
          />

          <Message 
            type="message" 
            who={"me"}
            name={"นาย สมาณย์ ฉันมิตร"}
            data={"แน่นอนครับ คุณคิดว่าคุณจะต้องเสียงบเท่าไหร่ในการจ้างบริษัทนี้ทำสินค้าครับ?"} 
            datetime={new Date()}
          />

          <Message 
            type="image" 
            who={"you"}
            name={"นาย สมาณย์ ฉันมิตร"}
            data={"https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg"}
            datetime={new Date()}
          />

          <Message 
            type="line"
            datetime={new Date()}
          />

          <Message 
            type="file" 
            who={"me"}
            name={"นาย สมาณย์ ฉันมิตร"}
            data={{url:"/download?key=dddddddddd", fileName: "แบบร่าง.pdf",size:'1.2 MB'}}
            datetime={new Date()}
          />

          <Message 
            type="image" 
            who={"me"}
            name={"นาย สมาณย์ ฉันมิตร"}
            data={"https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg"}
            datetime={new Date()}
          />

          <Message 
            type="message" 
            who={"me"}
            name={"นาย สมาณย์ ฉันมิตร"}
            data={"โอเคครับ อย่าลืมสอบถามเกี่ยวกับระยะเวลาในการผลิตและการส่งมอบสินค้าด้วยนะครับ เพื่อให้คุณวางแผนได้ดีขึ้น"} 
            datetime={new Date()}
          /> */}
        </div>
        
      </div>
    </div>
    
  );
};

export default ChatContents;
