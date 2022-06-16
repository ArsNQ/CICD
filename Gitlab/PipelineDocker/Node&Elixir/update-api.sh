api=$(<.envapi)

echo $api

sed -i "s/^API_VERSION=.*/API_VERSION=$api/" .env
