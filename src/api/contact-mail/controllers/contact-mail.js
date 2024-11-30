"use strict";

/**
 * A set of functions called "actions" for `contact-mail`
 */

module.exports = {
  sendMail: async (ctx) => {
    const { email, replyTo, subject, text, html } = ctx.request.body;
    const { files } = ctx.request.files;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(replyTo)) {
      return ctx.badRequest("Invalid email format.");
    }

    if (subject.length > 100 || text.length > 1000) {
      return ctx.badRequest("Content is too long.");
    }
    console.log(
      `Request received from IP: ${
        ctx.request.ip
      }, Time: ${new Date().toISOString()}, Data: ${JSON.stringify(
        ctx.request.body
      )}`
    );

    const footerText = `
      \n\n---\n
      Este mensaje fue enviado por un usuario de la plataforma Rastro Animal. 
      Si deseas más información o ponerte en contacto directamente con la persona que lo envió, 
      puedes escribirle al siguiente correo: ${replyTo}
      \n
      Nota: Por favor responde directamente al remitente para continuar la comunicación.
    `;

    const footerHtml = `
      <br><br>---<br>
      <p><strong>Este mensaje fue enviado por un usuario de la plataforma Rastro Animal.</strong></p>
      <p>Si deseas más información o ponerte en contacto directamente con la persona que lo envió, 
      puedes escribirle al siguiente correo:</p>
      <p style="font-weight: bold; color: #007bff;">${replyTo}</p>
      <p>Nota: Por favor responde directamente al remitente para continuar la comunicación.</p>
    `;

    try {
      const emailOptions = {
        to: email,
        replyTo,
        subject,
        text: `${text}${footerText}`,
        html: `${html}${footerHtml}`,
      };

      if (files) {
        const fileArray = Array.isArray(files) ? files : [files];

        emailOptions.attachments = fileArray.map((file) => ({
          filename: file.name,
          path: file.path,
          contentType: file.type,
        }));
      }

      await strapi.plugins["email"].services.email.send(emailOptions);

      ctx.send({ message: "Email sent successfully" });
    } catch (error) {
      ctx.badRequest("Failed to send email", { error });
    }
  },
};
