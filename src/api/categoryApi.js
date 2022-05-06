import axiosClient from './axiosClient';

const categoryApi = {
  async getAll(params) {
    const categoryList = await axiosClient.get('/categories', { params });
    return categoryList;
  },
};

export default categoryApi;
