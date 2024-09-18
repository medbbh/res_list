from rest_framework import serializers
from .models import Species, UserProfile, Report, EnvironmentalData, Alert

class SpeciesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Species
        fields = '__all__'

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'

class ReportSerializer(serializers.ModelSerializer):
    species = SpeciesSerializer(read_only=True)
    
    class Meta:
        model = Report
        fields = '__all__'

class EnvironmentalDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = EnvironmentalData
        fields = '__all__'

class AlertSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alert
        fields = '__all__'
