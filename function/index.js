module.exports = function (context) {
    var comment = context.bindings.comment;
  
    context.log(comment.action);
  

    context.done();
};
