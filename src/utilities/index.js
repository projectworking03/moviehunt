// Converts an object of URL options into a query-URL form
export const convertOptionsToUrl = (options) => {
  let str = "";

  Object.keys(options).forEach(
    (key) => (str += key + "=" + options[key] + "&")
  );

  return str;
};
