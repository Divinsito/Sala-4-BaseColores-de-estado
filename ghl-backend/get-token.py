import requests
from django.http import JsonResponse

def get_token(request):
    url = "https://services.leadconnectorhq.com/oauth/token"

    payload = {
        "client_id": "68c3ccfcd0deb86c0991065e-mfgyft3z",
        "client_secret": "8c6bce49-fc8f-406c-b3c3-244f959f3dc9",
        "grant_type": "client_credentials"
    }

    headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "application/json"
    }

    response = requests.post(url, headers=headers, data=payload)

    return JsonResponse(response.json())
