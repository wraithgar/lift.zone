#!/bin/sh
s3cmd sync ./assets/ s3://assets.lift.zone -v --acl-public --delete-removed --guess-mime-type --config ./.s3cfg
