import nodemailer from 'nodemailer';

// Función para procesar el envío de emails vía Hostinger SMTP
export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { email, message, name, type } = req.body;

  if (!email || !message) {
    return res.status(400).json({ error: 'Email y mensaje son obligatorios' });
  }

  // Configuración de transporte para Hostinger (Puerto 465 SSL)
  const transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.HOSTINGER_EMAIL,
      pass: process.env.HOSTINGER_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  const subject = type === 'testimonial'
    ? `📣 NUEVO TESTIMONIO: ${name || email}`
    : `📩 NUEVO CONTACTO: ${email}`;

  const htmlContent = `
    <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px; border: 1px solid #eee; border-radius: 12px;">
      <h2 style="color: #0A0A0A; border-bottom: 2px solid #38BDF8; padding-bottom: 10px; margin-top: 0;">
        🎾 Jugar Más Pickleball - ${type === 'testimonial' ? 'Nuevo Testimonio' : 'Nueva Consulta'}
      </h2>
      <p style="margin: 5px 0;"><strong>De:</strong> ${name || 'Usuario desconocido'}</p>
      <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
      ${req.body.level ? `<p style="margin: 5px 0;"><strong>Nivel de Pickleball:</strong> ${req.body.level}</p>` : ''}
      <p style="margin: 5px 0;"><strong>Tipo:</strong> ${type === 'testimonial' ? 'Testimonio para revisión' : 'Consulta general'}</p>
      
      <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin-top: 20px; border-left: 4px solid #38BDF8;">
        <p style="white-space: pre-wrap; margin: 0; line-height: 1.6;">${message}</p>
      </div>
      
      <p style="font-size: 11px; color: #999; margin-top: 30px; border-top: 1px solid #eee; pt-10px;">
        Enviado desde jugarmaspickleball.es el ${new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid' })}
      </p>
    </div>
  `;

  try {
    await transporter.verify();

    await transporter.sendMail({
      from: `"Web Jugar Más Pickleball" <${process.env.HOSTINGER_EMAIL}>`,
      to: 'info@jugarmaspickleball.es',
      replyTo: email,
      subject,
      html: htmlContent,
    });

    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error('Error detallado de SMTP:', error);
    return res.status(500).json({
      error: 'Error al enviar el email',
      code: error.code,
      command: error.command
    });
  }
}
