#!/bin/sh
# entrypoint.sh

# Replace variables in template and write to final env.js
envsubst < /usr/share/nginx/html/env.template.js > /usr/share/nginx/html/env.js

# Start nginx
nginx -g 'daemon off;'