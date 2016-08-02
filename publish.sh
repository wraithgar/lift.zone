#!/bin/sh
s3cmd sync ./public/ s3://lift.zone -v --acl-public --delete-removed --guess-mime-type --config ./.s3cfg
