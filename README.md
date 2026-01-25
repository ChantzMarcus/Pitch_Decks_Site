# Pitch Decks Site

Lead generation platform for film/TV development clients. Captures leads through a qualification questionnaire, scores them based on budget/timeline/readiness, and integrates with external analysis software to provide project feedback.

## Features

- **Lead Qualification Questionnaire**: Multi-step form capturing project details, financial capacity, and timeline
- **Lead Scoring Engine**: Automatic scoring (0-100) based on budget, timeline, material readiness, and experience
- **File Uploads**: Accept scripts, treatments, pitch decks (PDF, DOCX, PPTX)
- **Idea Submissions**: For leads without material ready
- **Analysis Integration**: Connects to your external analysis software for project evaluation
- **Email Notifications**: Automated welcome emails and analysis delivery
- **Lead Management API**: Admin endpoints for tracking and managing leads

## Tech Stack

- **Backend**: FastAPI (Python 3.11+)
- **Database**: PostgreSQL with SQLAlchemy async
- **File Storage**: Local filesystem or S3
- **Background Tasks**: Celery with Redis
- **Email**: FastAPI-Mail (SMTP)

## Project Structure

```
Pitch_Decks_Site/
├── backend/
│   └── app/
│       ├── api/              # API route handlers
│       │   ├── analysis.py   # Analysis endpoints
│       │   ├── leads.py      # Lead management
│       │   ├── questionnaire.py  # Form submission
│       │   └── submissions.py    # File uploads
│       ├── core/             # Configuration
│       ├── db/               # Database models & session
│       ├── schemas/          # Pydantic validation schemas
│       └── services/         # Business logic
│           ├── analysis_integration.py  # External software integration
│           ├── email_service.py         # Email sending
│           ├── file_handler.py          # Upload handling
│           └── lead_scoring.py          # Scoring engine
├── docker-compose.yml
├── Dockerfile
├── requirements.txt
└── .env.example
```

## Quick Start

### 1. Clone and Setup Environment

```bash
cp .env.example .env
# Edit .env with your configuration
```

### 2. Run with Docker

```bash
docker-compose up -d
```

API will be available at `http://localhost:8000`

### 3. Run Locally (Development)

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # or `venv\Scripts\activate` on Windows

# Install dependencies
pip install -r requirements.txt

# Start PostgreSQL and Redis (or use docker-compose for just those)
docker-compose up -d db redis

# Run the API
cd backend
uvicorn app.main:app --reload
```

## API Endpoints

### Questionnaire
- `GET /api/questionnaire/options` - Get form dropdown options
- `POST /api/questionnaire/submit` - Submit questionnaire

### Submissions
- `POST /api/submissions/upload` - Upload material (script/treatment/deck)
- `POST /api/submissions/idea` - Submit idea description
- `GET /api/submissions/{id}/status` - Check submission status

### Analysis
- `POST /api/analysis/trigger` - Trigger analysis for a submission
- `GET /api/analysis/lead/{lead_id}` - Get all analyses for a lead
- `GET /api/analysis/{id}` - Get specific analysis result

### Leads (Admin)
- `GET /api/leads/` - List leads with filtering
- `GET /api/leads/stats` - Dashboard statistics
- `GET /api/leads/{id}` - Get lead details
- `GET /api/leads/{id}/full` - Full lead profile with questionnaire/submissions
- `PATCH /api/leads/{id}/status` - Update lead pipeline status

## Lead Scoring

Leads are scored 0-100 based on:

| Factor | Max Points | Description |
|--------|------------|-------------|
| Budget | 30 | Financial capacity ($10M+ = 30pts) |
| Material Readiness | 25 | Development stage + has material |
| Timeline | 20 | How soon they need services |
| Project Type | 15 | Feature film/TV series score higher |
| Experience | 10 | Previous industry credits |

**Tiers:**
- **Hot** (70+): High priority, ready to engage
- **Warm** (45-69): Good potential, follow up
- **Cold** (20-44): Needs nurturing
- **Unqualified** (<20): Not a fit

## Analysis Software Integration

The platform integrates with your existing analysis software via HTTP API.

Configure in `.env`:
```
ANALYSIS_SOFTWARE_URL=http://your-analysis-software/analyze
ANALYSIS_SOFTWARE_API_KEY=your-api-key
```

Expected request/response format is documented in `backend/app/services/analysis_integration.py`.

## License

Proprietary - All rights reserved.
