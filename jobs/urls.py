from django.urls import path
from . import views

urlpatterns = [
    path('jobs/', views.job_list),
    path('demand-ranking/', views.demand_ranking),
    path('skill-gap/', views.skill_gap),
]