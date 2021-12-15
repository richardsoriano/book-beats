import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export default async function MailerApi(req, res) {
  const { to, from, subject, html } = JSON.parse(req.body)

  try {
    await sgMail.send({
      to,
      from,
      subject,
      html,
    })
    res.status(200).json({})
  } catch (error) {
    res.status(500).json({ error })
  }
}
