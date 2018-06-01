var whois = require('whois');

exports.whois = function whois(req, res){
  var url;
  if(req.body.domain){
    url = parseUrl(req.body.domain);
  }else if(req.query && req.query.domain){
    url = parseUrl(req.query.domain);
  }else{
    return res.status( 420 ).send( 'Missing required \'domain\' parameter.' );
  }
  
  whois.lookup(url, function(err, data) {
    if(err){
      return res.status( 500 ).send( 'Something went wrong on our end.' );
    }else{
      return res.status( 200 ).send( data );
    }
  });
}
