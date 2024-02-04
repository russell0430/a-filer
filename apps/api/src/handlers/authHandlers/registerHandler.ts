import { createUser } from "../../prisma/User"
import { Request, Response } from "express"

export default async function registerHandler(req: Request, res: Response) {
  if (req.method.toLowerCase() !== "post") {
    res.status(405).send({ msg: "method not support" }).end()
    console.log(req.method)
    return
  }
  //
  const { username = "", password = "", email = "email" } = req.body || {}
  if (username === "" || password === "") {
    res.status(400).send({ msg: "illegal username or password" })
    console.log(username, password)
    return
  }

  try {
    const result = await createUser({ username, password, email })
    if (result.success) {
      return res.status(200).send(result)
    } else {
      return res.status(200).send(result)
    }
  } catch (err) {
    console.log(err)
    res.status(500).send("Internal Error").end()
    return
  }
}
