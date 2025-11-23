from flask import Flask, request, jsonify, json, send_file, render_template, session
from verify_password import password_check
from messages_back import return_messages
from send_message import save_message
from page_visual import visual_page, return_visual_page
from delete_message import delete_messages
from recupera_email import return_all_email
from dotenv import load_dotenv
import os
from datetime import timedelta

load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv('KEY')
app.permanent_session_lifetime = timedelta(days=1)

@app.get("/")
def index():
    visual_page()
    return render_template('index.html')

@app.get("/admin")
def admin_pass():
    return render_template("admin_check.html")

@app.get("/admin-pannel")
def admin():
    if session.get("active") == "active":
        mes = return_messages()
        vis = return_visual_page()
        return render_template("admin.html", messages=mes, name="Mattia", visual=vis)
    else:
        return render_template("admin_check.html")

@app.get("/.env")
def rick():
    return render_template('rick_roll.html')

@app.get("/env")
def roll():
    return render_template('rick_roll.html')

@app.post("/update_messages")
def update_message():
    mes = return_messages()
    return {"messages": mes}

@app.post("/delete_message")
def delete_mes():
    data = request.json
    id = data["id"]
    print(id)
    response = delete_messages(id)
    print(response)
    return jsonify({"status": response})

@app.post("/update_visual")
def update_visual():
    visuals = return_visual_page()
    return jsonify({"visual": visuals})

@app.post("/send_form")
def send_f():
    data = request.json
    name = data["name"]
    surname = data["surname"]
    email = data["email"]
    message = data["message"]
    resp = save_message(name, surname, email, message)
    if resp == True:
        return jsonify({"success": True})
    else:
        return jsonify({"success": False})

@app.post("/pasw")
def verify():
    data = request.json
    pas = data["password"]
    result = password_check(pas)
    if result == True:
        session.permanent = True
        session['active'] = "active"
    else:
        session['active'] = "non-active"
    return jsonify({"pasw": result})

@app.get("/all_email")
def return_email():
    email = return_all_email()
    return jsonify({"email": email})

if __name__ == "__main__":
    app.run(debug=True)