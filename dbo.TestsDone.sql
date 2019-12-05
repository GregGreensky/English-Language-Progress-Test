CREATE TABLE [dbo].[TestsDone] (
    [Id]                INT            NOT NULL,
    [TestID]            NVARCHAR (50)  NULL,
    [UserName]          NVARCHAR (50)  NULL,
    [Date]              NVARCHAR(50)           NULL,
    [StartTime]         NVARCHAR(50)       NULL,
    [EndTime]           NVARCHAR(50)       NULL,
    [Duration]          AS             (format([EndTime]-[StartTime],N'%H "godz." %m "min." %s "sek."')),
    [Started]           BIT            NULL,
    [Finished]          BIT            NULL,
    [AnswersForTutor]   NVARCHAR (MAX) NULL,
    [AnswersForStudent] NVARCHAR (MAX) NULL,
    [Remarks]           NVARCHAR (MAX) NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);

