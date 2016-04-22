module.exports.stormpathGroupsRequired = function stormpathGroupsRequired(groups, all) {
  var helpers = require('express-stormpath/lib/helpers');

  all = all === false ? false : true;

  return function (req, res, next) {
    var config = req.app.get('stormpathConfig');
    var logger = req.app.get('stormpathLogger');
    var view = 'unauthorized';

    if (!req.user) {
      // NOTE: Modify the redirect here.
      var url = config.web.login.uri + '?next=' + encodeURIComponent(req.originalUrl);
      return res.redirect(302, url);
    }

    // If this user must be a member of all groups, we'll ensure that is the
    // case.
    var done = groups.length;
    var safe = false;

    req.user.getGroups(function (err, userGroups) {
      if (err) {
        logger.info('Could not fetch user ' + req.user.email + '\'s groups.');
        return helpers.render(req, res, view);
      }

      // Iterate through each group on the user's account, checking to see
      // whether or not it's one of the required groups.
      userGroups.each(function (group, c) {
        if (groups.indexOf(group.name) > -1) {
          if (!all || --done === 0) {
            safe = true;
            next();
          }
        }
        c();
      },
      // If we get here, it means the user didn't meet the requirements,
      // so we'll send them to the login page with the ?next querystring set.
      function () {
        if (!safe) {
          logger.info('User ' + req.user.email + ' attempted to access a protected endpoint but did not meet the group check requirements.');
          res.redirect('/completeprofile');
        }
      });
    });
  };
}