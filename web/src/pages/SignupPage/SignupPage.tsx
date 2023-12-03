import { useRef } from 'react'
import { useEffect } from 'react'

import {
  Form,
  Label,
  TextField,
  PasswordField,
  FieldError,
  Submit,
} from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'

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

      <main>
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
        <div>
          <div>
            <header>
              <h2>Login</h2>
            </header>

            <div>
              <div>
                <Form onSubmit={onSubmit}>
                  <TextField
                    name="firstName"
                    ref={firstNameRef}
                    errorClassName="rw-input rw-input-error"
                    placeholder="first name"
                  />
                  <FieldError name="firstName" className="rw-field-error" />

                  <TextField
                    name="lastName"
                    errorClassName="rw-input rw-input-error"
                    placeholder="last name"
                  />
                  <FieldError name="lastName" className="rw-field-error" />

                  <TextField
                    name="username"
                    errorClassName="rw-input rw-input-error"
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
                    errorClassName="rw-input rw-input-error"
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

                  <div>
                    <Submit>Sign Up</Submit>
                  </div>
                </Form>
              </div>
            </div>
          </div>
          <div>
            <Link to={routes.login()} className="rw-link">
              Ready to Login?
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}

export default SignupPage
