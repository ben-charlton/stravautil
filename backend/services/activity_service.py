
from flask import session
import pandas as pd 
import numpy as np
import requests
from datetime import datetime, timedelta
    
import time    
'''
def _get_activity_ids_from_period(period=None):
    id_list = []
    d = (datetime.today() - timedelta(days=period)).timestamp()
    activity_list = _send_strava_request("activities?after=" + str(d))
    for obj in activity_list:
        id_list.append(obj['id'])
    return id_list



def _get_zones(data=None):
    data = pd.json_normalize(data, record_path=['splits_metric'], meta=['id', 'sport_type', 'start_date'])
    data = _append_zones_to_splits(data)
    return data
    
    
def _append_zones_to_splits(data=None):
    zone_data = _send_strava_request("athlete/zones")
    criteria = []
    for i in range(5):
        if i != 4: 
            criteria.append(data['average_heartrate'].between(zone_data['heart_rate']['zones'][i]['min'], 220))
        else: 
            criteria.append(data['average_heartrate'].between(zone_data['heart_rate']['zones'][i]['min'], zone_data['heart_rate']['zones'][i]['max']))

    values = [1, 2, 3, 4, 5]
    data['zones'] = np.select(criteria, values, 0)
    return data

for id in _get_activity_ids_from_period(7):
    activity_data = _send_strava_request("activities/" + str(id))
    zone_appended_data = _get_zones(activity_data)
    zone_appended_data.to_csv("new.csv", encoding='utf-8', mode='a', header=False)


# NEED A FUNCTION TO SUM THE TIMES SPENT IN ZONES FOR EACH ACTIVITY
# THEN APPEND ALL TO A SINGLE CSV


def get_activities(access_token):
    # Set up request headers
    headers = {"Authorization": f"Bearer {access_token}"}
    
    # Calculate start and end dates for the week
    end_date = datetime.date.today()
    start_date = end_date - datetime.timedelta(days=7)
    
    # Convert dates to Unix timestamps
    start_date_unix = int(start_date.strftime("%s"))
    end_date_unix = int(end_date.strftime("%s"))
    
    # Make API request to get activities for the week
    url = f"https://www.strava.com/api/v3/athlete/activities?after={start_date_unix}&before={end_date_unix}"
    response = requests.get(url, headers=headers)
    
    # Check if request was successful
    if response.status_code == 200:
        activities = response.json()
        return activities
    else:
        print("Error fetching activities:", response.status_code)
        return None

def visualize_hr_zone_summary(activities):
    hr_zones = {
        "Zone 1": {"min": 0, "max": 100},
        "Zone 2": {"min": 101, "max": 120},
        "Zone 3": {"min": 121, "max": 140},
        "Zone 4": {"min": 141, "max": 160},
        "Zone 5": {"min": 161, "max": 180}
    }
    
    # Initialize counters for each heart rate zone
    zone_counts = {zone: 0 for zone in hr_zones.keys()}
    
    # Calculate total time spent in each heart rate zone
    for activity in activities:
        if 'splits_metric' in activity:
            for split in activity['splits_metric']:
                avg_hr = split['average_heartrate']
                for zone, limits in hr_zones.items():
                    if limits["min"] <= avg_hr <= limits["max"]:
                        zone_counts[zone] += split['elapsed_time']
                        break
    
    # Plotting
    plt.figure(figsize=(10, 6))
    plt.bar(zone_counts.keys(), [zone_counts[zone] / 3600 for zone in zone_counts.keys()], color='skyblue')
    plt.title('Heart Rate Zone Summary for the Week')
    plt.xlabel('Heart Rate Zone')
    plt.ylabel('Hours')
    plt.show()

# Example usage
access_token = "YOUR_STRAVA_ACCESS_TOKEN"
activities = get_activities(access_token)
if activities:
    visualize_hr_zone_summary(activities)


GET https://www.strava.com/api/v3/activities/10850323761
    "name": "Morning Run",
    "distance": 7471.4,
    "moving_time": 2325,
    "elapsed_time": 2361,
    "total_elevation_gain": 19.0,
    "type": "Run",
    "id": 10850323761,
    "start_date": "2024-02-27T19:48:32Z",
    "splits_metric": [
        {
            "distance": 1001.9,
            "elapsed_time": 324,
            "elevation_difference": -5.4,
            "moving_time": 324,
            "split": 1,
            "average_speed": 3.09,
            "average_grade_adjusted_speed": 3.07,
            "average_heartrate": 129.71651090342678,
            "pace_zone": 0
        },
    ],
    "similar_activities": {
        "effort_count": 6,
        "average_speed": 3.044634639066626,
        "min_average_speed": 2.8960770211272853,
        "mid_average_speed": 3.0465470367795957,
        "max_average_speed": 3.213509744623656,
        "pr_rank": 1,
        "frequency_milestone": null,
        "trend": {
            "speeds": [
                2.9280747519469776,
                3.0093681923191675,
                3.009713941710584,
                3.0463508026778765,
                3.1092481040491844
            ],
            "current_activity_index": 4,
            "min_speed": 2.8960770211272853,
            "mid_speed": 3.0465470367795957,
            "max_speed": 3.213509744623656,
            "direction": 1
        }
    }
'''
