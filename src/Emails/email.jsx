import emailjs from "@emailjs/browser";

const sendCustomEmail = (details) => {
  emailjs.init(import.meta.env.VITE_EMAIL_USER_ID);
  emailjs
    .send(
      import.meta.env.VITE_EMAIL_SERVICE_ID,
      import.meta.env.VITE_EMAIL_TEMPLATE_ID,
      {
        to_email: details.to_email,
        subject: details.subject,
        // message: details.message,
        message: details.message,
      }
    )
    .then((resp) => {
      console.log(resp);
    })
    .catch((err) => {
      console.log(err.message);
    });
};
export { sendCustomEmail };
