export default function reusableFunctions() {
  function queryString(param: any) {
    return Object.keys(param)
      .map((key) => `${key}=${encodeURIComponent(param[key])}`)
      .join('&')
  }

  return {
    queryString
  }
}
