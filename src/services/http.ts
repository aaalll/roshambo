import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import qs from 'qs';
import { ResponseError } from 'models/response-error/response-error.model';

let apiRoot = '';
if (process.env.REACT_APP_ONBOARD_API) {
  apiRoot = `${process.env.REACT_APP_ONBOARD_API}/api`;
} else {
  apiRoot = `${window.location.protocol}//${window.location.hostname}:6001/api`;
}

export default async function http({ 
  method, 
  url, 
  data, 
  accessToken, 
  params
}: {
  method: AxiosRequestConfig["method"];
  url: string;
  data?: {[key: string]: any}
  accessToken?: string;
  params?: string;
}) {
  let config: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/json'
    },
    method: method,
    url: apiRoot + url,
    params,
    paramsSerializer: function (p: string) {
      return qs.stringify(p, {arrayFormat: 'repeat'});
    }
  };

  if (data) config.data = data;
  if (!!accessToken) config.headers["Authorization"] = accessToken;
  try {
    const response = await axios.create()(config);
    return response.data;
  } catch (err) {
    const axiosError = err as AxiosError<ResponseError>;
    if (
      axiosError.response && 
      axiosError.response.data && 
      axiosError.response.data.message &&
      typeof axiosError.response.data.message === 'string'
    ) {
      throw axiosError.response.data;
    }
    
    throw new Error('Something went wrong');
  }
}

export function download({ 
  method, 
  url, 
  data, 
  accessToken, 
  params
}: {
  method: AxiosRequestConfig["method"];
  url: string;
  data?: {[key: string]: any}
  accessToken?: string;
  params?: string;
}) {
  let config: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/json'
    },
    method: method,
    responseType: 'blob',
    url: apiRoot + url,
    params,
    paramsSerializer: function (p: string) {
      return qs.stringify(p, {arrayFormat: 'repeat'});
    },
  };

  if (data) config.data = data;
  if (!!accessToken) config.headers["Authorization"] = accessToken;
  return axios.create()(config);
}