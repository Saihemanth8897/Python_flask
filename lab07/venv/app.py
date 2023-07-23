import secrets
from flask import Flask, render_template, request, redirect, url_for, flash
from flask_sqlalchemy import SQLAlchemy
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import DataRequired, Email, EqualTo

app = Flask(__name__)
app.config['SECRET_KEY'] = secrets.token_hex(16)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'


@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        first_name = request.form['first_name']
        last_name = request.form['last_name']
        email = request.form['email']
        password = request.form['password']
        confirm_password = request.form['confirm_password']

        if password != confirm_password or len(password) < 8:
            return "Password does not meet the criteria or passwords do not match."

        with app.app_context():
            user = User.query.filter_by(email=email).first()
            if user:
                return "<h1>Email address already exists. Please use a different email.</h1>"

            new_user = User(first_name=first_name,
                            last_name=last_name, email=email, password=password)
            db.session.add(new_user)
            db.session.commit()

        return render_template('thankyou.html')

    return render_template('signup.html')


@app.route('/', methods=['GET', 'POST'])
def signin():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']

        user = User.query.filter_by(email=email).first()

        if user and user.password == password:
            return redirect(url_for('secretpage'))
        else:
            return 'Invalid email or password. Please try again.'

    return render_template('signin.html')


@app.route('/secretpage')
def secretpage():
    return render_template('secretPage.html')


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
