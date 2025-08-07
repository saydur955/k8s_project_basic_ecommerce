const ROOT_URL = 'https://accounts.google.com/o/oauth2/v2/auth';


const options = {
  client_id: process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID || '',
  redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_AUTH_REDIRECT_URI || '',
  response_type: 'code',
  scope: [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile'
  ].join(' '),
  access_type: 'offline',
  prompt: 'consent'
}


export const get_google_auth_url = () => {

  const qs = new URLSearchParams(options);

  return `${ROOT_URL}?${qs.toString()}`;

}