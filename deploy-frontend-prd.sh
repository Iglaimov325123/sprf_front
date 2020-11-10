#!/bin/bash
set -o errexit
set -o nounset
set -o xtrace
set -o pipefail

npm run generate
rsync -azP dist/. instance@audit.gov.ru-prd:vue/.
