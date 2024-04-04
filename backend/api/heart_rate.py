from flask import Blueprint, jsonify, request
from services.heart_rate_service import *
from utils.redis import get_redis_client


heart_rate_bp = Blueprint('heart_rate', __name__)

redis_client = get_redis_client()

@heart_rate_bp.route('/heart-rate-summary', methods=['GET'])
def heart_rate_summary():
    days = request.args.get('days', default=7, type=int)
    token = request.headers.get('Authorization')
    
   # cached_response = redis_client.get('heart_rate_summary?days=' + str(days) + '_' + token)
   # if cached_response:
   #     print('cached!')
   #     return jsonify(json.loads(cached_response))
    
    #print('not cached :(')
    summary_data = get_heart_rate_summary(token, days)

    #print('caching though!')
    #redis_client.set('heart_rate_summary?days=' + str(days) + '_' + token, json.dumps(summary_data))
    
    return jsonify(summary_data)