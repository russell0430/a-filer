/* eslint-disable no-useless-escape */
const regexPrefix = /^[\\\/]{1,}/
const regex = /[\\\/]{1,}/
/**
 *
 * @param pathname
 * @param withSlash prefix with '/' or not
 * @returns
 */
const formatPathname = (pathname: string, withSlash: boolean = false) => {
  return (
    (withSlash ? "/" : "") +
    pathname.replace(regex, "/").replace(regexPrefix, "")
  )
}
export { formatPathname }
