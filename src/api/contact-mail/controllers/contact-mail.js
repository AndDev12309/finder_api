"use strict";

/**
 * A set of functions called "actions" for `contact-mail`
 */

module.exports = {
  sendMail: async (ctx) => {
    const { replyTo, subject, text, html } = ctx.request.body;
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

    try {
      const emailOptions = {
        to: process.env.EMAIL_FROM,
        replyTo,
        subject,
        text: `${text}`,
        html: `${html}`,
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
