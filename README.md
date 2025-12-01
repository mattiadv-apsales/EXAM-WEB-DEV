How you can run this website:

First of all, you need to clone this repo with this command:

- git clone https://github.com/mattiadv-apsales/EXAM-WEB-DEV

Second, the server is in Python, so you need to install Python.
After installing Python, you need to install the dependencies in requirements.txt
with this command:

- pip install -r requirements.txt
or
- pip3 install -r requirements.txt

After you install all the libraries, you need to start the server.
To start the server, use this command in the main directory:

- python server.py

The server will run on http://127.0.0.1:80 and http://192.168.1.2:80

What you will see:

The "/" is the main page, the personal portfolio.
At the end of the page, there is a form. If you compile the form
while the server is running, it will work correctly.
To see the submitted form and the page view, you need
to go to "/admin" and access with the password: "WebDevExam25!"
You can try to access "/admin-panel" without inserting the password,
but you will be redirected to the password section.
After you enter the password, a 24-hour session will be created, so
you can easily access "/admin-panel" directly.