
'''
@app.route("/get_athlete_summary", methods=['GET'])
def get_athlete_summary():
    print("HERE")
    print(session.get('access-token'))
    access_token = redis_client.get('access_token')
    return render_template('activities.html')
'''