from dotenv import load_dotenv
from flask import Flask
import redis
from api.cadence import cadence_bp
from api.heart_rate import heart_rate_bp
from api.distance import distance_bp
import os
from flask_cors import CORS


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

redis_client = redis.Redis(host='localhost', port=6379, db=0)

app.config.from_object('config')  
app.secret_key=os.environ['SECRET_KEY']
load_dotenv()
app.register_blueprint(heart_rate_bp, url_prefix='/heart')
app.register_blueprint(cadence_bp, url_prefix='/cadence')
app.register_blueprint(distance_bp, url_prefix='/distance')

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)

    