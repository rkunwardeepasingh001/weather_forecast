from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from datetime import timedelta
from .models import WeatherData
from django.conf import settings
from django.utils import timezone
from unittest.mock import patch

class WeatherForecastAPITest(APITestCase):
    def setUp(self):
        # Set up common data for tests
        self.latitude = 33.441792
        self.longitude = -94.037689
        self.detailing_type = "current"

    def test_valid_request(self):
        # Test for a valid request with all parameters provided
        url = reverse('weather_forecast')
        data = {
            'latitude': self.latitude,
            'longitude': self.longitude,
            'detailing_type': self.detailing_type
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_invalid_request_missing_parameters(self):
        # Test for an invalid request with missing parameters
        url = reverse('weather_forecast')
        data = {}  # Missing parameters
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_invalid_request_invalid_coordinates(self):
        # Test for an invalid request with invalid coordinates
        url = reverse('weather_forecast')
        data = {
            'latitude': 'invalid',
            'longitude': 'invalid',
            'detailing_type': self.detailing_type
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_expired_data(self):
        # Test for retrieving data from the database when data is expired
        expired_data = WeatherData.objects.create(
            latitude=self.latitude,
            longitude=self.longitude,
            detailing_type=self.detailing_type,
            data={},
            last_updated=timezone.now() - timedelta(minutes=settings.DATA_EXPIRY_MINUTES + 1)
        )
        url = reverse('weather_forecast')
        data = {
            'latitude': self.latitude,
            'longitude': self.longitude,
            'detailing_type': self.detailing_type
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_failed_api_request(self):
        # Test for handling a failed API request
        with patch('forecast.utils.api.fetch_weather_data') as mocked_fetch_weather_data:
            mocked_fetch_weather_data.return_value = None
            url = reverse('weather_forecast')
            data = {
                'latitude': self.latitude,
                'longitude': self.longitude,
                'detailing_type': self.detailing_type
            }
            response = self.client.post(url, data)
            self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
