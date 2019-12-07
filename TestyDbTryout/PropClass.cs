using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace TestyDbTryout
{
/// <summary>
/// Wyliczenie właściwości tej klasy umożliwiające dostęp do bazy danych
/// </summary>

    public class PropClass

            
    {
        //public string Id { get; set; }
        public string StoppageTime { get; set; }
        public string TestType { get; set; }
        public string TotalTestTime { get; set; }
        public string Group { get; set; }
        public string Level { get; set; }
        public string UserName { get; set; }
        public string UserEmail { get; set; }
        public DateTime Datee { get; set; }
        public DateTime RevealDate { get; set; }
        public DateTime StartTime { get; set; }
        public string AudiosStarted { get; set; }
        public DateTime EndTime { get; set; }
        //public string Duration { get; set; }
        public bool Started { get; set; }
        public bool Finished { get; set; }
        public string AnswersForTutor { get; set; }
        public string AnswersForStudent { get; set; }
        public string ListeningGrade { get; set; }
        public string ListeningPerc { get; set; }
        public string VocabularyGrade { get; set; }
        public string VocabularyPerc { get; set; }
        public string GrammarGrade { get; set; }
        public string GrammarPerc { get; set; }
        public string ReadingGrade { get; set; }
        public string ReadingPerc { get; set; }
        public string Remarks { get; set; }
        public string Id { get; set; }
        public string TotalGrade { get; set; }
        public string TotalPerc { get; set; }
        public object WritingGrade { get; set; }
        public object WritingPerc { get; set; }
        public string TestID { get; set; }

    }


}