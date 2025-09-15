from django.urls import path
from .views import get_calendars, create_appointment, get_appointment_by_id

urlpatterns = [
    path("ghl/calendars/", get_calendars, name="get_calendars"),
    path("ghl/appointments/create/", create_appointment, name="create_appointment"),
    path("ghl/appointments/<str:appointment_id>/", get_appointment_by_id, name="get_appointment_by_id"),
    
]
