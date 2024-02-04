import React from "react"
import { ClipLoader } from "react-spinners"
interface LoadingProps {
  loading?: boolean
}
const Loading: React.FC<LoadingProps> = ({ loading = true }) => {
  if (!loading) return null
  return (
    <div className="w-full h-full inset-0 flex justify-center items-center">
      <ClipLoader />
    </div>
  )
}

export default Loading
