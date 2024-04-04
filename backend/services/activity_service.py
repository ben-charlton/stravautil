
import pandas as pd 
import numpy as np
from datetime import datetime, timedelta
from services.strava_service import send_strava_request

def get_activity_ids_from_period(token, period=None):
    id_list = []
    d = (datetime.today() - timedelta(days=period)).timestamp()
    activity_list = send_strava_request(token, "activities?after=" + str(d))
    for obj in activity_list:
        id_list.append(obj['id'])
    return id_list

def get_activity_by_id(token, id=None):
    return send_strava_request(token, f"activities/" + str(id))

def get_activities(token):
    return send_strava_request(token, f"athlete/activities")
    
