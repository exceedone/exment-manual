#!/bin/sh
# Builds the manual and puts it on exment.net (Xserver), as the other parts of exment.net
# are put (ExmentWeb, Common "公開とデプロイ"). Run it yourself, in Git Bash, with the
# SSH host "exment-xserver" in ~/.ssh/config.
#
#   sh deploy.sh            -> https://exment.net/docs-vp/  (to look at it next to the docsify one)
#   sh deploy.sh docs       -> https://exment.net/docs/     (the switch; the docsify files are kept
#                              in ~/backup_docs_<time>/ on the server first)
set -eu
dir="${1:-docs-vp}"
case "$dir" in
  docs|docs-vp) ;;
  *) echo "the folder is docs or docs-vp" >&2; exit 1 ;;
esac
cd "$(dirname "$0")"
npm ci
# Git Bash would turn "/docs/" into a Windows path
MSYS_NO_PATHCONV=1 MANUAL_BASE="/$dir/" npm run build
if [ "$dir" = "docs" ]; then
  ssh exment-xserver 'cd ~/exment.net/public_html && b=~/backup_docs_$(date +%Y%m%d%H%M) && mkdir -p "$b" && cp -a docs "$b/" && echo "kept in $b"'
fi
tar --format=pax -C .vitepress/dist -czf - . | ssh exment-xserver "mkdir -p ~/exment.net/public_html/$dir && cd ~/exment.net/public_html/$dir && tar xzf -"
echo "check: curl -s -o /dev/null -w '%{http_code}' https://exment.net/$dir/ja/file_server.html"
