import random
import string

chars = string.ascii_letters + string.punctuation

def generate_token():
    token = ''
    for i in range(30):
        char = random.choice(chars)
        token += char

    return token
