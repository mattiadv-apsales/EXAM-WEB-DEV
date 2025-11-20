import json

def visual_page():
    with open("page_visual.json", "r") as file:
        old_visual = json.load(file)

    sum = old_visual["visual"] + 1

    new = {
        "visual": sum
    }

    with open("page_visual.json", "w") as file:
        json.dump(new, file, indent=4)

def return_visual_page():
    old_visual = 0

    with open("page_visual.json", "r") as file:
        old_visual = json.load(file)

    return old_visual['visual']