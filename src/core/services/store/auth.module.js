import isPast from 'date-fns/isPast';
import parseISO from 'date-fns/parseISO';
import ApiService from '@/core/services/api.service';
import JwtService from '@/core/services/jwt.service';

// action types
export const VERIFY_AUTH = 'verifyAuth';
export const LOGIN = 'login';
export const LOGOUT = 'logout';
export const FORGOT = 'forgot';
export const REGISTER = 'register';
export const UPDATE_PASSWORD = 'updateUser';

// mutation types
export const PURGE_AUTH = 'logOut';
export const SET_AUTH = 'setUser';
export const SET_PASSWORD = 'setPassword';
export const SET_ERROR = 'setError';
export const SET_REFRESH_TOKEN = 'setResfreshToken';

const state = {
  errors: null,
  user: {},
  isAuthenticated: !!JwtService.getToken(),
};

const getters = {
  currentUser(state) {
    return state.user;
  },
  isAuthenticated(state) {
    return state.isAuthenticated;
  },
};

const actions = {
  [LOGIN](context, credentials) {
    return new Promise((resolve) => {
      ApiService.post('auth/login', credentials)
        .then(({ data }) => {
          if (data.user.role === 'admin' || data.user.role === 'moderater') {
            context.commit(SET_AUTH, data);
            resolve(data);
          } else {
            context.commit(SET_ERROR, 'Admin Bölümüne Girişte Yetkili Değilsiniz!');
          }
        })
        .catch(({ message }) => {
          context.commit(SET_ERROR, message);
        });
    });
  },
  [LOGOUT](context) {
    context.commit(PURGE_AUTH);
  },
  [REGISTER](context, credentials) {
    return new Promise((resolve) => {
      ApiService.post('auth/register', credentials)
        .then(({ data }) => {
          context.commit(SET_AUTH, data);
          resolve(data);
        })
        .catch(({ message }) => {
          context.commit(SET_ERROR, message);
        });
    });
  },
  [FORGOT](context, credentials) {
    return new Promise((resolve) => {
      ApiService.post('auth/forgot-password', credentials)
        .then(({ data }) => {
          resolve(data);
        })
        .catch(({ message }) => {
          context.commit(SET_ERROR, message);
        });
    });
  },
  [VERIFY_AUTH](context) {
    const token = JwtService.getToken();

    if (token) {
      console.log(
        'expired:',
        isPast(parseISO(token.access.expires)),
        isPast(parseISO(token.refresh.expires)),
      );
      if (
        token.access
                && token.access.token
                && token.access.expires
                && isPast(parseISO(token.access.expires))
                && !isPast(parseISO(token.refresh.expires))
      ) {
        ApiService.setHeader();
        ApiService.post('/auth/refresh-tokens', {
          refreshToken: token.refresh.token,
        })
          .then(({ data }) => {
            context.commit(SET_REFRESH_TOKEN, data);
          })
          .catch(({ message }) => {
            context.commit(SET_ERROR, message);
          });
      }
      if (
        isPast(parseISO(token.access.expires))
                && isPast(parseISO(token.refresh.expires))
      ) {
        context.commit(PURGE_AUTH);
      }
    } else {
      context.commit(PURGE_AUTH);
    }
  },
  [UPDATE_PASSWORD](context, payload) {
    const password = payload;

    return ApiService.put('password', password).then(({ data }) => {
      context.commit(SET_PASSWORD, data);
      return data;
    });
  },
};

const mutations = {
  [SET_ERROR](state, error) {
    state.errors = error;
  },
  [SET_AUTH](state, payload) {
    state.isAuthenticated = true;
    state.user = payload.user;
    state.errors = {};
    JwtService.saveToken(payload.tokens);
  },
  [SET_REFRESH_TOKEN](state, payload) {
    state.isAuthenticated = true;
    state.errors = {};
    JwtService.saveToken(payload);
  },
  [SET_PASSWORD](state, password) {
    state.user.password = password;
  },
  [PURGE_AUTH](state) {
    state.isAuthenticated = false;
    state.user = {};
    state.errors = {};
    JwtService.destroyToken();
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
