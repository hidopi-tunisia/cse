import axios from "axios";

axios.defaults.timeout = 10000;

const client = async (endpoint, method, data = {}) => {
  try {
    let response;

    let instance = axios.create();

    if (method === "get") {
      if (Object.keys(data).length > 0) {
        response = await instance.get(endpoint, { params: data });
      } else {
        response = await instance.get(endpoint);
      }
    } else {
      response = await instance.request({
        url: endpoint,
        method,
        data,
      });
    }

    return response.data;
  } catch (error) {
    if (error.code === "ECONNABORTED") {
      return {
        error: { message: "Délai d'attente dépassé, connexion interrompue." },
      };
    }
    if (error.response) {
      return error.response.data;
    }
    if (error.message) {
      return {
        error: { message: error.message },
      };
    }
    return {
      error: { message: "Une erreur est survenue" },
    };
  }
};

const cancel = (source) => {
  source.cancel();
};

export { client, cancel };
