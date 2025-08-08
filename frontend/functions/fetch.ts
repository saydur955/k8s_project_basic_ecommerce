import { getJWTToken } from "@/hooks/useAuth";
import { is_server } from "./is_server.func";

type T_param = {
  url: string,
  methodType?: 'GET' | 'POST' | 'PATCH' | 'DELETE',
  data?: { [key: string]: any },
  outside_server?: boolean;
  options?: RequestInit
};

export async function Fetch<T>({
  url, methodType = 'GET', data, outside_server = false, options
}: T_param): Promise<T> {

  let targetUrl = '';

  let headers: any =  {
    'Content-Type': 'application/json'
  }

  // if request not goes outside of the server
  if(!outside_server) {

    if (!url.startsWith('/')) {
      targetUrl = `/${url}`;
    }

    let serverUrl = '/api';
    serverUrl = 'http://foodshop.local/api';

    if(is_server) {
      serverUrl = process.env.SERVER_URL || 'http://foodshop.local/api';
    }
    else {
      const jwtToken = getJWTToken();

      if(jwtToken) {
        headers = {
          ...headers,
          'Authorization': `Bearer ${jwtToken}`
        }
      }

    }

    targetUrl = `${serverUrl}${url}`;

  }

  const resS = await fetch(targetUrl, {
    method: methodType,
    headers,

    ...(['POST', 'PATCH'].includes(methodType) && data && { 
      body: JSON.stringify(data) 
    }),

    ...(options ? options: {})
    

  });

  if (!resS.ok) {
    const errRes = await resS.json();
    throw new Error(errRes || 'error');
  }

  const resSData = await resS.json() as T;
  return resSData;

}