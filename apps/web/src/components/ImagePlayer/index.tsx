import React from "react"
import Image from "../Images/Image"

// get image id list ,and slide over them

interface ImagePlayerProps {
  idList: string[]
}

const ImagePlayer: React.FC<ImagePlayerProps> = ({ idList }) => {

  return <div className="image-player">ImagePlayer</div>
}

export default ImagePlayer
