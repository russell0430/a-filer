import Button from "../../../components/Button"
import Input from "../../../components/inputs/Input"
import { useCallback, useState } from "react"
import { useNavigate } from "react-router-dom"
// import { requests } from "../../api"
import { FieldValues, SubmitHandler, set, useForm } from "react-hook-form"
import { requests } from "@/request/api"
import { toast } from "react-hot-toast"
import { LoginOptions, RegisterOptions, useAuth } from "@/contexts/AuthContext"

type Variant = "LOGIN" | "REGISTER"
const Form = () => {
  const { login, register: registerAction } = useAuth()
  const [variant, setVariant] = useState<Variant>("LOGIN")
  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER")
    } else {
      setVariant("LOGIN")
    }
  }, [variant])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginOptions | RegisterOptions>({
    defaultValues: { username: "", email: "", password: "" },
  })

  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const onSubmit: SubmitHandler<LoginOptions | RegisterOptions> = useCallback(
    async (data) => {
      setIsLoading(true)

      if (variant === "REGISTER") {
        try {
          await registerAction(
            data as RegisterOptions,
            () => {
              toast.success("register successfully!")
            },
            (res) => {
              toast.error("register error!")
            }
          )
        } catch (err) {
          console.log(err)
        } finally {
          setIsLoading(false)
        }

        // request for Register
      } else if (variant === "LOGIN") {
        try {
          console.log(data)
          await login(
            data,
            (res) => {
              if (res.status === 200 && res.data.success) {
                toast.success("login successfully!")
                console.log(res.data.data)
                navigate("/")
              }
            },
            (res) => {
              toast.error("login error")
            }
          )
        } catch (err) {
          console.log("error")
        } finally {
          setIsLoading(false)
        }
        // request for login
      }
    },
    [login, navigate, registerAction, variant]
  )
  console.log(isLoading)
  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {variant === "REGISTER" && (
            <Input
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              id="username"
              label="username"
            />
          )}
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            id="email"
            label="Email"
            type="email"
          />
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id="password"
            label="Password"
            type="password"
          />
          <div>
            <Button disabled={isLoading} fullWidth type="submit">
              {variant === "LOGIN" ? "Sign in" : "Register"}
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-500" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                No other way to log in for now
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
          <div>
            {variant === "LOGIN" ? "New to AFiler?" : "Already have an account"}
          </div>
        </div>
        <div
          className="underline cursor-pointer text-center mt-4"
          onClick={toggleVariant}
        >
          {variant === "LOGIN" ? "Create an account" : "Login"}
        </div>
      </div>
    </div>
  )
}

export default Form
