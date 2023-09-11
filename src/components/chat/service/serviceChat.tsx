import axios from "axios";
import { io } from "socket.io-client";

const baseURL           = "http://localhost:3001/api";
const socketServer      = "http://localhost:3001";
axios.defaults.baseURL  = baseURL;

export const getTokenData = async (id:any) => {
  try {

    const response = await axios.get(`/login/${id}`);
    if(response.status=== 200 && response.data.verifyToken === 1){
      localStorage.setItem('userId',    response.data.data._id);
      localStorage.setItem('firstName', response.data.data.firstName);
      localStorage.setItem('lastName',  response.data.data.lastName);
      localStorage.setItem('email',     response.data.data.email);
      localStorage.setItem('image',     response.data.data.image);
      localStorage.setItem('userType',  response.data.data.userType);
      localStorage.setItem('status',    response.data.data.status);
      localStorage.setItem('token',     response.data.token);
      return {
        status : true,
        data : {
          userId    : response.data.data._id,
          firstName : response.data.data.firstName,
          lastName  : response.data.data.lastName,
          email     : response.data.data.email,
          image     : response.data.data.image,
          userType  : response.data.data.userType,
          status    : response.data.data.status,
          token     : response.data.token,
        },
      };
    }else{
      return {status : false, data : {}};
    }

  } catch (error) {
    console.error(error);
    return {status : false, data : {}};
  }
};

export const getUserData = () => {
  try {
    return {
      status  : true,
      data    : {
        userId    : localStorage.getItem('userId'),
        token     : localStorage.getItem('token'),
        userType  : localStorage.getItem('userType'),
        status    : localStorage.getItem('status'),
      }
    };

  } catch (error) {
    return {
      status  : false,
      data    : {}
    };
  }
};

const createHeader = () => {
  const user = getUserData();

  const payloadHeader = {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${user.data.token}`,
    },
  };
  return payloadHeader;
};

export const iniSocket = () => {
  const user = getUserData();

  const socket = io(socketServer, {
    extraHeaders: {
      authorization : `Bearer ${user.data.token}`,
      userid        : `${user.data.userId}`,
      Usertype      : `${user.data.userType}`
    },
  });
  return socket;
};

export const getUserListData = async (userId:string, search:string, page:number, limit:number) => {
  const header = await createHeader();
  try {
    const response = await axios.post(`/contact/list`, {
      userId  : userId,
      search  : search,
      page    : page,
      limit   : limit
    }, header);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};