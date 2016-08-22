#!/bin/sh
s3cmd sync ./assets/ s3://assets.lift.zone -v --acl-public --delete-removed --guess-mime-type --config ./.s3cfg
s3cmd sync ./public/ s3://lift.zone -v --acl-public --delete-removed -m text/html --config ./.s3cfg
