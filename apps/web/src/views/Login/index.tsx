import React from "react"
import Form from "./Form"

const Login: React.FC = () => {
  return (
    <div
      className="flex min-h-full flex-col justify-center py-12
      sm:px-6 lg:px-8 bg-gray-100"
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-sky-500 hover:text-sky-600 transition font-bold text-3xl cursor-pointer">
          AFiler
        </h2>
        <h2 className="text-gray-900 tracking-tight font-bold text-2xl mt-6">
          Sign in to your account
        </h2>
      </div>
      <Form />
    </div>
  )
}

export default Login
