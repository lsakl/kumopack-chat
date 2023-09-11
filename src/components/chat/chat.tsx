import React, { useState, useEffect, useContext }		from 'react'
import { PartnerContext, UserContext, MessagesContext }	from './context/centerContext';
import { iniSocket }									from './service/serviceChat'
import LeftMenu 										from './layouts/leftMenu'
import TopMenu 											from './layouts/topMenu'
import ChatEditor 										from './layouts/chatEditor'
import ChatContents 									from './layouts/chatContents'
import RightMenu 										from './layouts/rightMenu/simpleRightMenu'

import './language/i18n'
import './../../styles/App.css'
import './../../styles/index.scss'
import './../../styles/globals.css'
import '../../../node_modules/font-awesome/css/font-awesome.min.css'

function Chat(): JSX.Element {
	const [showRightMenu, setShowRightMenu] = useState<boolean>(false);
	const [openChat, setOpenChat] 			= useState<boolean>(false);
	const [socket, setSocket] 				= useState<any>(null);
	const [temporary, setTemporary]			= useState<any[]>([]);
	const [partnerId, setPartnerId]			= useState<string>('');
	const [windowWidth, setWindowWidth] 	= useState(window.innerWidth);

	const { user }							= useContext(UserContext);
	const { partner }						= useContext(PartnerContext);
	const { setMessages }					= useContext(MessagesContext);

	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};

		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	useEffect(()=>{
		if (windowWidth > 1300) {
			setShowRightMenu(true)
		}
	}, [windowWidth])

	useEffect(() => {
		const connectSocket = async () => {
			const socketInstance = await iniSocket();
			setSocket(socketInstance);
		};
	
		connectSocket();
		
		return () => {
			if (socket) {
				socket.disconnect();
			}
		};
		//eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (socket) {
			socket.on("chat_history", (data: any) => {
				setMessages(data.data);
			});
		}
		// eslint-disable-next-line
	}, [socket]);

	useEffect(() => {
		const groupedData: any = {};
		temporary.forEach((item:any) => {
		if (!groupedData[item._id]) {
			groupedData[item._id] = item;
		}
		});
		const uniqueData = Object.values(groupedData) as any[];
		if(uniqueData.length){
			setMessages((prevMessages) => [...prevMessages, ...uniqueData]);
			setTemporary([]);
		}
		// eslint-disable-next-line
	}, [temporary]);

	useEffect(() => {
		if (socket && user.userId!=='' && partner.userId!=='' && partner.userId!==partnerId) {
			socket.emit('chat_history', {
				from  : user.userId,
				to    : partner.userId,
				page  : 1,
				limit : 20
			});
			setPartnerId(partner.userId);
		}
	}, [socket, partner, user, partnerId]);

	return (
		<div
			className="nk-chat d-lg-flex w-full flex-row overflow-hidden my_container"
			style={{
					maxHeight: '100vh',
					position: 'relative',
					paddingRight: `${showRightMenu ? '325px' : ''}`,
					transition: 'all 0.01s',
					border: '1px solid #D0D5DD',
					borderRadius: '8px',
				}}
		>

			{ ((!openChat && windowWidth < 992) || (windowWidth >= 992)) && (
				<div style={{ height: '100vh' }}>
					{socket ? <LeftMenu socket={socket} setOpenChat={setOpenChat} /> : <div>Connecting...</div>}
				</div>
			)}
			
			{((openChat && windowWidth < 992) || (windowWidth >= 992)) && (
				<div 
					className={`w-100 border`}
					style={(partner.userId!=='')?{
						position: 'relative',
						height: '100vh',
						backgroundColor: '#FCFCFD',
					}:{
						position: 'relative',
						height: '100vh',
						backgroundColor: '#FCFCFD',
						pointerEvents: "none", 
						opacity: "0.5"
					}}
				>
					<TopMenu
						setShowRightMenu={setShowRightMenu}
						setOpenChat={setOpenChat}
						showRightMenu={showRightMenu}
					/>
					
					{socket ? <ChatContents socket={socket} /> : <div>Connecting...</div>}
					
					{socket ? <ChatEditor socket={socket}/> : <div>Connecting...</div>}

				</div>
			)}
			
			<div style={partner.userId!==''?{}:{pointerEvents: "none", opacity: "0.5"}}>
				<RightMenu show={showRightMenu} setShowRightMenu={setShowRightMenu} />
			</div>
		</div>
	)
}

export default Chat
