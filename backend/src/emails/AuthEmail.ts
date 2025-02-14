import { transport } from '../config/nodemailer'

type EmailType = {
  name: string
  email: string
  token: string
}

export class AuthEmail {
  static sendConfirmationEmail = async (user: EmailType) => {
    const email = await transport.sendMail({
      from: 'CashTrackr <admin@cashtrackr.com>',
      to: user.email,
      subject: 'Confirma tu email',
      html: `
        <h1>Hola ${user.name}</h1>
        <p>Gracias por registrarte en CashTrackr. Haz click en el siguiente enlace para confirmar tu email:</p>
        <a href=${process.env.FRONTEND_URL}/auth/confirm-account><b>${user.token}</b></a>
      `,
    })
    /* console.log('Mensaje enviado', email.messageId) */
  }

  static resetPasswordEmail = async (user: EmailType) => {
    const email = await transport.sendMail({
      from: 'CashTrackr <admin@cashtrackr.com>',
      to: user.email,
      subject: 'Recupera tu contraseña',
      html: `
        <h1>Hola ${user.name}</h1>
        <p>Haz click en el siguiente enlace para recuperar tu contraseña:</p>
        <a href=${process.env.FRONTEND_URL}/auth/new-password><b>${user.token}</b></a>
      `,
    })
    /* console.log('Mensaje enviado', email.messageId) */
  }
}
