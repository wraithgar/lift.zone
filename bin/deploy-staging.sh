#!/bin/sh
s3cmd sync ./staging-assets/ s3://staging.assets.lift.zone -v --acl-public --delete-removed --guess-mime-type --config ./.s3cfg
s3cmd sync ./staging/ s3://staging.lift.zone -v --acl-public --delete-removed -m text/html --config ./.s3cfg
#ugh
s3cmd sync ./staging-assets/css/*.css s3://staging.assets.lift.zone/css -v --acl-public --config -./.s3cfg -m text/css
