import { useEffect, useRef } from 'react'

import { Form, TextField, Submit, FieldError } from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'

const ForgotPasswordPage = () => {
  const { isAuthenticated, forgotPassword } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
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

      <main>
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
        <div>
          <div>
            <header>
              <h2>Forgot Password</h2>
            </header>

            <div>
              <div>
                <Form onSubmit={onSubmit}>
                  <div>
                    <TextField
                      name="username"
                      placeholder="username"
                      errorClassName="rw-input rw-input-error"
                      ref={usernameRef}
                      validation={{
                        required: {
                          value: true,
                          message: 'Username is required',
                        },
                      }}
                    />

                    <FieldError name="username" className="rw-field-error" />
                  </div>

                  <div>
                    <Submit>Submit</Submit>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default ForgotPasswordPage
