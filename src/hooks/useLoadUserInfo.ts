import { useEffect, useState } from 'react';
import { getUserInfo } from '../services/user';
import { loginReducer } from '../store/userReducer';
import { getToken } from '../utils/token';
import { useAppDispatch } from './useRedux';

function useLoadUserInfo() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const token = getToken();

  useEffect(() => {
    async function get() {
      if (token) {
        const { _id, username, age, email } = await getUserInfo();
        // 存储到 redux
        dispatch(loginReducer({ _id, username, age, email }));
      }
      setLoading(false);
    }
    get();
  }, [token]);

  return loading;
}

export default useLoadUserInfo;
