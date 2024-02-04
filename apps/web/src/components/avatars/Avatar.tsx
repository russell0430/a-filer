import React from "react"
import Image from "../Images/Image"
import { IoPerson } from "react-icons/io5"
import { API } from "@/types"
interface AvatarProps {
  user?: API.User | null
}

const Avatar: React.FC<AvatarProps> = ({ user }) => {
  return (
    <div className="relative">
      <div className="relative flex justify-center items-center rounded-full overflow-hidden h-9 w-9 md:h-11 md:w-11 my-auto mx-auto">
        {user?.image ? (
          <Image
            src={user?.image}
            fallback="/src/assets/placeholder.jpg"
            placeholder="/src/assets/placeholder.jpg"
          />
        ) : (
          <IoPerson size={24} />
        )}
      </div>
    </div>
  )
}

export default Avatar
