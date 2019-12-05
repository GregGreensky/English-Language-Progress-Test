using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace TestyDbTryout
{
    public class Mail
    {
        public String From { get; set; }
        public String To { get; set; }
        public String Body { get; set; }
        public String Subject { get; set; }
        public String Bcc { get; set; }
    }
}