import json

id = 1

def save_message(name, surname, email, message):
    global id
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

        id += 1

        return True
    except:
        return False