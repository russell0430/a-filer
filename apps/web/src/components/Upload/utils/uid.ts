const now = +new Date()

let index = 0

export default () => `upload-${now}-${++index}`
