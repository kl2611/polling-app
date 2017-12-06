from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy import select, func
import uuid

# create a new SQLAlchemy object
db = SQLAlchemy()

# Base model that for other models to inherit from
class Base(db.Model):
    __abstract__ = True

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    date_created = db.Column(db.DateTime, default=db.func.current_timestamp())
    date_modified = db.Column(db.DateTime, default=db.func.current_timestamp(),
            onupdate=db.func.current_timestamp())

# Model for poll questions
class Questions(Base):
    # Columns declaration
    title = db.Column(db.String(500))
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)

    # Method to view objects in terminal
    def __repr__(self):
      return self.title

    def to_json(self):
      return {
        'title': self.title,
        'id': self.id,
        'options': [{
          'name': option.option.name, 
          'vote_count': option.vote_count}
          for option in self.options.all()],
        'total_vote_count': self.total_vote_count
      }

    @hybrid_property
    def total_vote_count(self, total=0):
      for option in self.options.all():
        total += option.vote_count
      
      return total

    @total_vote_count.expression
    def total_vote_count(cls):
        return select([func.sum(Polls.vote_count)]).where(Polls.topic_id == cls.id)

# Model for poll options
class Options(Base):
  # Columns declaration
  name = db.Column(db.String(200), unique=True)

  # Method to view objects in terminal
  def __repr__(self):
    return self.name

  def to_json(self):
    return {
      'id': uuid.uuid4(),  # Generates a random uuid
      'name': self.name
    }

# Model Polls to connect questions and options together
class Polls(Base):
  # Columns declaration
  question_id = db.Column(db.Integer, db.ForeignKey('questions.id'))
  option_id = db.Column(db.Integer, db.ForeignKey('options.id'))
  vote_count = db.Column(db.Integer, default=0)

  # Relationship declaration
  question = db.relationship('Questions', foreign_keys=[question_id],
          backref=db.backref('options', lazy='dynamic'))
  option = db.relationship('Options',foreign_keys=[option_id])

  # Method to view objects in terminal
  def __repr__(self):
    return self.option.name


