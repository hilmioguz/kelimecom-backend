import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import JwtService from '@/core/services/jwt.service';

/**
 * Service to call HTTP request via Axios
 */
const ApiService = {
  init() {
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = 'https://kelime-apiend:5001/v1/admin';
  },

  /**
     * Set the default HTTP request headers
     */
  setHeader() {
    let token = JwtService.getToken();
    token = token.access ? token.access.token : '';
    Vue.axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },

  query(resource, params) {
    return Vue.axios.get(resource, params).catch((error) => {
      // console.log(error);
      throw new Error(`ApiService ${error}`);
    });
  },

  /**
     * Send the GET HTTP request
     * @param resource
     * @param slug
     * @returns {*}
     */
  get(resource, slug = '') {
    return Vue.axios.get(`${resource}/${slug}`).catch((error) => {
      // console.log(error);
      throw new Error(`ApiService ${error}`);
    });
  },

  /**
     * Set the POST HTTP request
     * @param resource
     * @param params
     * @returns {*}
     */
  post(resource, params) {
    return Vue.axios.post(`${resource}`, params);
  },

  /**
     * Send the UPDATE HTTP request
     * @param resource
     * @param slug
     * @param params
     * @returns {IDBRequest<IDBValidKey> | Promise<void>}
     */
  update(resource, slug, params) {
    return Vue.axios.put(`${resource}/${slug}`, params);
  },
  /**
     * Send the PATCH HTTP request
     * @param resource
     * @param slug
     * @param params
     * @returns {IDBRequest<IDBValidKey> | Promise<void>}
     */
  patch(resource, slug, params) {
    return Vue.axios.patch(`${resource}/${slug}`, params);
  },
  /**
     * Send the PUT HTTP request
     * @param resource
     * @param params
     * @returns {IDBRequest<IDBValidKey> | Promise<void>}
     */
  put(resource, params) {
    return Vue.axios.put(`${resource}`, params);
  },

  /**
     * Send the DELETE HTTP request
     * @param resource
     * @param slug
     * @returns {*}
     */
  delete(resource, slug) {
    return Vue.axios.delete(`${resource}/${slug}`).catch((error) => {
      // console.log(error);
      throw new Error(`ApiService ${error}`);
    });
  },

  deleteSub(resource, maddeId, anlamId) {
    return Vue.axios.delete(`${resource}/${maddeId}/${anlamId}`).catch((error) => {
      // console.log(error);
      throw new Error(`ApiService ${error}`);
    });
  },
};

export default ApiService;
