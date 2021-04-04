function mail(to, title, content) {
  return new Promise(function (resolve, reject) {
    const nodemailer = require("nodemailer"); //引入依赖
    /**
     * 详细配置文件地址： node_modules/lib/well-known/services
     */
    let transporter = nodemailer.createTransport({
      host: "smtp.qq.com",
      port: 465,
      secure: true,
      auth: {
        user: "754969928@qq.com", //发送方邮箱
        pass: "aqgmblukottrbeig", //发送方邮箱的授权码,一般去邮箱设置里面找，应该可以找到
      },
    });

    let info = {
      from: "754969928@qq.com", //发送方邮箱
      to: to,
      subject: title,
      text: content,
      //html: '<h1>这里内容</h1>'，text和html任选其一即可
    };
    //发送邮件
    transporter.sendMail(info, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
}

module.exports = mail;
