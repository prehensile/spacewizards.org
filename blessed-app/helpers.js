var blessed = require('blessed');
var fs = require('fs')

exports.loadArtBox = function( artPath ){
    
    var art = fs.readFileSync( artPath, 'utf8' );
    var lines = art.split("\n");
    let w = 0;
    lines.forEach(line => {
      if( line.length > w ) w = line.length;
    });
    
    var box = blessed.box({
      width: w,
      height: lines.length,
      content: art,
      style: {
        fg: 'white',
      },
      fill: true
    });
  
    return box;
}
  