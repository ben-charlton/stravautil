from flask import jsonify, request, session
import os
import requests
from dotenv import load_dotenv
from functools import wraps
import jwt

load_dotenv()

def get_access_token():
    if "activity:read" in request.values["scope"]:
        code = request.values["code"]
        access_token=_get_access_token_helper(code)
        return access_token
    else: 
        return ""


def _get_access_token_helper(code=None):
    # these params needs to be passed to get access
    # token used for retrieveing actual data
    payload:dict = {
    'client_id': os.environ['CLIENT_ID'],
    'client_secret': os.environ['CLIENT_SECRET'],
    'code': code,
    'grant_type': "authorization_code",
    'f': 'json'
    }
    res = requests.post(os.environ['OAUTH_TOKEN'], data=payload, verify=False)
    access_token = res.json()['access_token']
    return access_token