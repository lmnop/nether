/* global fetch */

import { Routes } from './constants';

const makeRequest = async (method, url, body) => {
  try {
    let request = {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Basic ${window.btoa(`${window.apiUser}:${window.apiPass}`)}`,
      },
    };

    if (body) {
      request.body = JSON.stringify(body);
    }

    let baseUrl = 'http://localhost:5000';

    if (process.env.NODE_ENV === 'production') {
      baseUrl = 'https://api.lmnop.network';
    }

    const response = await fetch(`${baseUrl}${url}`, request);

    let data = await response.json();

    if (!response.ok) {
      return Promise.reject({
        message: data.error,
      });
    }

    return Promise.resolve(data);
  } catch (err) {
    return Promise.reject({
      message: 'failed making request',
    });
  }
};

export const createAccount = async (data) => makeRequest('POST', `${Routes.CREATE_ACCOUNT}`, data);
export const unlockAccount = async (data) => makeRequest('POST', `${Routes.UNLOCK_ACCOUNT}`, data);
export const orderAlpha = async (data) => makeRequest('POST', `${Routes.ORDER_ALPHA}`, data);
