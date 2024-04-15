from flask import Blueprint, jsonify, request
from utils.redis import get_redis_client
from services.distance_service import *

distance_bp = Blueprint('distance', __name__)

redis_client = get_redis_client()

@distance_bp.route('/distance-summary', methods=['GET'])
def distance_summary():
    
    days = request.args.get('days', default=7, type=int)
    token = request.headers.get('Authorization')
    summary_data = get_distance_summary(token, days)

    return jsonify(summary_data)