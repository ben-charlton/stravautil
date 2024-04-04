
import json
from flask import jsonify
import pandas as pd 
import numpy as np
from datetime import datetime, timedelta
from services.activity_service import *
from services.strava_service import send_strava_request

def _get_zones(token): 
    
    strava_zones = send_strava_request(token, "athlete/zones")['heart_rate']['zones']
    return {
        "Zone 1": strava_zones[0],
        "Zone 2": strava_zones[1],
        "Zone 3": strava_zones[2],
        "Zone 4": strava_zones[3],
        "Zone 5": strava_zones[4]
    }
    

def get_heart_rate_summary(token, days):
    
    hr_zones = _get_zones(token)
    summary_data = {zone: 0 for zone in hr_zones}
    activity_ids = get_activity_ids_from_period(token, days)

    for id in activity_ids:
        activity = get_activity_by_id(token, id)
        if 'splits_metric' in activity:
            for split in activity['splits_metric']:
                if 'average_heartrate' in split:
                    avg_hr = split['average_heartrate']
                    for zone, limits in hr_zones.items():
                        if limits["min"] <= avg_hr <= limits["max"]:
                            summary_data[zone] += split['elapsed_time']
                            break

    for zone, value in summary_data.items():
        summary_data[zone] =round(value / 60)
        
    return summary_data
    
    