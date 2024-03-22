from flask import jsonify, request, session, redirect
from flask_oauthlib.client import OAuth
import os

# Strava OAuth configuration
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
    return strava.authorize(callback='http://localhost:5000/auth/authorized')

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
    return redirect('/dashboard')


    
    
    '''
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
    
    '''