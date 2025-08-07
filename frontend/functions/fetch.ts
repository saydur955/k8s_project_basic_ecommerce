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

  // if request not goes outside of the server
  if(!outside_server) {

    if (!url.startsWith('/')) {
      targetUrl = `/${url}`;
    }

    const serverUrl = process.env.SERVER_URL || 'http://foodshop.local/api';

    targetUrl = `${serverUrl}${url}`;

  }

  const resS = await fetch(targetUrl, {
    method: methodType,
    headers: {
      'Content-Type': 'application/json'
    },
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