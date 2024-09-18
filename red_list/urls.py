from django.urls import path, include
from rest_framework.routers import DefaultRouter
from redlistapp.views import *

router = DefaultRouter()
router.register(r'species', SpeciesViewSet)
router.register(r'reports', ReportViewSet)
router.register(r'environmental-data', EnvironmentalDataViewSet)
router.register(r'alerts', AlertViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('auth/', include('djoser.urls')), 
    path('auth/', include('djoser.urls.jwt')),  # For JWT-based authentication
]