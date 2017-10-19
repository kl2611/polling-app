from flask import Flask, request, flash, render_template, redirect, url_for, jsonify, json, send_file
from flask_migrate import Migrate
from flask_restful import Resource, reqparse, abort, Api
from flask_cors import CORS
from models import db, Polls, Questions, Options

app = Flask(__name__)
api = Api(app)
CORS(app)

# load config from the config file we created earlier
app.config.from_object('config')

# initialize and create database
db.init_app(app)
db.create_all(app=app)

migrate = Migrate(app, db, render_as_batch=True)

@app.route('/')
def home():
    return send_file('frontend/src/index.html')

if __name__ == '__main__':
    app.run()

@app.route('/api/polls', methods=['GET', 'POST'])
# retrieves/adds polls from/to the database
def api_polls():
  if request.method == 'POST':
    # get the poll and save it in the database
    poll = request.get_json()

    return "The title of the poll is {} and the options are {} and {}".format(poll['title'], *poll['options'])

  else:
    # GET request: return dict representation of our API
    polls = Questions.query.join(Polls).all()
    all_polls = [poll.to_json() for poll in polls]

    return jsonify(all_polls)

@app.route('/api/polls/<int:poll_id>', methods=['GET', 'DELETE'])
# retrieves one poll based on id
def api_poll(poll_id):
  if request.method == 'GET':
    poll = Questions.query.get(poll_id).to_json()
    return jsonify(poll)
  elif request.method == 'DELETE':
      poll = db.session.query(Questions).filter_by(id=poll_id)
      if poll:
        poll.delete()
        db.session.commit()
        db.session.remove()
        return jsonify({'message': 'Sucessfully deleted'})
      else:
        return jsonify({'message': 'Poll ID does not exist or has already been deleted'})

@app.route('/api/polls/options')
def api_polls_options():
  all_options = [option.to_json() for option in Options.query.all()]

  return jsonify(all_options)

@app.route('/api/polls/vote', methods=['PATCH'])
def api_poll_vote():

  poll = request.get_json()['data']

  poll_title, option = (poll['poll_title'], poll['option'])

  join_tables = Polls.query.join(Questions).join(Options)

  # filter options
  option = join_tables.filter(Questions.title.like(poll_title)).filter(Options.name.like(option)).first()

  # increment vote_count by 1 if the option was found
  if option:
      option.vote_count += 1
      db.session.commit()
      db.session.remove()

      return jsonify({'message': 'Thanks for voting'})

  return jsonify({'message': 'Option or poll was not found. Please try again'})