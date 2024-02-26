import json
from flask import Flask, jsonify, request, redirect, render_template, session
from urllib.parse import urlparse, parse_qs
import os
import requests
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)

@app.route("/api/v1/activities/analysis")
def hello_world():
    return "Hello, World!"

@app.route("/homepage")
def index():
    return render_template('home.html', OAUTH_AUTHORIZE=os.environ['OAUTH_AUTHORIZE'])

@app.route("/exchange_token")
def show_access_token():
    if "activity:read" in request.values["scope"]:
        code = request.values["code"]
        access_token=get_access_token(code)
        return access_activity_data(access_token)
    else: 
        return "please allow me to read your data"
    
@app.route("/target")
def target():
    token = session['token']
    return token


def access_activity_data(access_token:str, params:dict=None):
    headers:dict = {'Authorization': f'Authorization: Bearer {access_token}'}
    if not params:
        response:dict = requests.get(os.environ.get('ACTIVITIES'), headers=headers)
    response:dict = requests.get(os.environ.get('ACTIVITIES'), headers=headers, params=params)
    activity_data = response.json()
    return activity_data


def get_access_token(code=None):
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
    