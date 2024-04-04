import json
import requests


# Get user activities from Strava API
def send_strava_request(token=None, path=None):
    if not token:
        raise ValueError('Access token is missing or invalid')
    try:
        headers = {"Authorization": token}
        url = "https://www.strava.com/api/v3/" + path
        response = requests.get(url, headers=headers)
        if response.status_code != 200:
            raise Exception('Failed to retrieve activities from Strava API')
        return response.json()
    except Exception as e:
        raise Exception(f'{e}: ' + json.dumps(response.json()))

    