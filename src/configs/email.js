const sgMail = require("@sendgrid/mail");
const config = require("./app");

sgMail.setApiKey(config.sendgrid_api_key);

const obj = {
  heading: "เเบบฟอร์มการทดสอบ",
  image:
    "https://images.unsplash.com/photo-1583552188819-4cab7da34a31?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
};

let Template = (description) => {
  return ` 
   <!DOCTYPE html>
  <html>
  <body>
  <h1>${obj.heading}</h1>
  <a href="default.asp">
  <img src=${
    obj.image
  } alt="HTML tutorial" style="width:200px;height:200px;border:0">
  </a>
  <p>${description || "ข้อความอัตโนมัติ"}</p>
  <p>ขอเเสดงความนับถือ</p>
  </body>
  </html>`;
};

const sendMail = async (msg) => {
  await sgMail.send(msg);
};

module.exports = { sendMail, Template };
