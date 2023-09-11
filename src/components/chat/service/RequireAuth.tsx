import React, { ReactNode, useEffect, useState, useContext }  from 'react';
import { useParams } 								                          from 'react-router-dom';
import { UserContext }                                        from './../context/centerContext'
import { getTokenData }                                       from '../service/serviceChat';


interface RequireAuthProps {
  children: ReactNode;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const { user, setUser }                     = useContext(UserContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { userId } 							                  = useParams<{ userId: string }>();

  const checkAuthentication = async () => {
    if(user.token===''||userId!==user.userId){
      try {
        const response = await getTokenData(userId);
        if (response.status) {
          setUser({ ...user,
            userId    : response.data.userId,
            firstName : response.data.firstName,
            lastName  : response.data.lastName,
            email     : response.data.email,
            image     : response.data.image,
            userType  : response.data.userType,
            status    : response.data.status,
            token     : response.data.token,
          });
          setIsAuthenticated(true);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    }else{
      setIsAuthenticated(true);
    }
  };

  useEffect(() => {
    checkAuthentication();
    // eslint-disable-next-line
  }, []);

  if (isAuthenticated) {
    return <>{children}</>;
  } else {
    return null;
  }
};

export default RequireAuth;
