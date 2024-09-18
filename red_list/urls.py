from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from redlistapp.views import (
    SpeciesViewSet,
    ReportViewSet,
    EnvironmentalDataViewSet,
    AlertViewSet
)
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

# Initialize the router
router = DefaultRouter()
router.register(r'species', SpeciesViewSet)
router.register(r'reports', ReportViewSet)
router.register(r'environmental-data', EnvironmentalDataViewSet)
router.register(r'alerts', AlertViewSet)

# Set up the schema view for Swagger documentation
schema_view = get_schema_view(
    openapi.Info(
        title="Red List API",
        default_version='v1',
        description="API documentation for the Red List application",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="contact@redlist.local"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/auth/', include('djoser.urls')), 
    path('api/auth/', include('djoser.urls.jwt')),  # For JWT-based authentication
    
    # Swagger and ReDoc documentation
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]

# Serving media files during development (for image uploads)
from django.conf import settings
from django.conf.urls.static import static

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
