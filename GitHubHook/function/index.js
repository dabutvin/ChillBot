module.exports = function (context, data) {
    context.log('GitHub Webhook triggered!');
    context.res = { body: 'New GitHub comment: ' };
    context.done();
};