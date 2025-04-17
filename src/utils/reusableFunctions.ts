type QueryParams = { [key: string]: string | number | boolean }

export default function reusableFunctions() {
  function queryString(param: QueryParams): string {
    return Object.keys(param)
      .map((key) => `${key}=${encodeURIComponent(param[key])}`)
      .join('&')
  }

  return { queryString }
}
