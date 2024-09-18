from django.contrib.gis.db import models
from django.contrib.auth.models import User

# Model to represent species information
class Species(models.Model):
    name = models.CharField(max_length=255)
    scientific_name = models.CharField(max_length=255)
    status = models.CharField(max_length=100)  # E.g., 'Endangered', 'Vulnerable'
    habitat = models.TextField()
    photo = models.ImageField(upload_to='species_photos/')
    last_sighted = models.DateTimeField(auto_now=True)
    location = models.PointField(geography=True)  # PostGIS PointField for geographic data

    def __str__(self):
        return self.name

# Model for user profile
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    is_verified = models.BooleanField(default=False)

    def __str__(self):
        return self.user.username

# Model to represent a sighting report
class Report(models.Model):
    species = models.ForeignKey(Species, on_delete=models.CASCADE)
    submitted_by = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    photo = models.ImageField(upload_to='report_photos/', null=True, blank=True)
    video = models.FileField(upload_to='report_videos/', null=True, blank=True)
    location = models.PointField(geography=True)  # Location where the sighting occurred
    environmental_conditions = models.JSONField(default=dict)  # E.g., { "air_quality": 75, "pollution": 30 }
    verified = models.BooleanField(default=False)

    def __str__(self):
        return f'Report {self.id} by {self.submitted_by.user.username}'

# Model for environmental data
class EnvironmentalData(models.Model):
    location = models.PointField(geography=True)
    air_quality_index = models.FloatField()
    pollution_level = models.FloatField()
    human_activity = models.FloatField()

# Model for alerts
class Alert(models.Model):
    species = models.ForeignKey(Species, on_delete=models.CASCADE)
    location = models.PointField(geography=True)
    alert_type = models.CharField(max_length=100)  # E.g., 'Frequent sightings'
    date_issued = models.DateTimeField(auto_now_add=True)
