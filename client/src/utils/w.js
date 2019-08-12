import wretch from "wretch";
import { Auth } from "aws-amplify";

const api = wretch().defer((w, url, options) => {
  const { token } = options.context;
  return w.auth(`Basic ${token.idToken.jwtToken}`);
});

export const postData = async (url, body) => {
  let token = await Auth.currentSession();
  return api
    .options({ context: { token } })
    .url(url)
    .post({ ...body })
    .json();
};

export const fetchData = async (url, callback) => {
  let token = await Auth.currentSession();
  await api
    .options({ context: { token } })
    .url(url)
    .get()
    .json(json => {
      callback(json);
    });
};

export default api;
