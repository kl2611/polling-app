# Polling App
This polling app features a landing page where a random poll question is displayed along with a list of possible responses. Once the user submits a response, the page redirects to a new view that displays the question and response frequencies in the form of a bar chart. Upon returning to the homepage, a new random question will be asked. User can answer the same question more than once.

## Local Deployment
#### Backend setup
Create virtual environment `virtualenv flask`
<br />

`pip install -r requirements.txt`
<br />
`FLASK_APP=server 
FLASK_DEBUG=1 flask run`
`flask run`

#### Frontend setup
`npm start`
<br />
Navigate to `localhost:5001`

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
| title           | string        |                           |
| options         | array         |                           |
| total_vote_count| integer       |                           |

#### Options
| column name    | data type     | details                   |
| -------------  | ------------- | --------------------------|
| id             | integer       |  not null, primary key    |
| name           | string        |                           |

#### Polls
| column name    | data type     | details                   |
| -------------  | ------------- | --------------------------|
| question_id    | integer       |  not null, foreign key    |
| option_id      | integer       |  not null, foreign key    |
| vote_count     | integer       |  not null                 |

## Thoughts and Future Implementations
I chose Flask for the Python backend due to its versatility. 
