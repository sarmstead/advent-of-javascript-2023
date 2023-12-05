import { useRef } from 'react'
import { useEffect } from 'react'

import {
  Form,
  TextField,
  PasswordField,
  FieldError,
  Submit,
} from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import HeaderWithRulers from 'src/components/HeaderWithRulers/HeaderWithRulers'
import AuthLayout from 'src/layouts/AuthLayout/AuthLayout'

const SignupPage = () => {
  const { isAuthenticated, signUp } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  // focus on username box on page load
  const firstNameRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    firstNameRef.current?.focus()
  }, [])

  const onSubmit = async (data: Record<string, string>) => {
    const response = await signUp({
      username: data.username,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
    })

    if (response.message) {
      toast(response.message)
    } else if (response.error) {
      toast.error(response.error)
    } else {
      // user is signed in automatically
      toast.success('Welcome!')
    }
  }

  return (
    <>
      <MetaTags title="Signup" />

      <AuthLayout>
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />

        <HeaderWithRulers className="pb-8 text-white" heading="Sign Up" />

        <Form onSubmit={onSubmit} className="m-auto max-w-[661px]">
          <TextField
            name="firstName"
            ref={firstNameRef}
            className="auth mb-4"
            placeholder="first name"
          />
          <FieldError name="firstName" className="rw-field-error" />

          <TextField
            name="lastName"
            className="auth mb-4"
            placeholder="last name"
          />
          <FieldError name="lastName" className="rw-field-error" />

          <TextField
            name="username"
            className="auth mb-4"
            placeholder="username"
            validation={{
              required: {
                value: true,
                message: 'Username is required',
              },
            }}
          />
          <FieldError name="username" className="rw-field-error" />

          <PasswordField
            name="password"
            className="auth mb-4"
            placeholder="password"
            autoComplete="current-password"
            validation={{
              required: {
                value: true,
                message: 'Password is required',
              },
            }}
          />
          <FieldError name="password" />

          <div className="mb-3.5">
            <Submit>Sign Up</Submit>
          </div>
        </Form>

        <div className="flex">
          <Link
            to={routes.login()}
            className="w-full text-center underline hover:no-underline dark:text-white"
          >
            Ready to Login?
          </Link>
        </div>
      </AuthLayout>
    </>
  )
}

export default SignupPage
