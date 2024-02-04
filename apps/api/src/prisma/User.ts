import prisma from "../libs/prisma"
import { ActionResponse } from "shared-types"
import { genPasword, validatePassword } from "../libs/auth/passwordUtil"
import { UserForAuthorization } from "./types"

export const createUser = async ({
  username,
  password,
  email,
}: {
  username: string
  password: string
  email: string
}): ActionResponse<{ id: string; username: string }> => {
  const existedUser = await prisma.profile.findUnique({
    where: {
      username,
    },
    include: {
      user: true,
    },
  })

  if (existedUser) {
    return { success: false, msg: `User '${username}' exists` }
  }

  const saltHash = genPasword(password)
  try {
    const data = await prisma.profile.create({
      data: {
        username,
        email,
        user: {
          create: {
            hash: saltHash.hash,
            salt: saltHash.salt,
          },
        },
        role: "admin",
      },
    })
    console.log(username)
    return { success: true, data: { id: data.uid, username } }
  } catch (error) {
    const msg = `something went wrong when save user ${username}!`
    console.log(msg, error)
    return { success: false, err: error, msg }
  }
}

const ValidationErrorMsg = "username or password error!"

export const validateUser = async (
  username: string,
  password: string
): ActionResponse<boolean> => {
  const existedProfile = await prisma.profile.findUnique({
    where: {
      username,
    },
    include: {
      user: true,
    },
  })
  if (!existedProfile) {
    return { success: false, msg: ValidationErrorMsg }
  }
  const existedUser = existedProfile.user
  const validateResult = validatePassword(
    password,
    existedUser.hash,
    existedUser.salt
  )
  if (validateResult) return { success: true, data: true }
  else return { success: false, msg: ValidationErrorMsg }
}

export const findUserByEmailForAuthorization = async (
  email: string
): ActionResponse<UserForAuthorization> => {
  const user = await prisma.profile.findUnique({
    where: { email },
    select: { uid: true, username: true, email: true, role: true },
  })
  if (!user) {
    return { success: false, msg: `no such user email:${email}` }
  }
  return { success: true, data: user }
}

export const findUserByUidForAuthorization = async (
  uid: string
): ActionResponse<UserForAuthorization> => {
  const user = await prisma.profile.findUnique({
    where: { uid },
    select: { uid: true, username: true, email: true, role: true },
  })
  if (!user) {
    return { success: false, msg: `no such user uid:${uid}` }
  }
  return { success: true, data: user }
}
