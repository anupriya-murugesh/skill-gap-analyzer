from django.db import models

# Create your models here.
from django.db import models

class Job(models.Model):
    title = models.CharField(max_length=200)
    company = models.CharField(max_length=150)
    location = models.CharField(max_length=150)
    posting_date = models.DateField()
    apply_link = models.URLField()
    skills_text = models.TextField(blank=True)

    def __str__(self):
        return f"{self.title} at {self.company}"