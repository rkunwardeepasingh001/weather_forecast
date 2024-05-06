from django.db import models

class WeatherData(models.Model):
    # Latitude of the location for which weather data is recorded
    latitude = models.FloatField()

    # Longitude of the location for which weather data is recorded
    longitude = models.FloatField()

    # Type of detailing for the weather data (e.g., current, hourly, daily)
    detailing_type = models.CharField(max_length=20)

    # JSON field to store the weather data
    data = models.JSONField()

    # Date and time when the weather data was last updated
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        # String representation of the WeatherData object
        return f"Weather data{self.latitude}-{self.longitude}-{self.detailing_type}"


    
