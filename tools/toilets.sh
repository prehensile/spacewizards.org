#! /bin/sh

# Display all the possible toilet fonts for a string.
#
# “mini” and “script” are especially cute.
# toilet: http://caca.zoy.org/wiki/toilet
# Toilet is “banner”-like tool. Another is figlet, but there may be
# others.
#
# You might want to do things with color options, too.

msg=${1?Must provide msg string}

FONT_DIR="/usr/share/figlet/fonts"
if [ ! -d "$FONT_DIR" ]; then
  FONT_DIR="/usr/local/share/figlet/fonts"
fi

for f in $FONT_DIR/*.[tf]lf; do
    font=`basename $f`
    echo "\n$font"
    toilet -t -f $font $msg
done
