#!/bin/sh
s3cmd sync ./production-assets/ s3://assets.lift.zone -v --acl-public --delete-removed --guess-mime-type --config ./.s3cfg
s3cmd sync ./production/ s3://lift.zone -v --acl-public --delete-removed -m text/html --config ./.s3cfg
#ugh
s3cmd sync ./production-assets/css/*.css s3://assets.lift.zone/css -v --acl-public --config -./.s3cfg -m text/css
