# Polling App
This is a small web app which features a landing page where a random poll question is displayed along with a list of possible responses. Once the user submits a response, the page redirects to a new view that displays the question and response frequencies in the form of a bar chart. Upon returning to the homepage, a new random question will be asked. User can answer the same question more than once.

## Demo
![image](https://github.com/kl2611/polling-app/blob/master/static/images/question.png?raw=true)
![image](https://github.com/kl2611/polling-app/blob/master/static/images/results.png?raw=true)

## Local Deployment

#### Backend setup
You will need to have Python, pip, and virtualenv installed before you can proceed.

Clone git repository
```
git clone https://github.com/kl2611/polling-app.git
```

Navigate into root directory
```
cd polling-app
```

Create virtual environment 
```
virtualenv flask
```
go into flask folder 
```
cd flask
```
Activate virtual environment
```
source bin/activate
```

Go back to parent directory and install requirements 
```
cd ..
```

```
pip install -r requirements.txt
```

Set the FLASK_APP and FLASK_DEBUG variables
```
export FLASK_APP=app.py
export FLASK_DEBUG=1
```

Run with
```
flask run
```

#### Frontend setup
Open new terminal window and navigate to frontend folder 
```
cd frontend
```

Install dependencies
```
npm install
```
To run:
```
ng serve --host 0.0.0.0 --port 5001
```

Navigate to `localhost:5001` in your browser

## Code
### Backend
- Python Flask backend
- SQLAlchemy relational-based backend

### Frontend
- Angular 2 framework 
- Bootstrap toolkit
- SASS stylesheets

## Available APIs
|  HTTP Method    | URL            | details                   |
| -------------   | -------------  | --------------------------|
|  GET            | /api/polls     |  gets all polls           |
|  POST           | /api/polls     |  create a new poll        |
|  GET            | /api/polls/:id |  not null                 |
|  PATCH          | /api/polls/vote|  votes on a poll' option  |

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
Angular 2 was used because of TypeScript compiler's ease-of-use and simplicity of the interface. A con of Angular 2, however, is its large set of data files that comes with angular-cli. But as a practical reason, my existing familiarity with the framework made it more convenient to use.

With more time permitted, I implement the following: 
- Unit tests
- Improving app security
- Improve UI/UX design
- Render all error views and components
- Provide a larger poll question repository/seed file. As of now there are only 10 questions in the database.
- Ability for a user to delete and modify existing poll options. 
