import emailjs from "@emailjs/browser";

const sendCustomEmail = (details) => {
  const { VITE_EMAIL_USER_ID, VITE_EMAIL_SERVICE_ID, VITE_EMAIL_TEMPLATE_ID } = import.meta.env;
  if (!VITE_EMAIL_USER_ID || !VITE_EMAIL_SERVICE_ID || !VITE_EMAIL_TEMPLATE_ID) {
    return Promise.reject(new Error('EmailJS configuration is missing. Check the frontend .env file.'));
  }

  emailjs.init(VITE_EMAIL_USER_ID);
  return emailjs.send(VITE_EMAIL_SERVICE_ID, VITE_EMAIL_TEMPLATE_ID, {
    to_email: details.to_email,
    subject: details.subject,
    message: details.message,
  });
};
export { sendCustomEmail };
