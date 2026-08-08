# MeetMind AI — Backend

MeetMind AI is an AI-powered meeting assistant that records meeting audio, processes it using AI, generates a transcript, summary, and action items, and stores the processed meeting for later access.

This repository contains the backend/API server for MeetMind AI.

The backend is responsible for:

- User authentication and authorization
- Meeting upload and storage
- Audio processing pipeline
- AI transcription
- AI-generated meeting summaries
- AI-generated action items
- Meeting management
- Meeting search
- Pagination
- Meeting status filtering
- Meeting statistics
- Email delivery
- Centralized error handling
- Database persistence
- Cloud file storage

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [System Architecture](#system-architecture)
- [High-Level Request Flow](#high-level-request-flow)
- [AI Processing Pipeline](#ai-processing-pipeline)
- [Project Structure](#project-structure)
- [Folder Responsibilities](#folder-responsibilities)
- [Authentication Architecture](#authentication-architecture)
- [Meeting Architecture](#meeting-architecture)
- [Meeting Status Lifecycle](#meeting-status-lifecycle)
- [Database Architecture](#database-architecture)
- [Meeting Schema](#meeting-schema)
- [AI Architecture](#ai-architecture)
- [Email Architecture](#email-architecture)
- [Search, Pagination and Filtering](#search-pagination-and-filtering)
- [Meeting Statistics](#meeting-statistics)
- [Error Handling](#error-handling)
- [API Documentation](#api-documentation)
- [Environment Variables](#environment-variables)
- [Local Development](#local-development)
- [Production Architecture](#production-architecture)
- [Security Considerations](#security-considerations)
- [Current Limitations](#current-limitations)
- [Future Improvements](#future-improvements)
- [Engineering Decisions](#engineering-decisions)
- [Conclusion](#conclusion)

---

# Project Overview

MeetMind AI allows users to upload recorded meeting audio and automatically transform it into structured meeting information.

The core workflow is:

```text
Meeting Audio
     │
     ▼
Frontend Recording
     │
     ▼
Backend Upload API
     │
     ▼
Cloudinary
     │
     ▼
MongoDB Meeting Document
     │
     ▼
Background AI Pipeline
     │
     ├──► Speech-to-Text
     │
     ├──► Meeting Summary
     │
     ├──► Action Items
     │
     └──► Email Delivery
     │
     ▼
Completed Meeting
```

# System Architecture

MeetMind AI follows a layered backend architecture.

                         ┌──────────────────────┐
                         │      Frontend        │
                         │   React + TypeScript  │
                         └──────────┬───────────┘
                                    │
                                    │ HTTP / REST
                                    ▼
                         ┌──────────────────────┐
                         │       Express        │
                         │       Routes         │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │     Controllers      │
                         │ Request / Response   │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │       Services       │
                         │    Business Logic    │
                         └──────┬───────┬───────┘
                                │       │
                     ┌──────────┘       └─────────────┐
                     ▼                                ▼
             ┌───────────────┐                ┌───────────────┐
             │    MongoDB    │                │ External APIs │
             │   Mongoose    │                │               │
             └───────────────┘                │ Groq          │
                                              │ Cloudinary    │
                                              │ Resend        │
                                              └───────────────┘

# High-Level Request Flow

Client
  │
  ▼
Express Router
  │
  ▼
Authentication Middleware
  │
  ▼
Controller
  │
  ▼
Service
  │
  ▼
MongoDB / External Service
  │
  ▼
Service Response
  │
  ▼
Controller
  │
  ▼
JSON Response


# AI Processing Pipeline

POST /api/meetings/upload
          │
          ▼
Upload audio to Cloudinary
          │
          ▼
Create Meeting document
          │
          ▼
Return response immediately
          │
          ▼
Start background processing
          │
          ▼
processMeeting()
          │
          ├───────────────┐
          ▼               │
    Transcription         │
          │               │
          ▼               │
      Transcript          │
          │               │
          ▼               │
      Summarization       │
          │               │
          ▼               │
       Summary            │
          │               │
          ▼               │
    Action Items          │
          │               │
          ▼               │
     Email Delivery       │
          │               │
          ▼               │
       Completed


# Project Structure

meet-mind-ai-be/
│
├── config/
│   └── db.js
│
├── constants/
│   └── statusCodes.js
│
├── controllers/
│   ├── auth.controller.js
│   ├── meeting.controller.js
│   └── user.controller.js
│
├── middleware/
│   ├── auth.middleware.js
│   ├── error.middleware.js
│   └── upload.middleware.js
│
├── models/
│   ├── User.js
│   └── Meeting.js
│
├── routes/
│   ├── auth.routes.js
│   ├── meeting.routes.js
│   └── user.routes.js
│
├── services/
│   ├── ai.service.js
│   ├── aiPipeline.service.js
│   ├── meeting.service.js
│   └── user.service.js
│
├── templates/
│   └── meetingEmailTemplate.js
│
├── utils/
│   ├── AppError.js
│   ├── uploadToCloudinary.js
│   └── sendMeetingEmail.js
│
├── app.js
├── server.js
├── package.json
├── .env
└── README.md
