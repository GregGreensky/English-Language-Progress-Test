USE [C:\USERS\GRZEGORZ\DOCUMENTS\VISUAL STUDIO 2017\PROJECTS\TESTYDBTRYOUT\TESTYDBTRYOUT\APP_DATA\TESTYDB.MDF]
GO

/****** Object: Table [dbo].[TestsDone] Script Date: 2018-07-25 22:55:12 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[TestsDone] (
	[Id]                INT            NOT NULL,
	[TestID]            NVARCHAR (50)  NULL,
	[Date]              DATE           NULL,
	[StartTime]         DATETIME       NULL,
	[EndTime]           DATETIME       NULL,
	[Duration]           DATETIME       NULL,
	[Started]           BIT            NULL,
	[Finished]          BIT            NULL,
	[AnswersForTutor]   NVARCHAR (MAX) NULL,
	[AnswersForStudent] NVARCHAR (MAX) NULL,
	[UserName]          NVARCHAR (50)  NULL,
	[Remarks]           NVARCHAR (MAX) NULL
);


