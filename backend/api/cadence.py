import json
from flask import Blueprint, jsonify, request
from utils.redis import get_redis_client
from services.cadence_service import *

cadence_bp = Blueprint('cadence', __name__)

redis_client = get_redis_client()

@cadence_bp.route('/cadence-summary', methods=['GET'])
def cadence_summary():
    
    days = request.args.get('days', default=7, type=int)
    token = request.headers.get('Authorization')
    summary_data = get_cadence_summary(token, days)

    return jsonify(summary_data)