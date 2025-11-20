import json

def delete_messages(id):
    try:
        first_match = -1    
        all_messages = []
        with open("messages.json", "r") as file:
            lines = json.load(file)

        all_messages = lines

        for user in all_messages:
            if user["id"] == int(id):
                first_match = id
                break
        
        if first_match != -1:
            new_messages = [elements for elements in all_messages if str(elements['id']) != str(first_match)]
            
            with open("messages.json", "w") as file:
                json.dump(new_messages, file, indent=4)

            return True
        else:
            return False
    except:
        return False