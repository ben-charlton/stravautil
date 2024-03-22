from dotenv import load_dotenv
from flask import Flask, redirect, url_for
from api.auth import auth_bp
from api.activity import activity_bp
import os

'''--------------------------------------
APP DEFINITION
'''

app = Flask(__name__)
app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(activity_bp, url_prefix='/activity')
app.config.from_object('config')  
app.secret_key=os.environ['SECRET_KEY']
load_dotenv()

# Redirect root URL to login page
@app.route('/')
def index():
    return redirect(url_for('auth.strava_login'))


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)

    