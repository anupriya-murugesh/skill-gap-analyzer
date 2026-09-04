from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Job
from .serializers import JobSerializer
from .analysis import get_skill_demand_ranking, get_skill_gap

@api_view(['GET'])
def job_list(request):
    keyword = request.GET.get('keyword', '')
    location = request.GET.get('location', '')
    skill = request.GET.get('skill', '')
    sort_by = request.GET.get('sort', '-posting_date')

    jobs = Job.objects.all()
    if keyword:
        jobs = jobs.filter(title__icontains=keyword)
    if location:
        jobs = jobs.filter(location__icontains=location)
    if skill:
        jobs = jobs.filter(skills_text__icontains=skill)

    jobs = jobs.order_by(sort_by)

    serializer = JobSerializer(jobs, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def demand_ranking(request):
    ranking = get_skill_demand_ranking()
    return Response(ranking)

@api_view(['POST'])
def skill_gap(request):
    user_skills = request.data.get('skills', [])
    result = get_skill_gap(user_skills)
    return Response(result)