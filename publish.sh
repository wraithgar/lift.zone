#!/bin/sh
s3cmd sync ./public/ s3://lift.zone -v --acl-public --delete-removed -m text/html --config ./.s3cfg
