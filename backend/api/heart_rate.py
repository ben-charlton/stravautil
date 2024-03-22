from flask import Blueprint, jsonify
from services.heart_rate_service import *

heart_rate_bp = Blueprint('heart_rate', __name__)

@heart_rate_bp.route('/heart-rate-summary', methods=['GET'])
def heart_rate_summary():
    #summary = get_heart_rate_summary()
    #return jsonify(summary)
    return jsonify({"x": 30})