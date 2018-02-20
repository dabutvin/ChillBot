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

    tone_analyzer.tone({
      tone_input: comment.body,
      content_type: 'text/plain'
      },
      function(err, response) {
          if (err) {
            context.log(err);
        } else {
            var categories = response.document_tone.tone_categories;

            for(var i=0; i < categories.length; i++) {
                var category = categories[i];

                if(category.category_id === 'emotion_tone') {
                    for(var j=0; j < category.tones.length; j++) {
                        var tone = category.tones[j];

                        if(tone.tone_id === 'anger') {
                            context.log('ANGER: ' + tone.score);
                        } else if(tone.tone_id === 'disgust') {
                            context.log('DISGUST: ' + tone.score);
                        }
                    }
                } else if (category.category_id === 'language_tone') {
                    for(var j=0; j < category.tones.length; j++) {
                        var tone = category.tones[j];

                        if(tone.tone_id === 'analytical') {
                            context.log('ANALYTICAL: ' + tone.score);
                        }
                    }
                } else if (category.category_id === 'social_tone') {
                    for(var j=0; j < category.tones.length; j++) {
                        var tone = category.tones[j];

                        if(tone.tone_id === 'agreeableness_big5') {
                            context.log('AGREEABLENESS: ' + tone.score);
                        } else if(tone.tone_id === 'openness_big5') {
                            context.log('OPENNESS: ' + tone.score);
                        }
                    }
                }
            }
        }

        context.done();
    });
};
