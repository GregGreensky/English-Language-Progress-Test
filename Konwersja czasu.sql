ALTER TABLE dbo.TestsDone DROP COLUMN Duration;  
GO  
ALTER TABLE dbo.TestsDone ADD Duration AS FORMAT((EndTime - StartTime), N'%H "godz." %m "min." %s "sek"') ;
GO