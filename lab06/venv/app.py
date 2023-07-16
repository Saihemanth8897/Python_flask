from flask import Flask, render_template, request, redirect, session
import sqlite3

app = Flask(__name__)
app.secret_key = 'your_secret_key'


def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn


def create_tables():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT
        )
    ''')
    conn.commit()
    conn.close()


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/report', methods=['POST'])
def report():

    username = request.form.get('username')
    password = request.form.get('password')
    message, isSuccess, isValid = check_password_format(password)
    if isValid:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM users WHERE username = ?', (username,))
        user = cursor.fetchone()
        if user:
            message = '<p clas="text-center text-danger" style="color: red;">Username already exists. Please choose a different username.</p>'
            return render_template('report.html', username=username, password=password, valid=message, success=isSuccess, isUserExists=user)

        cursor.execute(
            'INSERT INTO users (username, password) VALUES (?, ?)', (username, password))
        conn.commit()
        conn.close()

        return render_template('report.html', username=username, password=password, valid=message, success=isSuccess, isUserExists=None)
    else:
        return render_template('report.html', username=username, password=password, valid=message, success=isSuccess, isUserExists=isValid)


def check_password_format(password, isSuccess=''):
    isValid = False
    message = ""
    if len(password) < 8:
        message += "<p  class='text-danger text-center'>Password must have least 8 characters.</p>"
    if not any(char.islower() for char in password):
        message += "<p class='text-center text-danger'>Password Must have a lowercase letter.</p>"
    if not any(char.isupper() for char in password):
        message += "<p class='text-center text-danger'>Password Must have an uppercase letter.</p>"
    if not password[-1].isdigit():
        message += "<p class='text-center text-danger'>Password Must have a number at the end.</p>"
    if message == '':
        isValid = True
        isSuccess = '<canvas class="confetti" id="canvas"></canvas>'
        message = '<p class="text-center text-success">Hey Password passed all the 4 requirements !</p>  '
    return message, isSuccess, isValid


if __name__ == '__main__':
    app.run(debug=True)
