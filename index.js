/**
 * Responds to any HTTP request that can provide a "message" field in the body.
 *
 * @param {!Object} req Cloud Function request context.
 * @param {!Object} res Cloud Function response context.
 */
var whois = require('whois');
const url = require('url');

exports.whoIs = function whoIs(req, res){
  var url;
  if(req.body.domain){
    url = parseUrl(req.body.domain);
  }else if(req.query && req.query.domain){
    url = parseUrl(req.query.domain);
  }else{
    return res.status( 420 ).send( 'Missing required \'domain\' parameter.' );
  }
  
  whois.lookup(url.host, {
  	follow: 5
  },function(err, data) {
    if(err){
      return res.status( 500 ).send( 'Something went wrong on our end.' );
    }else{
      return res.status( 200 ).send( JSON.stringify(data) );
    }
  });
}

function parseUrl(site){
  // First, validate that site is at minimum a domain.
  var urlToParse = url.parse(site);

  // If host isn't defined, check path.
  if(!urlToParse.host){
    // It's distinctly possible that we were merely missing http...
    if(site.indexOf('http') == -1){
      // Found it. Try again.
      return parseUrl('http://' + site);
    }
    // Otherwise... hm. That's not good
  }

  return urlToParse;
}
