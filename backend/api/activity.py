from flask import Blueprint, session, redirect, request
from services.activity_service import *

activity_bp = Blueprint('activity', __name__)


@activity_bp.route("/api/v1/activities/analysis", methods=['GET'])
def hello_world():
    return "Hello, World!"