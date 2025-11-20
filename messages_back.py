import json

messages = []

def return_messages():
    with open("messages.json", "r") as file:
        result = json.load(file)

    messages = result
    return messages