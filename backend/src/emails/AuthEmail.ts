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
        <a href="#"><b>${user.token}</b></a>
      `,
    })
    console.log('Mensaje enviado', email.messageId)
  }
}
