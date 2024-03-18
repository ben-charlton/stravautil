import json
from flask import Flask, jsonify, request, redirect, render_template, session, url_for
import os
from dotenv import load_dotenv
from functools import wraps
import jwt
from flask_session import Session

from controllers.auth_controller import get_access_token


'''--------------------------------------
APP DEFINITION
'''
def create_app():
    app = Flask(__name__)  
    app.config.from_object('config')  
    app.secret_key=os.environ['SECRET_KEY']
    load_dotenv()
    Session(app)
    return app

app = create_app()  

if __name__ == '__main__':  
    app.run(host='127.0.0.1', port=5000, debug=True)
    
    
''' --------------------------------------
ROUTES
'''
@app.route("/get_athlete_summary", methods=['GET'])
def get_athlete_summary():
    print("HERE")
    print(session.get('access-token'))
    return render_template('activities.html')

@app.route("/exchange_token")
def exchange_token():
    token = get_access_token()
    session['access-token'] = token
    return redirect(url_for('get_athlete_summary')) #render_template('activities.html')

@app.route("/login")
def index():
    return render_template('login.html', OAUTH_AUTHORIZE=os.environ['OAUTH_AUTHORIZE'])

@app.route('/logout')
def logout():
   # remove the username from the session if it is there
   session.pop('access-token', None)
   return redirect(url_for('index'))


''' --------------------------------------
APIs
'''
@app.route("/api/v1/activities/analysis", methods=['GET'])
def hello_world():
    return "Hello, World!"

