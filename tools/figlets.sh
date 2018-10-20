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

FONT_BASE="/usr/share/figlet"
if [ ! -d "$FONT_DIR" ]; then
  FONT_BASE="/usr/local/share/figlet"
fi

FONT_DIR="$FONT_BASE/fonts/"

for f in $FONT_DIR/*.[tf]lf; do
    font=`basename $f`
    echo "\n$font"
    figlet -f $font $msg
done
