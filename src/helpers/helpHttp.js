export const helHttp = () => {
  const customFetch = (endpoint, options) => {
    const defualtHeaders = {
      accept: "application/json",
    };

    const controller = new AbortController();
    options.signal = controller.signal;

    options.method = options.method || "GET";
    options.headers = options.headers
      ? { ...defualtHeaders, ...options.headers }
      : defualtHeaders;

    options.body = JSON.stringify(options.body) || false;
    if (!options.body) delete options.body;

    console.log("options", options);
    setTimeout(() => controller.abort(), 3000);

    return fetch(endpoint, options)
      .then((res) => {
        return res.ok
          ? res.json()
          : Promise.reject({
              err: true,
              status: res.status || "00",
              statusText: res.statusText || "Ocurrió un error",
            });
      })
      .catch((err) => err);
  };

  const get = (url, options = {}) => customFetch(url, options);
  const post = (url, options = {}) => {
    options.method = "POST";
    return customFetch(url, options);
  };

  const put = (url, options = {}) => {
    options.method = "PUT";
    return customFetch(url, options);
  };

  const del = (url, options = {}) => {
    options.method = "DELETE";
    return customFetch(url, options);
  };

  return {
    get,
    post,
    put,
    del,
  };
};
