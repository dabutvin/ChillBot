var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

module.exports = function (context) {
    var event = context.bindings.event;
  	var comment = event.comment;
    

    context.log(comment.body);
  
    var tone_analyzer = new ToneAnalyzerV3({
	  username: process.env['ToneAnalyzerUsername'],
	  password: process.env['ToneAnalyzerPassword'],
	  version_date: '2016-05-19'
	});

    tone_analyzer.tone(
	{
	  tone_input: comment.body,
	  content_type: 'text/plain'
	},
	function(err, tone) {
	  if (err) {
	    context.log(err);
	  } else {
	    context.log(JSON.stringify(tone, null, 2));
	  }
	});


    context.done();
};
