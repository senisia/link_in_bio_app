def extract_user_data(row):
    column_names = row.keys()
    user_data = dict(zip(column_names, row))
    user_data['spotify_link'] = user_data['(spotify_link, discord_link, steam_link, color_scheme, user_id, username)'][0]
    user_data['discord_link'] = user_data['(spotify_link, discord_link, steam_link, color_scheme, user_id, username)'][1]
    user_data['steam_link'] = user_data['(spotify_link, discord_link, steam_link, color_scheme, user_id, username)'][2]
    user_data['color_scheme'] = user_data['(spotify_link, discord_link, steam_link, color_scheme, user_id, username)'][3]
    user_data['user_id'] = user_data['(spotify_link, discord_link, steam_link, color_scheme, user_id, username)'][4]
    user_data['username'] = user_data['(spotify_link, discord_link, steam_link, color_scheme, user_id, username)'][5]
    del user_data['(spotify_link, discord_link, steam_link, color_scheme, user_id, username)']
    return user_data