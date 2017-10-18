var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var browserHistory = ReactRouter.browserHistory;

var origin = window.location.origin;

var RandomPoll = React.createClass({
  voteHandler: function(data) {
    var url = origin + '/api/poll/vote'

    $.ajax({
      url: url,
      dataType: 'json',
      type: 'PATCH',
      data: JSON.stringify(data),
      contentType: 'application/json; charset=utf-8',
      success: function(data){
        alert(data.message);
        this.setState({selected_option: ''});
        this.props.loadPollsFromServer();
      }.bind(this),
      error: function(xhr, status, err){
        alert('Poll creation failed: ' + err.toString());
      }.bind(this)
    });
  },


  componentDidMount: function() {
    var randQuestion = Math.floor((Math.random()) * 4  + 1);
  },


  render: function() {

  }

});