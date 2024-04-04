import json
from flask import jsonify
import requests
from utils.redis import get_redis_client

redis_client = get_redis_client()

def send_strava_request(token=None, path=None):
    if not token:
        raise ValueError('Access token is missing or invalid')
    try:
        cached_response = redis_client.get(path + '_' + token)
        if cached_response:
            print('cached!')
            return (json.loads(cached_response))
        else: 
            headers = {"Authorization": token}
            url = "https://www.strava.com/api/v3/" + path
            response = requests.get(url, headers=headers)
            redis_client.set(path + '_' + token, json.dumps(response.json()))
            if response.status_code != 200:
                raise Exception('Failed to retrieve activities from Strava API')
            return response.json()
    except Exception as e:
        raise Exception(f'{e}: ' + json.dumps(response.json()))

    