import App from "app.js";
import EventBus from "utils/EventBus.js";
import UrlBuilder from "utils/UrlBuilder.js";

const settings = {};

const defaultOptions = {
  method: "GET",
  headers: {},
  body: {},
  mode: "same-origin", // "same-origin|no-cors|cors"
  credentials: "omit", // "omit|same-origin|include"
  cache: "no-cache", // "default|no-store|reload|no-cache|force-cache|only-if-cached"
  redirect: "follow" // "follow|error"
};

const Request = (function() {
  const onFullfield = function(response) {};

  const onReject = function(error) {
    if (App.config.debug) EventBus.emit("fetch:rejected", error);
  };

  const request = function(_path, _options) {
    return fetch(_path, _options)
      .then(onFullfield)
      .catch(onReject);
  };

  const mergeOptions = function(_options) {
    return Object.assign({}, defaultOptions, _options);
  };

  const buildPath = function(_path = {}) {
    const path = {};

    if (typeof _path == "object") path = new UrlBuilder(_path);
    else path = _path;

    return path;
  };

  const api = function(_path, _options) {
    const options = mergeOptions(_options);
    const path = buildPath({
      path: _path,
      api: true,
      params: options.body && options.method == "GET" ? options.body : {}
    });

    return request(path, options);
  };

  const get = function(_path, _options) {
    const path = buildPath(_path);
    const options = mergeOptions(_options);
    options.method = "GET";
    return request(_path, options);
  };

  const post = function(_path, _options = {}) {
    const options = mergeOptions(_options);
    options.method = "POST";
  };

  const put = function(_path, _options = {}) {
    const options = mergeOptions(_options);
    options.method = "PUT";
  };

  const patch = function(_path, _options = {}) {
    const options = mergeOptions(_options);
    options.method = "PATCH";
  };

  const remove = function(_path, _options = {}) {
    const options = mergeOptions(_options);
    options.method = "DELETE";
  };

  const jsonp = function(_path, _options = {}) {
    const options = mergeOptions(_options);
    options.method = "JSONP";
  };

  return { get, post, put, patch, remove, jsonp };
})();

export default Request;
