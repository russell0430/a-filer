function extractPath(path: string) {
  const temp = path.split("/")
  const folder = temp.slice(0, temp.length - 1).join("/") || "/"
  const last = temp[temp.length - 1]
  if (last.includes(".")) {
    const tempLast = last.split(".")
    const ext = tempLast[tempLast.length - 1]
    return { folder, ext, filename: last }
  } else {
    return { folder: path }
  }
}

export { extractPath }
