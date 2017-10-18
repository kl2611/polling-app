var Router = ReactRouter.Router;
var Route = ReactRouter.Route;

var origin = window.location.origin;

var PollForm = React.createClass({

  handleSubmit: function(e) {
    e.preventDefault();
    var title = this.state.title;
    var options = this.state.options;

    var data = {'title': title, options: options.map(function(x) {
      return x.name
    })};
    var url = origin + '/api/polls'

    $.ajax({
      url: url,
      dataType: 'json',
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json; charset=utf-8',
      success: function(data) {
        alert(data.message);
      }.bind(this),
      error: function(xhr, status, err) {
        alert('Poll creation failed' + err.toString());
      }.bind(this)
    });
  }

});