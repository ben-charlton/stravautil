from services.activity_service import *
from datetime import datetime

def get_distance_summary(token, days):
    
    summary_data = {}
    activities = get_activities_after(token, days)

    for activity in activities:
        strava_date = datetime.strptime(activity['start_date'], '%Y-%m-%dT%H:%M:%SZ')
        formatted_date_string = strava_date.strftime('%d-%m-%Y')
        summary_data[formatted_date_string] = activity['distance'] if 'distance' in activity else None
            
    return summary_data
    