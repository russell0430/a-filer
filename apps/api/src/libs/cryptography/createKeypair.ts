import crypto from "node:crypto"
import fs from "node:fs"
import { dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
function getKeyPair() {
  const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: "pkcs1",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs1",
      format: "pem",
    },
  })

  fs.writeFileSync(`${__dirname}/id_rsa_pub.pem`, publicKey)
  fs.writeFileSync(`${__dirname}/id_rsa_priv.pem`, privateKey)
}
getKeyPair()
