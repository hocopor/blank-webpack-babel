/*

How to use:
url({ path: "/product/110047", api: true });

*/

const defaultOptions = {
  username: "",
  password: "",
  protocol: "",
  hostname: "",
  port: "",
  prefix: "api/v1",
  path: "",
  hash: "",
  params: {},
  location: document.location || "",
  portRequired: false,
  protocolRequired: false,
  hostnameRequired: false,
  pathRequired: true,
  api: false,
  fullUrlNeeded: false
};

function buildHost({
  protocol,
  protocolRequired,
  hostname,
  hostnameRequired,
  port,
  portRequired,
  location
}) {
  const host = [
    buildProtocol(protocol, protocolRequired, location),
    buildHostname(hostname, hostnameRequired, location),
    buildPort(port, portRequired, location)
  ];
  return host.join("");
}

function buildProtocol(protocol, protocolRequired, location) {
  protocol = protocolRequired
    ? protocol || location.protocol.replace(":", "")
    : protocol;
  return protocol !== "" ? `${protocol}:` : "";
}

function buildHostname(hostname, hostnameRequired, location) {
  hostname = hostnameRequired ? hostname || location.hostname : hostname;
  return hostname !== "" ? `//${hostname.replace("/", "")}` : "";
}

function buildPort(port, portRequired, location) {
  port = portRequired ? port || location.port : port;
  return port !== "" ? `:${port}` : "";
}

function buildUri({ prefix, api, path, params, hash }) {
  const uri = [
    buildPrefix(prefix, api),
    buildPath(path),
    buildParams(params),
    buildHash(hash)
  ];
  return uri.join("");
}

function buildPrefix(prefix, api) {
  if (api)
    return prefix !== ""
      ? `${prefix.charAt(0) !== "/" ? "/" : ""}${prefix}`
      : "";
  else return "";
}

function buildPath(path = "") {
  return path.charAt(0) === "/" ? path : `/${path}`;
}

function buildParams(params = {}) {
  let result = [];
  for (let key in params) {
    result.push(`${key}=${params[key]}`);
  }
  result = result.join("&");
  return result !== "" ? `?${result}` : "";
}

function buildHash(hash) {
  return hash !== "" ? `#${hash}` : "";
}

export default function url(options = {}) {
  // Before merge with default options
  if (options.prefix !== undefined) options.api = true;

  // Merge
  options = Object.assign({}, defaultOptions, options);

  // After merge with default options
  if (options.fullUrlNeeded) {
    options.protocolRequired = true;
    options.hostnameRequired = true;
  }

  if (options.port !== "") options.hostnameRequired = true;
  if (options.protocol !== "") options.hostnameRequired = true;

  const host = buildHost(options);
  const uri = buildUri(options);

  return `${host}${uri}`;
}
