from rest_framework import serializers
from .models import Species, UserProfile, Report, EnvironmentalData, Alert

class SpeciesSerializer(serializers.ModelSerializer):
    photo_url = serializers.SerializerMethodField()
    class Meta:
        model = Species
        fields = ['id', 'name', 'scientific_name', 'status','habitat','last_sighted','location', 'photo', 'photo_url']

    def get_photo_url(self, obj):
        request = self.context.get('request')
        photo_url = obj.photo.url if obj.photo else None
        if photo_url and request is not None:
            return request.build_absolute_uri(photo_url)
        return photo_url

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
