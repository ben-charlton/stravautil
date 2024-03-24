from flask import Blueprint, session, redirect, request
from services.auth_service import login, logout, authorized
import os

auth_bp = Blueprint('auth', __name__)

# Strava OAuth routes
@auth_bp.route('/login')
def strava_login():
    return login()

@auth_bp.route('/logout')
def strava_logout():
    return logout()

@auth_bp.route('/callback')
def strava_authorized():
    return authorized()

'''
@auth_bp.route("/exchange_token")
def exchange_token():
    token = get_access_token()

    # Store the access token in Redis with a unique key and set expiration time
    redis_client.setex('access_token', TOKEN_EXPIRATION_TIME, token)
    return redirect(url_for('get_athlete_summary')) #render_template('activities.html')

@auth_bp.route("/login")
def index():
    return render_template('login.html', OAUTH_AUTHORIZE=os.environ['OAUTH_AUTHORIZE'])

@auth_bp.route('/logout')
def logout():
   # remove the username from the session if it is there
   session.pop('access-token', None)
   return redirect(url_for('index'))
'''