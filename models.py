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
    title = db.Column(db.String(500))
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)

    # user friendly way to display the object
    def __repr__(self):
      return self.title

    def to_json(self):
      return {
        'title': self.title,
        'id': self.id,
        'options': [{
          'name': option.option.name, 
          'vote_count': option.vote_count}
          for option in self.options.all()]
      }

# Model for poll options
class Options(Base):
  name = db.Column(db.String(200), unique=True)

  def __repr__(self):
    return self.name

  def to_json(self):
    return {
      'id': uuid.uuid4(),  # Generates a random uuid
      'name': self.name
    }

# Polls model to connect questions and options together
class Polls(Base):
  # Columns declaration
  question_id = db.Column(db.Integer, db.ForeignKey('questions.id'))
  option_id = db.Column(db.Integer, db.ForeignKey('options.id'))
  vote_count = db.Column(db.Integer, default=0)

  # Relationship declaration (makes it easier for us to access the polls model
  # from the other models it's related to)
  question = db.relationship('Questions', foreign_keys=[question_id],
          backref=db.backref('options', lazy='dynamic'))
  option = db.relationship('Options',foreign_keys=[option_id])

  def __repr__(self):
    # a user friendly way to view our objects in the terminal
    return self.option.name

  def get_all():
    return Polls.query.all()

  def delete(self):
    db.session.delete(self)
    db.session.commit()
