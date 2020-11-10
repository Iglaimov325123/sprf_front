#!/bin/bash
set -o errexit
set -o nounset
set -o xtrace
set -o pipefail

ssh instance@audit.gov.ru-prd 'cd api; git pull'
ssh instance@audit.gov.ru-prd /opt/nginx-cache-clear.sh
