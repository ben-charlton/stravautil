from flask import Blueprint, jsonify, request
from services.heart_rate_service import *

heart_rate_bp = Blueprint('heart_rate', __name__)

@heart_rate_bp.route('/heart-rate-summary', methods=['GET'])
def heart_rate_summary():
    
    days = request.args.get('days', default=7, type=int)
    token = request.headers.get('Authorization')
    summary_data = get_heart_rate_summary(token, days)
    
    return jsonify(summary_data)