using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Web;
using System.Web.UI;


namespace TestyDbTryout
{
    /// <summary>
    /// Description résumée de MailHandler
    /// </summary>
    public class MailHandler : IHttpHandler
    {
        public void ProcessRequest(HttpContext context)
        {
            string jsonString = String.Empty;
            HttpContext.Current.Request.InputStream.Position = 0;
            using (System.IO.StreamReader inputStream = new System.IO.StreamReader(HttpContext.Current.Request.InputStream))
            {
                jsonString = inputStream.ReadToEnd();
                System.Web.Script.Serialization.JavaScriptSerializer jSerialize = new System.Web.Script.Serialization.JavaScriptSerializer();
                var email = jSerialize.Deserialize<Mail>(jsonString);

                if (email != null)
                {

                    string from = "test-master@engraft.pl";
                    string to = email.To; /*to będzie na testy.engraft.pl*/
                    //string to = "bff@poczta.onet.pl";
                    string body = email.Body;
                    string subject = email.Subject + DateTime.Now.Date.ToShortDateString() + " r. godz. " + DateTime.Now.ToShortTimeString();
                    //string bcc = "greensky@gazeta.pl, greansky@gmail.com";

                    //You can write here the code to send Email, see ,the Class System.Net.Mail.MailMessage on MSDN

                    //send the message
                    SmtpClient smtp = new SmtpClient("mail.engraft.pl", 587)

                    {
                        Credentials = new System.Net.NetworkCredential("admin", "Greansky1965"),
                        DeliveryMethod = SmtpDeliveryMethod.Network,
                        DeliveryFormat = SmtpDeliveryFormat.International

                    };

                    MailAddress bcc = new MailAddress("grzegorz.zielinski@engraft.pl");
                    //MailAddress bcc2 = new MailAddress("greensky@gazeta.pl");
                    //MailAddress bcc3 = new MailAddress("greansky@gmail.com");
                    //MailAddress bcc4 = new MailAddress("greansky@tlen.pl");


                    MailMessage mail = new MailMessage(
                        from, to, subject, body
                        );
                    {
                        mail.IsBodyHtml = true;
                        mail.Bcc.Add(bcc);
                        //mail.Bcc.Add(bcc2);
                        //mail.Bcc.Add(bcc3);
                        //mail.Bcc.Add(bcc4);
                    }


                    //smtp.Send(from, to, subject, body);

                    smtp.Send(mail);

                    //Once the Mail is sent succefully, you can send back a response to the Client informing him that everything is okay !
                    context.Response.Write(jSerialize.Serialize(
                         new
                         {
                             Response = "Email został pomyślnie wysłany."
                         }));
                }
            }
        }
        public bool IsReusable
        {
            get
            {
                return false;
            }
        }


    }
}