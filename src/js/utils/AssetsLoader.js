import Request from "utils/Request.js";
import FetchError from "errors/FetchError.js";

//
// Draft
//

const defaultOptions = {
  contentType: ""
};

const AssetsLoader = function(_path, _options = {}, _callback = function() {}) {
  const options = Object.assign({}, defaultOptions, _options);

  Request.api(_path, options)
    .then(
      response => {
        if (isImg) return response.blob();
        if (isMd) return response.text();
        if (isJs) return response.text();
        if (isCss) return response.text();
        if (isJson) return response.text();

        throw new UnexpectedTypeError("message", "currentType", "expectedType");
      },
      error => {
        throw new FetchError();
      }
    )

    .then(data => {
      //data.html;
      //data.css;
      //data.js;
      //data.md;
      //data.json;
      //...
    })

    .catch(error => {});
};

export default AssetsLoader;
