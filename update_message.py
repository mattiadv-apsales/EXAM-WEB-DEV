import json

def update_read_or_not(id, value):
    all_messages = []
    new_message = []

    try:
        with open("messages.json", "r") as file:
            all_messages = json.load(file)

        for mex in all_messages:
            if mex["id"] == id:
                mex["read"] = value
                new_message.append(mex)
            else:
                new_message.append(mex)
        
        with open("messages.json", "w") as file:
            json.dump(new_message, file, indent=4)

        return True
    except:
        return False