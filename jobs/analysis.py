from collections import Counter
from jobs.models import Job

def get_skill_demand_ranking():
    all_jobs = Job.objects.all()
    skill_counter = Counter()

    for job in all_jobs:
        if job.skills_text:
            skills = [s.strip().lower() for s in job.skills_text.split(',') if s.strip()]
            skill_counter.update(skills)

    total_jobs = all_jobs.count()
    ranking = []
    for skill, count in skill_counter.most_common():
        percentage = round((count / total_jobs) * 100, 1) if total_jobs else 0
        ranking.append({'skill': skill, 'count': count, 'percentage': percentage})

    return ranking

def get_skill_gap(user_skills):
    user_skills_clean = set(s.strip().lower() for s in user_skills)
    demand_ranking = get_skill_demand_ranking()

    matched = []
    missing = []

    for entry in demand_ranking:
        if entry['skill'] in user_skills_clean:
            matched.append(entry)
        else:
            missing.append(entry)

    return {
        'matched_skills': matched,
        'missing_skills': missing
    }