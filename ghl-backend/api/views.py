from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import requests

# 🔹 Cabeceras comunes para la API de GHL
HEADERS = {
    "Authorization": f"Bearer {settings.GHL_PRIVATE_TOKEN}",
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Version": "2021-04-15",  # 👈 versión requerida en la doc de appointments
}


# 📌 1. Listar calendarios
@api_view(["GET"])
def get_calendars(request):
    """
    Retorna la lista de calendarios para una location.
    """
    url = f"{settings.GHL_BASE_URL}/calendars/?locationId={settings.GHL_LOCATION_ID}"

    try:
        response = requests.get(url, headers=HEADERS)
        response.raise_for_status()
        return Response(response.json(), status=response.status_code)
    except requests.RequestException as e:
        return Response({"error": str(e)}, status=status.HTTP_502_BAD_GATEWAY)


# 📌 2. Crear cita
@api_view(["POST"])
def create_appointment(request):
    """
    Crea una nueva cita en GHL.
    Requiere: calendarId, contactId, startTime, endTime
    Opcional: title, appointmentStatus (confirmed/cancelled/rescheduled), assignedUserId
    """
    url = f"{settings.GHL_BASE_URL}/calendars/events/appointments"

    # Validar campos obligatorios
    required_fields = ["calendarId", "contactId", "startTime", "endTime"]
    for field in required_fields:
        if field not in request.data:
            return Response(
                {"error": f"Falta el campo requerido: {field}"},
                status=status.HTTP_400_BAD_REQUEST,
            )

    # Armar payload
    payload = {
        "title": request.data.get("title", "Cita creada desde API"),
        "calendarId": request.data["calendarId"],
        "locationId": request.data.get("locationId", settings.GHL_LOCATION_ID),
        "contactId": request.data["contactId"],
        "startTime": request.data["startTime"],
        "endTime": request.data["endTime"],

        # 🔹 Asegurar que se vea bien en GHL
        "appointmentStatus": request.data.get("appointmentStatus", "confirmed"),
        "assignedUserId": request.data.get("assignedUserId"),
        "appointmentOwnerId": request.data.get("assignedUserId"),

        # Opcionales
        "appointmentDescription": request.data.get("appointmentDescription", "Agendado vía API"),
        "ignoreFreeSlotValidation": True,
        "toNotify": request.data.get("toNotify", True),
        "meetingLocationType": request.data.get("meetingLocationType", "custom"),
        "meetingLocationId": request.data.get("meetingLocationId", "custom_0"),
        "overrideLocationConfig": True,
    }

    try:
        response = requests.post(url, headers=HEADERS, json=payload)

        # ✅ Caso exitoso (201 Created)
        if response.status_code in [200, 201]:
            return Response({
                "status_code": response.status_code,
                "response": response.json(),   # 👈 ahora va en "response"
                "payload": payload             # lo que se envió
            }, status=response.status_code)

        # ❌ Caso error
        return Response({
            "status_code": response.status_code,
            "error": response.text,
            "payload": payload
        }, status=response.status_code)

    except requests.RequestException as e:
        return Response({"error": str(e)}, status=status.HTTP_502_BAD_GATEWAY)

@api_view(["GET"])
def get_appointment_by_id(request, appointment_id):
    """
    Trae una cita específica por su eventId
    """
    url = f"{settings.GHL_BASE_URL}/calendars/events/appointments/{appointment_id}"

    try:
        response = requests.get(url, headers=HEADERS)
        response.raise_for_status()
        return Response(response.json(), status=response.status_code)
    except requests.RequestException as e:
        return Response({"error": str(e)}, status=status.HTTP_502_BAD_GATEWAY)


