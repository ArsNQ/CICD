app=$(<.envapp)

echo $app

sed -i "s/^APP_VERSION=.*/APP_VERSION=$app/" .env
