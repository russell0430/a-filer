function replaceBackslashes(input: string): string {
  const replaced = input.replace(/\\+/g, "/")
  return replaced
}

function replaceForwardslashes(input: string): string {
  const replaced = input.replace(/\/+/g, "\\")
  return replaced
}

function normalizeForwardslashes(input: string): string {
  const normalized = input.replace(/\//g, "/")
  return normalized
}

function encodeForwardslashes(input: string): string {
  const normalzied = normalizeForwardslashes(input)
  const encoded = encodeURIComponent(normalzied)
  return encoded
}

function decodeForwardslashes(input: string): string {
  const decoded = decodeURIComponent(input)
  return decoded
}

export {
  replaceBackslashes,
  replaceForwardslashes,
  encodeForwardslashes,
  decodeForwardslashes,
}
