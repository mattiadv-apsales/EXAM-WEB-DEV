import json

def return_all_email():
    all_email = []
    all_messages = []

    with open("messages.json", "r") as file:
        all_messages = json.load(file)

    all_email = [user["email"] for user in all_messages]
    
    for i, email in enumerate(all_email):
        if all_email.count(email) > 1:
            all_email.pop(i)

    return all_email

return_all_email()