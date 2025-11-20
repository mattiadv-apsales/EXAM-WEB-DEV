from dotenv import load_dotenv
import os

load_dotenv()
correct_password = os.getenv("PASSWORD")

def password_check(password):
    return True if password == correct_password else False