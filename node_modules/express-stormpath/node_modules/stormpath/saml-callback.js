var stormpath = require('./');

var client = new stormpath.Client({
  apiKey: {
    id: '4BOZ3Y2184OD9TRLHD6NV34CZ',
    secret: 'R5KmlEvTjfGk4oAiDPv/5wWNMsWdDR9TCleJr7K+Op4'
  }
});

var jwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5zdG9ybXBhdGguY29tL3YxL2FwcGxpY2F0aW9ucy82WnRkYjFHdWtkdnpkbFRXRDQwZ2lMIiwic3ViIjoiaHR0cHM6Ly9hcGkuc3Rvcm1wYXRoLmNvbS92MS9hY2NvdW50cy80QnpGQzNaZFFUZ3hhdEpNSmNKcXFMIiwiYXVkIjoiNEJPWjNZMjE4NE9EOVRSTEhENk5WMzRDWiIsImV4cCI6MTQ1MzQyMTUwNSwiaWF0IjoxNDUzNDIxNDQ1LCJqdGkiOiJkNzc4NzFkMi1mMDQ1LTRlMTktODlhOS02YzA2MGQzMzM1NzEiLCJpcnQiOiJfY2EwMWViMzk0ODI4MWZlODA0ZGUxNTRlNTI4Yzg2YTUxNDUzNDIxNDQ0NDg5IiwiaXNOZXdTdWIiOmZhbHNlLCJzdGF0dXMiOiJBVVRIRU5USUNBVEVEIn0.OoV9Le-y52Ry8P9UcpYzXDiS4xwvo_Q4CDan09L_UuQ';

client.getApplication('https://api.stormpath.com/v1/applications/6Ztdb1GukdvzdlTWD40giL', function (err,application) {
  var authenticator = new stormpath.StormpathAssertionAuthenticator(application);
  authenticator.authenticate(jwt, function(err, result){
    console.log(err,result);
  });
});