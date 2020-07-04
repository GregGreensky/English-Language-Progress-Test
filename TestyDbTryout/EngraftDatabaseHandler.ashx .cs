using System.Data.SqlClient;
using System.Web;

namespace TestyDbTryout
{
    /// <summary>
    /// Summary description for DatabaseHandler
    /// </summary>
    ///
    public static class Globals
    {
        public static int Licznik = 0;
    }

    public class DatabaseHandler : IHttpHandler
    {
        public void ProcessRequest(HttpContext context)
        {
            //context.Response.Write("<script>$(\'#fixer\').css(\'visibility\',\'hidden\');</script>");
            context.Response.ContentType = "text/html;charset=UTF-8";
            context.Response.CacheControl = "private";


            //context.Response.Buffer = false;
            //string jsonString = String.Empty;
            //HttpContext.Current.Request.InputStream.Position = 0;
            //using (System.IO.StreamReader inputStream = new System.IO.StreamReader(HttpContext.Current.Request.InputStream))
            //{
            //    jsonString = inputStream.ReadToEnd();
            //    System.Web.Script.Serialization.JavaScriptSerializer jSerialize = new System.Web.Script.Serialization.JavaScriptSerializer();
            //    var send_data = jSerialize.Deserialize<PropClass>(jsonString);

            //    if (send_data != null)
            //    {
            //        string username = send_data.UserName;
            //        string duration = send_data.Duration;
            //        //DateTime date = send_data.Data;
            //        //string body = email.Body;
            //        //string subject = email.Subject + " - w dn. " + DateTime.Now.Date.ToShortDateString() + " o godz. " + DateTime.Now.ToShortTimeString();
            //        //string bcc = email.Bcc;

            //        //smtp.Send(from, to, subject, body);

            //        //smtp.Send(mail);

            //        //Once the Mail is sent succefully, you can send back a response to the Client informing him that everything is okay !
            //        context.Response.Write(jSerialize.Serialize(
            //             new
            //             {
            //                 Response = "Message Has been sent succesfully. "
            //             }));
            //    }
            //}
            //    context.Request.ContentType = "text/html; charset=UTF-8";


            //context.Response.AddHeader("Cache-control", "no-store, must-revalidate"); //OK before
            //context.Response.ContentType = "text/html"; //OK before


            //string connect = "Data Source=(LocalDB)\\MSSQLLocalDB;AttachDbFilename='C:\\Users\\Grzegorz\\Documents\\Visual Studio 2017\\Projects\\TestyDbTryout\\TestyDbTryout\\App_Data\\TestyDb.mdf';Integrated Security=True";

            //string connect = "Data Source=(LocalDB)\\MSSQLLocalDB;AttachDbFilename=|DataDirectory|TestyDb.mdf;Database=TestyDb;Integrated Security=True";

            //string connect = "Data Source=LAPTOP-G\\SQLEXPRESS;Initial Catalog=Testery;Integrated Security=True;Persist Security Info=False;Pooling=False;MultipleActiveResultSets=False; Encrypt=False; TrustServerCertificate=True;User ID=**********;Password=**********";

            /*string connect = "Data Source=LAPTOP-G\\SQLEXPRESS;Initial Catalog=Testy;User ID=**********;Password=************;";*/ //ciąg połączeniowy do bazy danych - tu do lokalnej. działa na Laptop-G

            string connect = "Data Source=85.255.6.42;Initial Catalog=testy;Persist Security Info=True;User ID=******Password=***********;Pooling=False;MultipleActiveResultSets=False;Encrypt=False;TrustServerCertificate=True";

            string query = "SELECT TestID, UserName, Date, StartTime, EndTime, Duration, Started, Finished, Remarks, AnswersForStudent FROM TestsDone";

            int rows_number = 0;

            string userName = context.Request["UserName"];
            string testNo = context.Request["NumerTestu"];
            //string answsfrtutr;
            //int? licznik = Globals.Licznik;
            //int? licznik = null;

            //string id = context.Request.QueryString["UserName"]; /*ta opcja z QueryString działa tylko z ajax GET
            //context.Response.Write("<script>alert('testNo: " + testNo + ", NumerTestu: " + context.Request["NumerTestu"] + "');</script>");


            if (userName != null && testNo != "")
            {
                
                using (SqlConnection conn = new SqlConnection(connect))
                {
                    using (SqlCommand cmd = new SqlCommand(query, conn))
                    {
                        cmd.Parameters.AddWithValue("@UserName", context.Request["UserName"]);
                        cmd.Parameters.AddWithValue("@TestID", context.Request["NumerTestu"]);
                        //cmd.Parameters.AddWithValue("@AnswersForTutor", context.Request["AnswersForTutor"]);

                        conn.Open();
                        SqlDataReader rdr = cmd.ExecuteReader();

                        if (rdr.HasRows)
                        {
                            while (rdr.Read())
                            {
                                rows_number++;
                                //context.Response.Write("<script>alert('rdr[Finished].toString() = " + rdr["Finished"].ToString() +  "\\nrdr[UserName].toString = " + rdr["UserName"].ToString() + "\\nrdr[TestID].toString = " + rdr["TestID"].ToString() + "');</script>");

                                //sprawdzenie czy już ktoś o takiej nazwie użytkownika rozwiązywał test i go ukończył

                                if (rdr["Finished"].ToString() == "True" && rdr["TestID"].ToString() == testNo && rdr["UserName"].ToString() == userName)
                                {
                                    //licznik = 1;
                                    //string answsfrtutr = rdr["@AnswersForTutor"].ToString();
                                    context.Response.Write("<script>" +
                                        "$('#fixer').css({'display':'none', 'visibility':'hidden'}).remove();" +
                                        "$('.btn-wrapper').css({'display':'none', 'visibility':'hidden'}).remove();" +
                                        "$('#checker').css({'display':'block', 'visibility':'visible'});" +
                                        "$('#demo').css({'display':'block', 'visibility':'visible'});" +
                                        "$('#demo').html('" + rdr["AnswersForStudent"].ToString().Trim() + "');" +
                                        "clearInterval(wal);" +
                                        "clearInterval(myInterval1);" +
                                        "clearInterval(myInterval2);" +
                                        "</script>");

                                    //context.Response.Flush();
                                    //context.Response.End();

                                    //continue;
                                    return;

                                    //context.Response.Write("" +
                                    //"<p>context.Request[NumerTestu] = " +
                                    //context.Request["NumerTestu"] + "</p>" +
                                    //"<p>context.Request[UserName]= " + context.Request["UserName"] + "</p>" +
                                    //"<script>" +
                                    //"$('#checker').css('visibility','visible');" +
                                    //"$('.container').remove();" +
                                    //"$('.btn-wrapper').remove();" +
                                    //"$('#fixer').remove();" +
                                    //        "if (typeof odtwarzacz != undefined || typeof odtwarzacz != null || odtwarzacz != '') " +
                                    //            "{" +
                                    //        "var odtwarzacz;" +
                                    //        "odtwarzacz.duration = 0;" +
                                    //          "clearInterval(myInterval1);" +
                                    //          "clearInterval(myInterval2);" +
                                    //          "clearInterval(wal);" +
                                    //        "alert('Duration pre-.achx');" +
                                    //        "}" +
                                    //        "else {" +
                                    //        "alert('Duration post-.achx');" +
                                    //"odtwarzacz.remove();" +
                                    //   "}" +
                                    //"$('#demo').empty()" +
                                    //".css('visibility','visible')"+
                                    //".append('<div>Już pisałeś ten test (" + rdr["TestID"].ToString() + ") w dniu " +
                                    //rdr["Date"].ToString().TrimEnd(new char[] { '0', '1', '2', '3', '4', '5', '6',
                                    //'7', '8', '9', ':' }) +
                                    //"r.<br>Zgłoś się do lektora po instrukcje.</div>" +
                                    //rdr["AnswersForTutor"].ToString().Trim() + "');" + "$('.summary').css({'top':'0','left':'0', 'padding':'20px 0','margin-bottom':'0'});"+
                                    //"</script>");
                                    //context.Response.Write("<p>");
                                    //context.Response.Write("<strong>" + rdr["Date"].ToString() + "</strong><br>");
                                    //context.Response.Write(rdr["StartTime"].ToString() + "<br>");
                                    //context.Response.Write(rdr["EndTime"].ToString() + "<br>");
                                    //context.Response.Write(rdr["Duration"].ToString() + "<br>");
                                    //context.Response.Write(rdr["Started"].ToString() + "<br>");
                                    //context.Response.Write(rdr["Finished"].ToString() + "<br>");
                                    //context.Response.Write(rdr["Remarks"].ToString() + "<br></p>");
                                    //context.Response.Write("<script>$('form').removeClass('container');</script>");
                                    //break;
                                    //context.Response.End();
                                    //continue;
                                }
                                else
                                {
                                    //context.Response.Write("" +
                                    ////     //"<p>context.Request[NumerTestu] = " + context.Request["NumerTestu"] + "</p>" +
                                    ////     //"<p>context.Request[UserName] = " + context.Request["UserName"] + "</p>" +
                                    ////     //"<p>Al seems OK</p>" +
                                    //"<script>" +
                                    //    "$('.loader-container').css({'display':'none', 'visibility':'hidden'}).remove();" +
                                    //    "$('#checker').css({'display':'block', 'visibility':'visible'});" +
                                    //    "$('#demo').css({'display':'block', 'visibility':'visible'});" +
                                    //    "$('.btn-wrapper').css({'display':'block', 'visibility':'visible'});" +
                                    //    "$('#fixer').css({'display':'block', 'visibility':'visible'});" +

                                    //"</script>");
                                    //continue;
                                }
                                //return;
                                //else if (licznik == null)
                                //{
                                //    context.Response.Write(
                                //        "<script>" +
                                //            "alert('licznik == null czyli == " + licznik + "');" +
                                //        "</script>" +
                                //        "<p>Coś poszło nie tak.</p> " +
                                //        "<br >Response Status: " + context.Response.Status.ToString() +
                                //        " <br >Status Code: " + context.Response.StatusCode.ToString() +
                                //        " <br >Status Description: " + context.Response.StatusDescription.ToString() +
                                //        " <br >Sub Status Code: " + context.Response.SubStatusCode.ToString() +
                                //        "<br >context.Request[UserName] = " + context.Request["UserName"] +
                                //        "<br >context.Request[NumerTestu] = " + context.Request["NumerTestu"] +
                                //        //"<br >context.Request.InputStream.ToString() = " + context.AllErrors.ToString() +
                                //        "<script>" +
                                //            "$('#checker').css('visibility','visible');" +
                                //            "$('.container').remove();" +
                                //            "$('.btn-wrapper').detach();" +
                                //            "$('#fixer').detach();" +
                                //        "</script>");
                                //}

                                //if (rdr.HasRows == false)

                                //{
                                //  context.Response.Write("<script>" +
                                //  "alert(\'CLOSING licznik == " + licznik.ToString() + "\\nrdr[UserName].ToString()           == " + rdr["UserName"].ToString() + "rows_number == " + rows_number.ToString()            + " \');" +
                                //   "</script>");
                                //}
                            } //while (rdr.Read())
                              //if (licznik == null)
                              //{
                              //    context.Response.Write("" +
                              //"<p>context.Request[NumerTestu] = " + context.Request["NumerTestu"] + "</p>" +
                              //"<p>context.Request[UserName] = " + context.Request["UserName"] + "</p>" +
                              //"<p>Al seems OK</p>" +
                              //                        "<script>" +

                            //                            "$('#checker').css('visibility', 'visible');" +
                            //                            "$('#demo').css('visibility', 'visible');" +
                            //                            "$('.btn-wrapper').css('visibility', 'visible');" +
                            //                            "$('#fixer').css('visibility', 'visible');" +
                            //                            "$('.container').remove();" +
                            //                        "</script>");
                            //}
                            //else if (licznik == 1)
                            //{
                            //context.Response.Write("<script>$('#fixer').remove();$('.container').remove();$('.btn-wrapper').remove();$('#checker').css('visibility', 'visible');$('#demo').css('visibility','visible').replaceWith('" + rdr["AnswersForTutor"].ToString().Trim() + "');</script><p>context.Request[UserName]= " + context.Request["UserName"] + "</p><p>context.Request[NumerTestu] = " +
                            //                    context.Request["NumerTestu"] + "</p>");
                            //}
                        } //if (rdr.HasRows)
                    } //using (SqlCommand cmd = new SqlCommand(query, conn))
                } //using (SqlConnection conn = new SqlConnection(connect))
                context.Response.Write("<script>" +
                                        "$('#checker').css({'display':'block', 'visibility':'visible'});" +
                                        "$('#demo').css({'display':'block', 'visibility':'visible'});" +
                                        "$('.btn-wrapper').css({'display':'block', 'visibility':'visible'});" +
                                        "$('#fixer').css({'display':'block', 'visibility':'visible'});" +
                                    "</script>");
                context.Response.Flush();
                //context.Response.End();
            } //if (userName != null && testNo != "")
            context.Response.End();

        } //public void ProcessRequest(HttpContext context)

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}
