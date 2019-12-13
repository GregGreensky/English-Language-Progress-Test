using System;
using System.Web;
using System.Web.Services;
using System.Web.Services.Protocols;
using System.Data.SqlClient;
using System.Text;
using System.Web.Script.Services;
using System.Configuration;
using System.Net.Mail;

namespace TestyDbTryout
{
    /// <summary>
    /// Summary description for EngraftService
    /// </summary>
    [WebService(Namespace = "https://engraft.pl/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [ScriptService]
    public class EngraftService : WebService
    {

        [WebMethod]

        public void ChangeStoppageTime(string TestID, string StoppageTime, string UserName)
        {
            string constr = "Data Source=**********;Initial Catalog=testy;Persist Security Info=True;User ID=**********;Password=**********;Pooling=False;MultipleActiveResultSets=False;Encrypt=False;TrustServerCertificate=True";
            using (SqlConnection con = new SqlConnection(constr))
            {
                using (SqlCommand cmd = new SqlCommand("UPDATE TestsDone SET StoppageTime = @StoppageTime WHERE UserName = @UserName AND TestID = @TestID"))
                {
                    cmd.Parameters.AddWithValue("@TestID", TestID);
                    cmd.Parameters.AddWithValue("@UserName", UserName);
                    cmd.Parameters.AddWithValue("@StoppageTime", StoppageTime);

                    cmd.Connection = con;

                    con.Open();

                    cmd.ExecuteNonQuery();

                    con.Close();
                    return;
                }
            }
        }


        [WebMethod]

        public void GetStoppageTime(string TestID, string UserName)
        {

            HttpContext context = HttpContext.Current;
            context.Request.InputStream.Position = 0;

            context.Response.ContentType = "text/html;charset=UTF-8";
            context.Response.CacheControl = "private";

            string constr = "Data Source=**********;Initial Catalog=testy;Persist Security Info=True;User ID=**********;Password=**********;Pooling=False;MultipleActiveResultSets=False;Encrypt=False;TrustServerCertificate=True";
            using (SqlConnection conn = new SqlConnection(constr))
            {
                using (SqlCommand cmd = new SqlCommand("SELECT TestID, UserName, StoppageTime, Finished FROM TestsDone WHERE UserName = @UserName AND TestID = @TestID"))
                {
                    cmd.Parameters.AddWithValue("@TestID", TestID);
                    cmd.Parameters.AddWithValue("@UserName", UserName);
                    cmd.Connection = conn;
                    int rows_number = 0;

                    string userName = context.Request["UserName"];
                    string testID = context.Request["TestID"];

                    conn.Open();

                    SqlDataReader reader = cmd.ExecuteReader();

                    if (reader.HasRows)
                    {
                        while (reader.Read())
                        {
                            rows_number++;

                            if (reader["TestID"].ToString() == TestID && reader["UserName"].ToString() == UserName)
                            {
                                if (reader["Finished"].ToString() == "True")
                                {
                                    //context.Response.Write("<script>" +
                                    //    "$('#fixer').css({'display':'none', 'visibility':'hidden'}).remove();" +
                                    //    "$('.btn-wrapper').css({'display':'none', 'visibility':'hidden'}).remove();" +
                                    //    "$('#checker').css({'display':'block', 'visibility':'visible'});" +
                                    //    "$('#demo').css({'display':'block', 'visibility':'visible'});" +
                                    //    "$('#demo').html('" + rdr["AnswersForStudent"].ToString().Trim() + "');" +
                                    //    "clearInterval(wal);" +
                                    //    "clearInterval(myInterval1);" +
                                    //    "clearInterval(myInterval2);" +
                                    //    "</script>");

                                    //return context.Response.ToString();
                                    //return;
                                }
                                else if (reader["Finished"].ToString() == "False")
                                {
                                    //context.Response.Write("<script>" +
                                    //    //"localStorage.setItem('OnStoppage-' + document.getElementById('testId').value,'" + rdr["StoppageTime"].ToString().Trim() + "');" +
                                    //    "$('#demo').append('" + reader["StoppageTime"].ToString().Trim() + "');" +
                                    //   "console.log('GetStoppageTime1');</script>");

                                    context.Response.Write(reader["StoppageTime"].ToString().Trim());
                                    
                                    //return rdr["StoppageTime"].ToString().Trim();

                                }
                            }
                            return;
                        }

                    }
                    //context.Response.Write("<script>" +
                    //                        "$('#checker').css({'display':'block', 'visibility':'visible'});" +
                    //                        "$('#demo').css({'display':'block', 'visibility':'visible'});" +
                    //                        "$('.btn-wrapper').css({'display':'block', 'visibility':'visible'});" +
                    //                        "$('#fixer').css({'display':'block', 'visibility':'visible'});" +
                    //                        "alert('GetStoppageTime2');" +
                    //                        "</script>");
                                            //return;
                    context.Response.Flush();

                    conn.Close(); //original

                }
                context.Response.End();
                //return context.Response.ToString();

            }

        }




        [WebMethod]
        public void LoadData(string TestID, string UserName)
        {

            HttpContext context = HttpContext.Current;
            context.Response.ContentType = "text/html;charset=UTF-8";
            context.Response.CacheControl = "private";

            string constr = "Data Source=**********;Initial Catalog=testy;Persist Security Info=True;User ID=**********;Password=**********;Pooling=False;MultipleActiveResultSets=False;Encrypt=False;TrustServerCertificate=True";
            using (SqlConnection conn = new SqlConnection(constr))
            {
                using (SqlCommand cmd = new SqlCommand("SELECT TestID, UserName, Date, StoppageTime, StartTime, AudiosStarted, EndTime, Duration, Started, Finished, Remarks, AnswersForStudent FROM TestsDone WHERE UserName = @UserName AND TestID = @TestID"))
                {
                    cmd.Parameters.AddWithValue("@TestID", TestID);
                    cmd.Parameters.AddWithValue("@UserName", UserName);
                    cmd.Connection = conn;
                    int rows_number = 0;

                    string userName = context.Request["UserName"];
                    string testID = context.Request["TestID"];

                    conn.Open();

                    SqlDataReader rdr = cmd.ExecuteReader();

                    if (rdr.HasRows)
                    {
                        while (rdr.Read())
                        {
                            rows_number++;

                            if ((rdr["TestID"].ToString() == testID) && (rdr["UserName"].ToString() == userName))
                            {
                                if (rdr["Finished"].ToString() == "True")
                                {
                                    context.Response.Write("<script>" +

                                        //"console.log('Z bazy danych Finished= '"+ rdr["Finished"].ToString().Trim() +"');" +
                                        "$('#fixer').css({'display':'none', 'visibility':'hidden'}).remove();" +
                                        "$('.btn-wrapper').css({'display':'none', 'visibility':'hidden'}).remove();" +
                                        "$('#checker').css({'display':'block', 'visibility':'visible'});" +
                                        "$('#demo').css({'display':'block', 'visibility':'visible'});" +
                                        "$('#demo').html('" + rdr["AnswersForStudent"].ToString().Trim() + "');" +
                                        "clearInterval(wal);" +
                                        "clearInterval(myInterval1);" +
                                        "clearInterval(myInterval2);" +
                                        "</script>");

                                    //return;
                                }
                                else if (rdr["Finished"].ToString() == "False")
                                {
                                    context.Response.Write("<script>" +
                                        "dbFinished='" + rdr["Finished"].ToString().Trim() + "';" +
                                        //"console.log('dbFinished: ' + dbFinished);" +
                                       "</script>");

                                    
                                    //return "StoppageTime:" + rdr["StoppageTime"].ToString().Trim();
                                    context.Response.Write("<script>var dbStoppageTime='" + rdr["StoppageTime"].ToString().Trim() + "';" +
                                        "dbUserName = '" + rdr["UserName"].ToString().Trim() + "';" +
                                        "</script>");
                                    //return;
                                }
                                context.Response.Write("<script>dbTestID='" + rdr["TestID"].ToString().Trim() + "';" +
                                    "</script>");


                            }
                            else
                            {
                                context.Response.Write("<script>dbStoppageTime='none';" +
                                            "dbUserName = 'none';" +
                                            "</script>");
                            }
                                                    context.Response.Write("<script>" +
                                        "dbUserName = '" + rdr["UserName"].ToString().Trim() + "';" +
                                        "dbFinished = '" + rdr["Finished"].ToString().Trim() + "';" +
                                        "dbAudiosStarted = '" + rdr["AudiosStarted"].ToString() + "';" +
                        "$('#checker').css({'display':'block', 'visibility':'visible'});" +
                        "$('#demo').css({'display':'block', 'visibility':'visible'});" +
                        "$('.btn-wrapper').css({'display':'block', 'visibility':'visible'});" +
                        "$('#fixer').css({'display':'block', 'visibility':'visible'});" +
                        //"alert('alert from LoadData');" + 
                        //"console.log('From DB:\\ndbStoppageTime:' + dbStoppageTime + '; dbUserName:'+ dbUserName);" +
                        "</script>");
                        }

                    }
                 

                    context.Response.Flush();

                    conn.Close(); //original

                }
                context.Response.End();

                return;



            }

        }

        [WebMethod]
        public void InsertData()
        {
            string jsonString = String.Empty;
            HttpContext context = HttpContext.Current;
            HttpContext.Current.Request.InputStream.Position = 0;
            using (System.IO.StreamReader inputStream = new System.IO.StreamReader(HttpContext.Current.Request.InputStream))
            {
                jsonString = inputStream.ReadToEnd();
                System.Web.Script.Serialization.JavaScriptSerializer jSerialize = new System.Web.Script.Serialization.JavaScriptSerializer();

                var dbInsertion = jSerialize.Deserialize<PropClass>(jsonString);

                if (dbInsertion != null)
                {
                 SqlConnection sqlConnection1 = new System.Data.SqlClient.SqlConnection("Data Source=**********;Initial Catalog=testy;Persist Security Info=True;User ID=**********;Password=**********;Pooling=False;MultipleActiveResultSets=False;Encrypt=False;TrustServerCertificate=True");

                    SqlCommand cmd = new SqlCommand()

                    {
                        CommandType = System.Data.CommandType.Text,

                        CommandText = "INSERT INTO TestsDone (TestID, TestType, TotalTestTime, [Group], Level, UserName, Email, Date, RevealDate, StartTime, EndTime, Started, Finished) VALUES (@testid, @testtype, @totaltesttime, @group, @level, @username, @email, @date, @revealdate, @starttime, @endtime, @started, @finished);",

                        Connection = sqlConnection1
                    };

                    cmd.Parameters.AddWithValue("@testid", dbInsertion.Id);
                    cmd.Parameters.AddWithValue("@testtype", dbInsertion.TestType);
                    cmd.Parameters.AddWithValue("@totaltesttime", dbInsertion.TotalTestTime);
                    cmd.Parameters.AddWithValue("@group", dbInsertion.Group);
                    cmd.Parameters.AddWithValue("@level", dbInsertion.Level);
                    cmd.Parameters.AddWithValue("@username", dbInsertion.UserName);
                    cmd.Parameters.AddWithValue("@email", dbInsertion.UserEmail);
                    cmd.Parameters.AddWithValue("@date", dbInsertion.Datee);
                    cmd.Parameters.AddWithValue("@revealdate", dbInsertion.RevealDate);
                    cmd.Parameters.AddWithValue("@starttime", dbInsertion.StartTime);
                    cmd.Parameters.AddWithValue("@endtime", dbInsertion.EndTime);
                    cmd.Parameters.AddWithValue("@started", dbInsertion.Started);
                    cmd.Parameters.AddWithValue("@finished", dbInsertion.Finished);


                    sqlConnection1.Open();

                    cmd.ExecuteNonQuery();
                    //cmd.ExecuteNonQueryAsync();
                    sqlConnection1.Close();
                    context.Response.Write("<div>Koniec operacji na bazie danych.</div><div>Status: " + context.Response.Status + "</div>");
                    return;
                }
            }

        }

        [WebMethod]

        public void UpdateOnSubmit()
        {

            using (System.IO.StreamReader inputStream = new System.IO.StreamReader(HttpContext.Current.Request.InputStream))
            {
                HttpContext context = HttpContext.Current;
                context.Response.ContentType = "text/html;charset=UTF-8";
                context.Response.CacheControl = "private";
                string jsonString = String.Empty;
                jsonString = inputStream.ReadToEnd();
                System.Web.Script.Serialization.JavaScriptSerializer jSerialize = new System.Web.Script.Serialization.JavaScriptSerializer();

                var dbInsertion = jSerialize.Deserialize<PropClass>(jsonString);


                if (dbInsertion != null)
                {

                    string constr = "Data Source=**********;Initial Catalog=testy;Persist Security Info=True;User ID=**********;Password=**********;Pooling=False;MultipleActiveResultSets=False;Encrypt=False;TrustServerCertificate=True";
                    using (SqlConnection con = new SqlConnection(constr))
                    {
                        using (SqlCommand cmd = new SqlCommand("UPDATE TestsDone SET EndTime=@EndTime, Finished = @Finished, AnswersForStudent=@answersforstudent, AnswersForTutor=@answersfortutor, ListeningGrade=@listeninggrade, ListeningPerc=@listeningperc, VocabularyGrade=@vocabularygrade, VocabularyPerc=@vocabularyperc, GrammarGrade=@grammargrade, GrammarPerc=@grammarperc, ReadingGrade=@readinggrade, ReadingPerc=@readingperc, TotalGrade=@totalgrade, TotalPerc=@totalperc, Remarks=@remarks WHERE UserName = @UserName AND TestID = @TestID"))
                        {
                            cmd.Parameters.AddWithValue("@TestID", dbInsertion.TestID);
                            cmd.Parameters.AddWithValue("@UserName", dbInsertion.UserName);
                            cmd.Parameters.AddWithValue("@EndTime", dbInsertion.EndTime);
                            cmd.Parameters.AddWithValue("@finished", dbInsertion.Finished);
                            cmd.Parameters.AddWithValue("@answersforstudent", dbInsertion.AnswersForStudent);
                            cmd.Parameters.AddWithValue("@answersfortutor", dbInsertion.AnswersForTutor);
                            cmd.Parameters.AddWithValue("@listeninggrade", dbInsertion.ListeningGrade);
                            cmd.Parameters.AddWithValue("@listeningperc", dbInsertion.ListeningPerc);
                            cmd.Parameters.AddWithValue("@vocabularygrade", dbInsertion.VocabularyGrade);
                            cmd.Parameters.AddWithValue("@vocabularyperc", dbInsertion.VocabularyPerc);
                            cmd.Parameters.AddWithValue("@grammargrade", dbInsertion.GrammarGrade);
                            cmd.Parameters.AddWithValue("@grammarperc", dbInsertion.GrammarPerc);
                            cmd.Parameters.AddWithValue("@readinggrade", dbInsertion.ReadingGrade);
                            cmd.Parameters.AddWithValue("@readingperc", dbInsertion.ReadingPerc);
                            cmd.Parameters.AddWithValue("@totalgrade", dbInsertion.TotalGrade);
                            cmd.Parameters.AddWithValue("@totalperc", dbInsertion.TotalPerc);
                            cmd.Parameters.AddWithValue("@remarks", dbInsertion.Remarks);


                            cmd.Connection = con;
                            con.Open();
                            cmd.ExecuteNonQuery();

                            con.Close();
                            return;
                        }
                    }
                }
            }
        }

        [WebMethod]
        public void EmailSendOut()
        {
            string jsonString = String.Empty;
            HttpContext context = HttpContext.Current;
            context.Response.ContentType = "text/html;charset=UTF-8";
            context.Response.CacheControl = "private";
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
                    //string subject = email.Subject + DateTime.Now.Date.ToShortDateString() + " r., godz. " + DateTime.Now.ToShortTimeString();
                    string subject = email.Subject;

                    //CultureInfo pl = new CultureInfo("pl-PL");
                    //string shortPlDateFormatString = pl.DateTimeFormat.ShortDatePattern;
                    //string shortPlTimeFormatString = pl.DateTimeFormat.ShortTimePattern;

                    //string subject = email.Subject + DateTime.Now.ToString(shortPlDateFormatString) + " r., godz. " + DateTime.Now.ToString(shortPlTimeFormatString);


                    //string pl_Date = DateTime.Now.Date.ToString("dd.MM.yyyy", new CultureInfo("pl-PL"));
                    //string pl_Time = DateTime.Now.TimeOfDay.ToString("hh:mm", new CultureInfo("pl-PL"));
                    //string subject = email.Subject + pl_Date + " r., godz. " + pl_Time;


                    //string bcc = "greensky@gazeta.pl, greansky@gmail.com";

                    //You can write here the code to send Email, see ,the Class System.Net.Mail.MailMessage on MSDN

                    //send the message
                    SmtpClient smtp = new SmtpClient("mail.engraft.pl", 587)

                    {
                        Credentials = new System.Net.NetworkCredential("admin", "**********"),
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
                        //context.Response.Write("Email Sendout successful");                   
                    //context.Response.Write(jSerialize.Serialize(
                    //     new
                    //     {
                    //         Response = "Email został pomyślnie wysłany."
                    //     }));
                }
            }

        }

        [WebMethod]
        public void CollectiveDataDownload(string UserName)
        {

            HttpContext context = HttpContext.Current;
            //context.Response.ContentType = "text/html;charset=UTF-8";
            context.Response.ContentType = "application/json;charset=UTF-8";
            context.Response.CacheControl = "private";
            //string ciag;
            var JSONString = new StringBuilder();
            JSONString.Append("[");

            System.Web.Script.Serialization.JavaScriptSerializer JsonSerializer =
        new System.Web.Script.Serialization.JavaScriptSerializer();

            string constr = "Data Source=**********;Initial Catalog=testy;Persist Security Info=True;User ID=**********;Password=**********;Pooling=False;MultipleActiveResultSets=False;Encrypt=False;TrustServerCertificate=True";
            using (SqlConnection conn = new SqlConnection(constr))
            {
                using (SqlCommand cmd = new SqlCommand("SELECT [Id], [TestType], [UserName], [RevealDate], [EndTime], [Finished], [AnswersForStudent], [ListeningGrade], [ListeningPerc], [VocabularyGrade], [VocabularyPerc], [GrammarGrade], [GrammarPerc], [ReadingGrade], [ReadingPerc], [WritingGrade], [WritingPerc], [TotalGrade], [TotalPerc], [Remarks] FROM TestsDone WHERE [UserName] = @UserName"))
                {

                    cmd.Parameters.AddWithValue("@UserName", UserName);
                    cmd.Connection = conn;
                    int rows_number = 0;

                    string userName = context.Request["UserName"];

                    conn.Open();

                    SqlDataReader rdr = cmd.ExecuteReader();

                    if (rdr.HasRows)
                    {
                        while (rdr.Read())
                        {
                            rows_number++;

                            if ((rdr["UserName"].ToString() == userName))
                            {
                                if (rdr["Finished"].ToString() == "True")
                                {
                                    //context.Response.BufferOutput = true;
                                    //context.Response.Write(string.Join("<br /><br />", "<script>" +
                                    //    "$('#demo').append('" + rdr["AnswersForStudent"].ToString().Trim() + "');" +
                                    //    "<br /><br /></script>"));


                                    //context.Response.Write("TestID:" + rdr["Id"] + ", TestType:" + rdr["TestType"] + ", EndTime:" + rdr["EndTime"] +", TotalGrade:" + rdr["TotalGrade"] + ", AnswersForStudent:" + rdr["AnswersForStudent"]);
                                    //context.Response.Write(JsonSerializer.Serialize("[{'TestID':'" + rdr["Id"] + "', 'TestType':'" + rdr["TestType"] + "', 'EndTime':'" + rdr["EndTime"] + "', 'TotalGrade':'" + rdr["TotalGrade"] + "', 'AnswersForStudent':'" + rdr["AnswersForStudent"] + "'}]"));



                                    //context.Response.Write(JsonSerializer.Serialize("[{'TestID':" + rdr["Id"] + ", 'TestType':" + rdr["TestType"] + ", 'EndTime':" + rdr["EndTime"] + ", 'TotalGrade':" + rdr["TotalGrade"] + ", 'AnswersForStudent':" + rdr["AnswersForStudent"] + "}]"));


                                    //ciag = "{'TestID:'" + rdr["Id"] + "', TestType:'" + rdr["TestType"] + "', EndTime:'" + rdr["EndTime"] + "', TotalGrade:'" + rdr["TotalGrade"] + "', AnswersForStudent:'" + rdr["AnswersForStudent"] + "}";

                                    
                                    //JSONString.AppendFormat("[\"{0}\",", rdr["Id"]);
                                    //JSONString.AppendFormat("\"{0}\",", rdr["TestType"]);
                                    //JSONString.AppendFormat("\"{0}\",", rdr["EndTime"]);
                                    //JSONString.AppendFormat("\"{0}\",", (rdr["TotalGrade"]).ToString().Replace(" ", ""));
                                    //JSONString.AppendFormat("\"{0}\"],", (rdr["AnswersForStudent"]).ToString().Replace("\"", "&#34;").Replace("'", "&#39;").Replace("\\", "&#92;"));

                                    JSONString.AppendFormat("{{\"dbTestId\":\"{0}\",", rdr["Id"]);
                                    JSONString.AppendFormat("\"TestType\":\"{0}\",", rdr["TestType"]);
                                    JSONString.AppendFormat("\"RevealDate\":\"{0}\",", rdr["RevealDate"]);
                                    JSONString.AppendFormat("\"EndTime\":\"{0}\",", rdr["EndTime"]);
                                    JSONString.AppendFormat("\"ListeningGrade\":\"{0}\",", (rdr["ListeningGrade"]).ToString().Trim());
                                    JSONString.AppendFormat("\"ListeningPerc\":\"{0}\",", (rdr["ListeningPerc"]).ToString().Replace(" ", ""));
                                    JSONString.AppendFormat("\"VocabularyGrade\":\"{0}\",", (rdr["VocabularyGrade"]).ToString().Trim());
                                    JSONString.AppendFormat("\"VocabularyPerc\":\"{0}\",", (rdr["VocabularyPerc"]).ToString().Trim());
                                    JSONString.AppendFormat("\"GrammarGrade\":\"{0}\",", (rdr["GrammarGrade"]).ToString().Trim());
                                    JSONString.AppendFormat("\"GrammarPerc\":\"{0}\",", (rdr["GrammarPerc"]).ToString().Trim());
                                    JSONString.AppendFormat("\"ReadingGrade\":\"{0}\",", (rdr["ReadingGrade"]).ToString().Trim());
                                    JSONString.AppendFormat("\"ReadingPerc\":\"{0}\",", (rdr["ReadingPerc"]).ToString().Trim());
                                    JSONString.AppendFormat("\"WritingGrade\":\"{0}\",", (rdr["WritingGrade"]).ToString().Trim());
                                    JSONString.AppendFormat("\"WritingPerc\":\"{0}\",", (rdr["WritingPerc"]).ToString().Trim());
                                    JSONString.AppendFormat("\"TotalGrade\":\"{0}\",", (rdr["TotalGrade"]).ToString().Replace(" ", ""));
                                    JSONString.AppendFormat("\"TotalPerc\":\"{0}\",", (rdr["TotalPerc"]).ToString().Trim());
                                    JSONString.AppendFormat("\"Remarks\":\"{0}\",", (rdr["Remarks"]).ToString().Trim());
                                    JSONString.AppendFormat("\"AnswersForStudent\":\"{0}\"}},", (rdr["AnswersForStudent"]).ToString().Replace("\"", "&#34;").Replace("'", "&#39;").Replace("\\", "&#92;"));



                                    ///to jest ok ooooooooooooooooooo
                                    //ciag = "TestID:" + rdr["Id"] + ", TestType:" + rdr["TestType"] + ", EndTime:" + rdr["EndTime"] + ", TotalGrade:" + rdr["TotalGrade"] + ", AnswersForStudent:" + rdr["AnswersForStudent"];


                                    ////ciag.Replace("\\'", "'");
                                    //context.Response.Write(ciag);
                                    ////oooooooooooooooooooooooooooooooooo


                                    //ciag = string.Join("]}", ciag);
                                    //context.Response.Write(JsonSerializer.Serialize(ciag));

                                    //return;
                                }

                                //return ciag;

                                //context.Response.Write("<script>" +
                                //                "dbUserName = '" + rdr["UserName"].ToString().Trim() + "';" +
                                //"$('#checker').css({'display':'block', 'visibility':'visible'});" +
                                //"$('#demo').css({'display':'block', 'visibility':'visible'});" +
                                //"$('.btn-wrapper').css({'display':'block', 'visibility':'visible'});" +
                                //"$('#fixer').css({'display':'block', 'visibility':'visible'});" +
                                ////"alert('alert from LoadData');" + 
                                //"</script>");


                            }
                            //return ciag;

                        }
                        JSONString.Remove(JSONString.Length - 1, 1);
                        if (JSONString.Length != 0)
                        {
                            JSONString.Append("]");
                        }
                        context.Response.Write(JSONString);
                        context.Response.Flush();

                        conn.Close(); //original

                    }

                    context.Response.End();



                }

            }

        }

        [WebMethod]
        public void DataSender(string TestID, string UserName)
        {
            HttpContext context = HttpContext.Current;
            context.Request.InputStream.Position = 0;
            //string TestID = context.Request["TestID"];
            //string UserName = context.Request["UserName"];
            string ColumnName = context.Request["ColumnName"];
            string ColumnValue = context.Request["ColumnValue"];

            string constr = "Data Source=**********;Initial Catalog=testy;Persist Security Info=True;User ID=**********;Password=**********;Pooling=False;MultipleActiveResultSets=False;Encrypt=False;TrustServerCertificate=True";
            using (SqlConnection con = new SqlConnection(constr))
            {
                using (SqlCommand cmd = new SqlCommand("UPDATE TestsDone SET " + ColumnName + " = CONCAT(" + ColumnName + ",'" + @ColumnValue + "', ' ') WHERE UserName = @UserName AND TestID = @TestID"))
                {


                    cmd.Parameters.AddWithValue("@TestID", TestID);
                    cmd.Parameters.AddWithValue("@UserName", UserName);
                    cmd.Parameters.AddWithValue("@" + ColumnName + "", ColumnName);
                    cmd.Parameters.AddWithValue("@" + ColumnValue + "", ColumnValue);

                    cmd.Connection = con;

                    con.Open();

                    cmd.ExecuteNonQuery();

                    con.Close();
                    context.Response.Write("<div>Koniec operacji DataSender na bazie danych.</div><div>Status: " + context.Response.Status + "</div>");
                    return;
                }
            }
        }


        [WebMethod]
        public void CollectiveUsersDownload()
        {

            HttpContext context = HttpContext.Current;
            //context.Response.ContentType = "text/html;charset=UTF-8";
            context.Response.ContentType = "application/json;charset=UTF-8";
            context.Response.CacheControl = "private";
            //string ciag;
            var JSONString = new StringBuilder();
            JSONString.Append("[");

            System.Web.Script.Serialization.JavaScriptSerializer JsonSerializer =
        new System.Web.Script.Serialization.JavaScriptSerializer();

            string constr = "Data Source=**********;Initial Catalog=testy;Persist Security Info=True;User ID=**********;Password=**********;Pooling=False;MultipleActiveResultSets=False;Encrypt=False;TrustServerCertificate=True";
            using (SqlConnection conn = new SqlConnection(constr))
            {
                using (SqlCommand cmd = new SqlCommand("SELECT DISTINCT [UserName] FROM TestsDone WHERE [Finished] = 'True' ORDER BY [UserName]"))
                {

                    //cmd.Parameters.AddWithValue("@UserName", UserName);
                    cmd.Connection = conn;
                    int rows_number = 0;

                    //string userName = context.Request["UserName"];

                    conn.Open();

                    SqlDataReader rdr = cmd.ExecuteReader();

                    if (rdr.HasRows)
                    {
                        while (rdr.Read())
                        {
                            rows_number++;

                            //if ((rdr["UserName"].ToString() == userName))
                            //{
                            //    if (rdr["Finished"].ToString() == "True")
                            //    {
                                    JSONString.AppendFormat("{{\"dbUserName\":\"{0}\"}},", rdr["UserName"]);
                            //    }
                            //}
                            //return ciag;

                        }
                        JSONString.Remove(JSONString.Length - 1, 1);
                        if (JSONString.Length != 0)
                        {
                            JSONString.Append("]");
                        }
                        context.Response.Write(JSONString);
                        context.Response.Flush();

                        conn.Close(); //original

                    }

                    context.Response.End();



                }

            }

        }

        [WebMethod]
        public void UpdateOnCheckup()
        {

            using (System.IO.StreamReader inputStream = new System.IO.StreamReader(HttpContext.Current.Request.InputStream))
            {
                HttpContext context = HttpContext.Current;
                context.Response.ContentType = "text/html;charset=UTF-8";
                context.Response.CacheControl = "private";
                string jsonString = String.Empty;
                jsonString = inputStream.ReadToEnd();
                System.Web.Script.Serialization.JavaScriptSerializer jSerialize = new System.Web.Script.Serialization.JavaScriptSerializer();

                var dbInsertion = jSerialize.Deserialize<PropClass>(jsonString);


                if (dbInsertion != null)
                {

                    string constr = "Data Source=**********;Initial Catalog=testy;Persist Security Info=True;User ID=**********;Password=**********;Pooling=False;MultipleActiveResultSets=False;Encrypt=False;TrustServerCertificate=True";
                    using (SqlConnection con = new SqlConnection(constr))
                    {
                        using (SqlCommand cmd = new SqlCommand("UPDATE TestsDone SET AnswersForStudent=@answersforstudent,  ListeningGrade=@listeninggrade, ListeningPerc=@listeningperc, VocabularyGrade=@vocabularygrade, VocabularyPerc=@vocabularyperc, GrammarGrade=@grammargrade, GrammarPerc=@grammarperc, ReadingGrade=@readinggrade, ReadingPerc=@readingperc, WritingGrade=@writinggrade, WritingPerc=@writingperc, TotalGrade=@totalgrade, TotalPerc=@totalperc, Remarks=@remarks WHERE Id = @Id"))
                        {
                            cmd.Parameters.AddWithValue("@Id", dbInsertion.Id);

                            cmd.Parameters.AddWithValue("@answersforstudent", dbInsertion.AnswersForStudent);

                            cmd.Parameters.AddWithValue("@listeninggrade", dbInsertion.ListeningGrade);
                            cmd.Parameters.AddWithValue("@listeningperc", dbInsertion.ListeningPerc);
                            cmd.Parameters.AddWithValue("@vocabularygrade", dbInsertion.VocabularyGrade);
                            cmd.Parameters.AddWithValue("@vocabularyperc", dbInsertion.VocabularyPerc);
                            cmd.Parameters.AddWithValue("@grammargrade", dbInsertion.GrammarGrade);
                            cmd.Parameters.AddWithValue("@grammarperc", dbInsertion.GrammarPerc);
                            cmd.Parameters.AddWithValue("@readinggrade", dbInsertion.ReadingGrade);
                            cmd.Parameters.AddWithValue("@readingperc", dbInsertion.ReadingPerc);
                            cmd.Parameters.AddWithValue("@writinggrade", dbInsertion.WritingGrade);
                            cmd.Parameters.AddWithValue("@writingperc", dbInsertion.WritingPerc);
                            cmd.Parameters.AddWithValue("@totalgrade", dbInsertion.TotalGrade);
                            cmd.Parameters.AddWithValue("@totalperc", dbInsertion.TotalPerc);
                            cmd.Parameters.AddWithValue("@remarks", dbInsertion.Remarks);


                            cmd.Connection = con;
                            con.Open();
                            cmd.ExecuteNonQuery();

                            con.Close();
                            context.Response.Write("<div>Koniec operacji UpdateOnCheckup na bazie danych.</div><div>Status: " + context.Response.Status + "</div><div>" + jsonString + "</div");
                            return;
                        }
                    }
                }
            }
        }


    }

}


