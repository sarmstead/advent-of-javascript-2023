import { useEffect, useRef } from 'react'

import { Form, TextField, Submit, FieldError } from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import HeaderWithRulers from 'src/components/HeaderWithRulers/HeaderWithRulers'
import AuthLayout from 'src/layouts/AuthLayout/AuthLayout'

const ForgotPasswordPage = () => {
  const { isAuthenticated, forgotPassword } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.dashboard())
    }
  }, [isAuthenticated])

  const usernameRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    usernameRef?.current?.focus()
  }, [])

  const onSubmit = async (data: { username: string }) => {
    const response = await forgotPassword(data.username)

    if (response.error) {
      toast.error(response.error)
    } else {
      // The function `forgotPassword.handler` in api/src/functions/auth.js has
      // been invoked, let the user know how to get the link to reset their
      // password (sent in email, perhaps?)
      toast.success(
        'A link to reset your password was sent to ' + response.email
      )
      navigate(routes.login())
    }
  }

  return (
    <>
      <MetaTags title="Forgot Password" />

      <AuthLayout>
        <div>
          <div>
            <HeaderWithRulers
              className="mb-8 text-white"
              heading="forgot password"
            />
            <Form onSubmit={onSubmit} className="m-auto max-w-[661px]">
              <TextField
                name="username"
                placeholder="username"
                className="auth mb-4"
                ref={usernameRef}
                validation={{
                  required: {
                    value: true,
                    message: 'Username is required',
                  },
                }}
              />

              <FieldError name="username" />

              <div>
                <Submit>Submit</Submit>
              </div>
            </Form>
          </div>
        </div>
      </AuthLayout>
    </>
  )
}

export default ForgotPasswordPage
