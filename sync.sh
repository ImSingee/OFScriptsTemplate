DIST=~/Library/Mobile\ Documents/iCloud~com~omnigroup~OmniFocus/Documents/Plug-Ins

mv "$DIST" "$DIST.bak-at-$(date +"%Y%m%d-%H%M")"
cp -R dist "$DIST"

echo "Success! View: $DIST"