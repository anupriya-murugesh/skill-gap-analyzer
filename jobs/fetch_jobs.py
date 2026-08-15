import os
import sys
import django
import requests
from datetime import datetime

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from jobs.models import Job

response = requests.get('https://www.arbeitnow.com/api/job-board-api')
data = response.json()

jobs_list = data['data']

for job in jobs_list:
    title = job.get('title', 'Untitled')
    company = job.get('company_name', 'Unknown')
    location = job.get('location', 'Not specified')
    tags = job.get('tags', [])
    skills_text = ', '.join(tags)
    apply_link = job.get('url', '')

    already_exists = Job.objects.filter(title=title, company=company, apply_link=apply_link).exists()

    if not already_exists:
        Job.objects.create(
            title=title,
            company=company,
            location=location,
            posting_date=datetime.today().date(),
            apply_link=apply_link,
            skills_text=skills_text
        )
        print(f"Saved: {title} at {company}")
    else:
        print(f"Skipped (already exists): {title} at {company}")

print("Done.")