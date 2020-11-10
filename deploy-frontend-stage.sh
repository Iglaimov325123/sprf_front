#!/bin/bash
set -o errexit
set -o nounset
set -o xtrace
set -o pipefail

# npm run generate
npm run build
rsync -azP dist/. instance@kuznechiki-serv2:vue/.
