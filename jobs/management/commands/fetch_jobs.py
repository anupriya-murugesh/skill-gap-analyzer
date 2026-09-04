from django.core.management.base import BaseCommand
import requests
from datetime import datetime
from jobs.models import Job

class Command(BaseCommand):
    help = 'Fetches latest job postings from Arbeitnow API'

    def handle(self, *args, **kwargs):
        response = requests.get('https://www.arbeitnow.com/api/job-board-api')
        data = response.json()
        jobs_list = data['data']

        saved_count = 0
        for job in jobs_list:
            title = job.get('title', 'Untitled')
            company = job.get('company_name', 'Unknown')
            location = job.get('location', 'Not specified')
            skills_text = ', '.join(job.get('tags', []))
            apply_link = job.get('url', '')

            if not Job.objects.filter(title=title, company=company, apply_link=apply_link).exists():
                Job.objects.create(
                    title=title, company=company, location=location,
                    posting_date=datetime.today().date(),
                    apply_link=apply_link, skills_text=skills_text
                )
                saved_count += 1

        self.stdout.write(self.style.SUCCESS(f'Done. {saved_count} new jobs saved.'))