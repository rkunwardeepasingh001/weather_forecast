import requests
from django.conf import settings

def fetch_weather_data(latitude, longitude, detailing_type):
    api_key = settings.OPENWEATHERMAP_API_KEY
    base_url = f"https://api.openweathermap.org/data/2.5/weather?lat={latitude}&lon={longitude}&appid={api_key}"

    detailing_type_lower = detailing_type.lower() 
    if detailing_type_lower == 'current':
        url = f"{base_url}&exclude=minutely,hourly,daily"
    elif detailing_type_lower == 'minute forecast':
        url = f"{base_url}&exclude=current,hourly,daily"
    elif detailing_type_lower == 'hourly forecast':
        url = f"{base_url}&exclude=current,minutely,daily"
    elif detailing_type_lower == 'daily forecast':
        url = f"{base_url}&exclude=current,minutely,hourly"
    else:
        url = base_url  # Default to the base URL without any exclusions

    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        return None
