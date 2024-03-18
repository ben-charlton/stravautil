import pandas as pd 
import matplotlib.pyplot as plt
import numpy as np
import seaborn as sns
from datetime import datetime as dt







'''
GET https://www.strava.com/api/v3/athlete/zones
{
    "heart_rate": {
        "custom_zones": false,
        "zones": [
            {
                "min": 0,
                "max": 123
            },
            {
                "min": 123,
                "max": 153
            },
            {
                "min": 153,
                "max": 169
            },
            {
                "min": 169,
                "max": 184
            },
            {
                "min": 184,
                "max": -1
            }
        ]
    }
}
'''

