import json

def last_id():
    users = []
    l_id = 0
    try:
        with open("messages.json", "r") as file:
            users = json.load(file)

        for user in users:
            l_id = user['id']
    except:
        l_id = 0

    return l_id

def save_message(name, surname, email, message):
    id = last_id()
    id += 1
    try:
        new = {
            "id": id,
            "nome": name,
            "cognome": surname,
            "email": email,
            "messaggio": message
        }

        all_message = []

        with open("messages.json", "r") as file:
            all_message = json.load(file)

        all_message.append(new)

        with open("messages.json", "w") as file:
            json.dump(all_message, file, indent=4)

        return True
    except:
        return False
    
save_message("m", 'm', 'm', 'm')