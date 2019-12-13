using System;
using System.Data.SqlClient;
using System.Web;

namespace TestyDbTryout
{
    /// <summary>
    /// Summary description for DbInsert
    /// </summary>
    public class DbInsert : IHttpHandler
    {
        //private readonly string starttime;
        //private readonly string testid;
        //private readonly string username;
        //private readonly string date;
        //private readonly string started;
        //private readonly string answersfortutor;
        //private readonly string remarks;
        //private readonly string endtime;
        //private readonly string finished;

        public void ProcessRequest(HttpContext context)
        {
            string jsonString = String.Empty;
            HttpContext.Current.Request.InputStream.Position = 0;
            using (System.IO.StreamReader inputStream = new System.IO.StreamReader(HttpContext.Current.Request.InputStream))
            {
                jsonString = inputStream.ReadToEnd();
                System.Web.Script.Serialization.JavaScriptSerializer jSerialize = new System.Web.Script.Serialization.JavaScriptSerializer();

                var dbInsertion = jSerialize.Deserialize<PropClass>(jsonString);

                if (dbInsertion != null)
                {
                    //string id = dbInsertion.Id;
                    //string @testid = dbInsertion.TestID;
                    //string @username = dbInsertion.UserName;
                    //DateTime @date = dbInsertion.Datee;
                    //DateTime @starttime = dbInsertion.StartTime;
                    //DateTime @endtime = dbInsertion.EndTime;
                    ////string duration = dbInsertion.Duration;
                    //bool @started = dbInsertion.Started;
                    //bool @finished = dbInsertion.Finished;
                    //string @answersfortutor = dbInsertion.AnswersForTutor;
                    //string @answersforstudent = dbInsertion.AnswersForStudent;
                    //string @remarks = dbInsertion.Remarks;

                    //string id = context.Request["Id"].ToString();
                    //string @testid = context.Request["TestID"];
                    //string @username = context.Request["UserName"];
                    //string @date = context.Request["Date"];
                    //string @starttime = context.Request["StartTime"];
                    //string @endtime = context.Request["EndTime"];
                    ////string duration = context.Request["Duation"];
                    //string @started = context.Request["Started"];
                    //string @finished = context.Request["Finished"];
                    //string @answersfortutor = context.Request["AnswersForTutor"];
                    //string @answersforstudent = context.Request["AnswersForStudent"];
                    //string @remarks = context.Request["Remarks"];

                    //string connect = "Data Source=LAPTOP-G\\SQLEXPRESS;Initial Catalog=Testery;User ID=**********;Password=**********";

                    //string query = "INSERT INTO TestsDone(TestID, UserName, Date, StartTime, EndTime, Duration, Started," +
                    //      "Finished, AnswersForTutor, Remarks)" + "VALUES(testid, username, date, starttime," +
                    //      "endtime, started, finished, answersfortutor, remarks";

                    //using (SqlConnection conn = new SqlConnection(connect))
                    //{
                    //    using (SqlCommand cmd = new SqlCommand(query, conn))
                    //    {
                    //        conn.Open();
                    //        SqlDataAdapter adapter = new SqlDataAdapter();

                    //}
                    //    }
                    //}

                    //context.Response.ContentType = "text/html";
                    //SqlConnection sqlConnection1 =
                    //    new System.Data.SqlClient.SqlConnection("Data Source=LAPTOP-G\\SQLEXPRESS;Initial Catalog=Testy;User ID=**********;Password=**********");

                    SqlConnection sqlConnection1 = new System.Data.SqlClient.SqlConnection("Data Source=**********;Initial Catalog=testy;Persist Security Info=True;User ID=greensky_**********;Password=**********;Pooling=False;MultipleActiveResultSets=False;Encrypt=False;TrustServerCertificate=True");

                    SqlCommand cmd = new SqlCommand()

                    {
                        CommandType = System.Data.CommandType.Text,

                        CommandText = "INSERT INTO TestsDone (TestID, TestType, TotalTestTime, [Group], Level, UserName, Email, Date, StartTime, EndTime, Started, Finished, AnswersForTutor, AnswersForStudent, ListeningGrade, ListeningPerc, VocabularyGrade, VocabularyPerc, GrammarGrade, GrammarPerc, ReadingGrade, ReadingPerc, Remarks) VALUES (@testid, @testtype, @totaltesttime, @group, @level, @username, @email, @date, @starttime, @endtime, @started, @finished, @answersfortutor, @answersforstudent, @listeninggrade, @listeningperc, @vocabularygrade, @vocabularyperc, @grammargrade, @grammarperc, @readinggrade, @readingperc, @remarks);",

                        Connection = sqlConnection1
                    };

                    //cmd.Parameters.Add("@testid");
                    //cmd.Parameters.Add("@username");
                    //cmd.Parameters.Add("@date");
                    //cmd.Parameters.Add("@starttime");
                    //cmd.Parameters.Add("@endtime");
                    //cmd.Parameters.Add("@started");
                    //cmd.Parameters.Add("@answersforstudent");
                    //cmd.Parameters.Add("@answersfortutor");
                    //cmd.Parameters.Add("@remarks");
                    //cmd.Parameters.AddWithValue("@TestID", context.Request["TestID"]);
                    //cmd.Parameters.AddWithValue("@username", context.Request["UserName"]);
                    //cmd.Parameters.AddWithValue("@date", context.Request["Datee"]);
                    //cmd.Parameters.AddWithValue("@starttime", context.Request["StartTime"]);
                    //cmd.Parameters.AddWithValue("@endtime", context.Request["EndTime"]);
                    //cmd.Parameters.AddWithValue("@started", context.Request["Started"]);
                    //cmd.Parameters.AddWithValue("@finished", context.Request["Finished"]);
                    //cmd.Parameters.AddWithValue("@answersforstudent", context.Request["AnswersForStudent"]);
                    //cmd.Parameters.AddWithValue("@answersfortutor", context.Request["AnswersForTutor"]);
                    //cmd.Parameters.AddWithValue("@remarks", context.Request["Remarks"]);

                    cmd.Parameters.AddWithValue("@testid", dbInsertion.Id);
                    cmd.Parameters.AddWithValue("@testtype", dbInsertion.TestType);
                    cmd.Parameters.AddWithValue("@totaltesttime", dbInsertion.TotalTestTime);
                    cmd.Parameters.AddWithValue("@group", dbInsertion.Group);
                    cmd.Parameters.AddWithValue("@level", dbInsertion.Level);
                    cmd.Parameters.AddWithValue("@username", dbInsertion.UserName);
                    cmd.Parameters.AddWithValue("@email", dbInsertion.UserEmail);
                    cmd.Parameters.AddWithValue("@date", dbInsertion.Datee);
                    cmd.Parameters.AddWithValue("@starttime", dbInsertion.StartTime);
                    cmd.Parameters.AddWithValue("@endtime", dbInsertion.EndTime);
                    cmd.Parameters.AddWithValue("@started", dbInsertion.Started);
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
                    cmd.Parameters.AddWithValue("@remarks", dbInsertion.Remarks);

                    sqlConnection1.Open();

                    cmd.ExecuteNonQuery();
                    //cmd.ExecuteNonQueryAsync();
                    sqlConnection1.Close();
                    context.Response.Write("<div>Koniec operacji na bazie danych.</div><div>Status: " + context.Response.Status + "</div>");
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