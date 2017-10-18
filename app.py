from flask import Flask, request, flash, render_template, redirect, url_for, jsonify
from flask_migrate import Migrate
from models import db, Polls, Questions

app = Flask(__name__)

# load config from the config file we created earlier
app.config.from_object('config')

# initialize and create the database
db.init_app(app)
db.create_all(app=app)

migrate = Migrate(app, db, render_as_batch=True)

@app.route('/')
def home():
    return render_template('index.html')

if __name__ == '__main__':
    app.run()

@app.route('/polls', methods=['GET'])
def polls():
  return render_template('polls.html')

@app.route('/api/polls', methods=['GET', 'POST'])
# retrieves/adds polls from/to the database
def api_polls():
  if request.method == 'POST':
    # get the poll and save it in the database
    poll = request.get_json()

    return "The title of the poll is {} and the options are {} and {}".format(poll['title'], *poll['options'])

  else:
    # return dict representation of our API
    polls = Questions.query.join(Polls).all()
    all_polls = [poll.to_json() for poll in polls]

    return jsonify(all_polls)

@app.route('/api/polls/options')
def api_polls_options():
  all_options = [option.to_json() for option in Options.query.all()]

  return jsonify(all_options)

@app.route('/api/poll/vote', methods=['PATCH'])
def api_poll_vote():

  poll = request.get_json()

  poll_title, option = (poll['poll_title'], poll['option'])

  join_tables = Polls.query.join(Topics).join(Options)
  # filter options
  option = join_tables.filter(Questions.title.like(poll_title)).filter(Options.name.like(option)).first()

  # increment vote_count by 1 if the option was found
  if option:
      option.vote_count += 1
      db.session.commit()

      return jsonify({'message': 'Thank you for voting'})

  return jsonify({'message': 'option or poll was not found please try again'})