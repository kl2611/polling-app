# Polling App
This polling app features a landing page where a random poll question is displayed along with a list of possible responses. Once the user submits a response, the page redirects to a new view that displays the question and response frequencies in the form of a bar chart. Upon returning to the homepage, a new random question will be asked. User can answer the same question more than once.

## Local Deployment
#### Backend setup
Create virtual environment `virtualenv flask`
<br />

`pip install -r requirements.txt`
<br />
`FLASK_APP=server`
<br />
`FLASK_DEBUG=1 flask run`
<br />
`flask run`

#### Frontend setup
In terminal, run `ng serve --host 0.0.0.0 --port 5001`
<br />
Navigate to `localhost:5001` in your browser

## Code
### Backend
- Python Flask backend
- SQLAlchemy relational-based backend

### Frontend
- Angular 2 framework 
- Bootstrap toolkit
- SASS stylesheets

## Schema
#### Questions
| column name     | data type     | details                   |
| -------------   | ------------- | --------------------------|
| id              | integer       |  not null, primary key    |
| title           | string        |  not null                 |
| options         | array         |  not null                 |
| total_vote_count| integer       |  not null                 |

#### Options
| column name    | data type     | details                   |
| -------------  | ------------- | --------------------------|
| id             | integer       |  not null, primary key    |
| name           | string        |  not null                 |

#### Polls
| column name    | data type     | details                   |
| -------------  | ------------- | --------------------------|
| question_id    | integer       |  not null, foreign key (references questions)  |
| option_id      | integer       |  not null, foreign key (references options)    |
| vote_count     | integer       |  not null                                      |

## Thoughts and Future Implementations
I chose Flask over Django for the Python backend due to its flexibility and minimalistic features.
SQL Alchemy was used due to its excellent documentation, and the Flask SQLAlchemy extension made it easier to use SQLAlchemy directly in Flask.
Angular 2 was used because of TypeScript compiler's ease-of-use and simplicity of the interface. A con of Angular 2, however, is its large set of data files.

With more time permitted, I implement the following: 
- Unit tests
- Improving app security
- Improve UI/UX design
- Render all error views and components
- Provide a larger poll question repository/seed file. As of now there are only 5 questions in the database.
- Ability for a user to create, view, update, and delete questions and their options
