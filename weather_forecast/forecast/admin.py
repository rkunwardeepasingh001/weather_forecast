from django.contrib import admin
from .models import WeatherData

class WeatherDataAdmin(admin.ModelAdmin):
    # Define the fields to display in the admin interface
    list_display = ('latitude', 'longitude', 'detailing_type', 'last_updated')

    # Define the fields that can be edited in the admin interface
    fields = ('latitude', 'longitude', 'detailing_type', 'data')

    # Optionally, exclude the 'last_updated' field from the form
    exclude = ('last_updated',)

admin.site.register(WeatherData, WeatherDataAdmin)
