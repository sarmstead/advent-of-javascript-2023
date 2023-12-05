import { useRef, useState } from 'react'
import { useEffect } from 'react'

import {
  Form,
  TextField,
  PasswordField,
  Submit,
  FieldError,
} from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import HeaderWithRulers from 'src/components/HeaderWithRulers/HeaderWithRulers'
import AuthLayout from 'src/layouts/AuthLayout/AuthLayout'

const WELCOME_MESSAGE = 'Welcome back!'
const REDIRECT = routes.home()

const LoginPage = ({ type }) => {
  const {
    isAuthenticated,
    client: webAuthn,
    loading,
    logIn,
    reauthenticate,
  } = useAuth()
  const [shouldShowWebAuthn, setShouldShowWebAuthn] = useState(false)
  const [showWebAuthn, setShowWebAuthn] = useState(
    webAuthn.isEnabled() && type !== 'password'
  )

  // should redirect right after login or wait to show the webAuthn prompts?
  useEffect(() => {
    if (isAuthenticated && (!shouldShowWebAuthn || webAuthn.isEnabled())) {
      navigate(REDIRECT)
    }
  }, [isAuthenticated, shouldShowWebAuthn])

  // if WebAuthn is enabled, show the prompt as soon as the page loads
  useEffect(() => {
    if (!loading && !isAuthenticated && showWebAuthn) {
      onAuthenticate()
    }
  }, [loading, isAuthenticated])

  // focus on the username field as soon as the page loads
  const usernameRef = useRef()
  useEffect(() => {
    if (usernameRef.current) {
      usernameRef.current && (usernameRef.current as HTMLInputElement).focus()
    }
  }, [])

  const onSubmit = async (data) => {
    const webAuthnSupported = await webAuthn.isSupported()

    if (webAuthnSupported) {
      setShouldShowWebAuthn(true)
    }
    const response = await logIn({
      username: data.username,
      password: data.password,
    })

    if (response.message) {
      // auth details good, but user not logged in
      toast(response.message)
    } else if (response.error) {
      // error while authenticating
      toast.error(response.error)
    } else {
      // user logged in
      if (webAuthnSupported) {
        setShowWebAuthn(true)
      } else {
        toast.success(WELCOME_MESSAGE)
      }
    }
  }

  const onAuthenticate = async () => {
    try {
      await webAuthn.authenticate()
      await reauthenticate()
      toast.success(WELCOME_MESSAGE)
      navigate(REDIRECT)
    } catch (e) {
      if (e.name === 'WebAuthnDeviceNotFoundError') {
        toast.error(
          'Device not found, log in with Username/Password to continue'
        )
        setShowWebAuthn(false)
      } else {
        toast.error(e.message)
      }
    }
  }

  const onRegister = async () => {
    try {
      await webAuthn.register()
      toast.success(WELCOME_MESSAGE)
      navigate(REDIRECT)
    } catch (e) {
      toast.error(e.message)
    }
  }

  const onSkip = () => {
    toast.success(WELCOME_MESSAGE)
    setShouldShowWebAuthn(false)
  }

  const AuthWebAuthnPrompt = () => {
    return (
      <div className="m-auto max-w-[661px] text-center text-white">
        <h2 className="mb-3 text-2xl font-bold">
          Ho, Ho, Ho! You&apos;re passwordless!
        </h2>
        <p className="mb-6">Log in with your fingerprint, face or PIN</p>
        <div>
          <button
            className="max-w-fit rounded-full bg-supernova px-8 pb-2 pt-4 font-handwriting text-2xl uppercase tracking-tighter text-black"
            onClick={onAuthenticate}
          >
            Open Authenticator
          </button>
        </div>
      </div>
    )
  }

  const RegisterWebAuthnPrompt = () => (
    <div className="m-auto max-w-[661px] text-center text-white">
      <h2 className="mb-3 text-2xl font-bold">
        Passwords are on Santa&apos;s naughty list 🎅🏽
      </h2>
      <p className="mb-6">
        Depending on your device, you can log in with your fingerprint, face or
        PIN next time.
      </p>
      <div className="flex flex-col items-center gap-2">
        <button
          className="max-w-fit rounded-full bg-supernova px-8 pb-2 pt-4 font-handwriting text-2xl uppercase tracking-tighter text-black"
          onClick={onRegister}
        >
          Turn On
        </button>
        <button className="underline" onClick={onSkip}>
          Skip for now
        </button>
      </div>
    </div>
  )

  const PasswordForm = () => (
    <Form onSubmit={onSubmit} className="m-auto max-w-[661px]">
      <TextField
        name="username"
        className="auth mb-4"
        ref={usernameRef}
        placeholder="username"
        validation={{
          required: {
            value: true,
            message: 'Username is required',
          },
        }}
      />

      <FieldError name="username" />

      <PasswordField
        name="password"
        placeholder="password"
        className="auth mb-4"
        autoComplete="current-password"
        validation={{
          required: {
            value: true,
            message: 'Password is required',
          },
        }}
      />

      <FieldError name="password" className="rw-field-error" />

      <div className="mb-3.5">
        <Submit>Submit</Submit>
      </div>

      {linkToRender()}
    </Form>
  )

  const formToRender = () => {
    if (showWebAuthn) {
      if (webAuthn.isEnabled()) {
        return <AuthWebAuthnPrompt />
      } else {
        return <RegisterWebAuthnPrompt />
      }
    } else {
      return <PasswordForm />
    }
  }

  const linkToRender = () => {
    if (showWebAuthn) {
      if (webAuthn.isEnabled()) {
        return (
          <div className="flex justify-center gap-1 dark:text-white">
            <span>Login with </span>
            <a href="?type=password" className="underline">
              username and password
            </a>
          </div>
        )
      }
    } else {
      return (
        <div className="flex">
          <Link
            to={routes.signup()}
            className="w-full text-center underline dark:text-white"
          >
            Need an Account?
          </Link>
        </div>
      )
    }
  }

  if (loading) {
    return null
  }

  return (
    <>
      <MetaTags title="Login" />
      <AuthLayout>
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
        <HeaderWithRulers heading="Login" className="mb-8 text-white" />
        {formToRender()}
      </AuthLayout>
    </>
  )
}

export default LoginPage
