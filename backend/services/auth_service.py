from flask import jsonify, request, session, redirect
from flask_oauthlib.client import OAuth
import os

oauth = OAuth()

strava = oauth.remote_app(
    'strava',
    consumer_key=os.environ.get('CLIENT_ID'),
    consumer_secret=os.environ.get('CLIENT_SECRET'),
    request_token_params={'scope': 'read,activity:read_all'},
    base_url=os.environ.get('BASE_URL'),
    request_token_url=None,
    access_token_method='POST',
    access_token_url='https://www.strava.com/oauth/token',
    authorize_url='https://www.strava.com/oauth/authorize'
)

# Store access token in session
def _store_access_token(resp):
    session['strava_token'] = (resp['access_token'], '')

# Retrieve access token from session
def _get_access_token():
    return session.get('strava_token')

# Check if user is authenticated
def _is_authenticated():
    return 'strava_token' in session

# Handle authentication logic
def login():
    return strava.authorize(callback='http://localhost:5000/auth/callback')

def logout():
    session.pop('strava_token', None)
    return redirect('/')

def authorized():
    resp = strava.authorized_response()
    if resp is None or resp.get('access_token') is None:
        # Handle authentication failure
        return 'Access denied: reason={}, error={}'.format(
            request.args['error_reason'],
            request.args['error_description']
        )
    _store_access_token(resp)
    angular_frontend_url = 'http://localhost:4200/dashboard'  # Update with your Angular frontend's base URL
    return redirect(angular_frontend_url)