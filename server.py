from jinja2 import StrictUndefined
from flask import Flask, render_template, jsonify, send_from_directory, make_response, request,session,flash,redirect
# from flask_debugtoolbar import DebugToolbarExtension
# from model import connect_to_db, Movie, Location, User, Savedlocation, Savedmovies, Addedlocation
# import crud
import os
# from model import connect_to_db, db, Bear

app = Flask(__name__)
app.config["SECRET_KEY"] = 'vu4wu06wu06'
# app.jinja_env.undefined = StrictUndefined

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    """Show homepage."""

    return render_template("index.html")


if __name__ == "__main__":
    # app.debug = False
    # connect_to_db(app)
    # DebugToolbarExtension(app)

    app.run()
