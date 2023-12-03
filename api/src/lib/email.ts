import * as nodemailer from 'nodemailer'

interface Options {
  to: string | string[]
  subject: string
  text: string
  html: string
}

export async function sendEmail({ to, subject, text, html }: Options) {
  const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.BREVO_USER,
      pass: process.env.BREVO_KEY,
    },
  })

  const payload = await transporter.sendMail({
    from: `"Secret Santa" <${process.env.BREVO_USER}>`,
    to: Array.isArray(to) ? to : [to],
    subject,
    text,
    html,
  })

  return payload
}
