from rest_framework import viewsets, permissions,filters
from .models import Species, Report, EnvironmentalData, Alert
from .serializers import SpeciesSerializer, ReportSerializer, EnvironmentalDataSerializer, AlertSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend

# viewSet for species
class SpeciesViewSet(viewsets.ModelViewSet):
    queryset = Species.objects.all()
    serializer_class = SpeciesSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'habitat']
    search_fields = ['name', 'scientific_name']
    ordering_fields = ['name', 'last_sighted']

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def update_status(self, request, pk=None):
        species = self.get_object()
        species.status = request.data.get('status', species.status)
        species.save()
        return Response({'status': 'status updated'})
    
# viewSet for reports
class ReportViewSet(viewsets.ModelViewSet):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAdminUser])
    def verify(self, request, pk=None):
        report = self.get_object()
        report.verified = True
        report.save()
        return Response({'status': 'report verified'})

# ViewSet for EnvironmentalData
class EnvironmentalDataViewSet(viewsets.ModelViewSet):
    queryset = EnvironmentalData.objects.all()
    serializer_class = EnvironmentalDataSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

# ViewSet for Alerts
class AlertViewSet(viewsets.ModelViewSet):
    queryset = Alert.objects.all()
    serializer_class = AlertSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
