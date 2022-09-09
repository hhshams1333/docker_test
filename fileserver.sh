which docker
if [ $? -eq 0 ]
then
    docker --version | grep "Docker version"
    if [ $? -ne 0 ]
    then
        echo "install docker"
        exit 0
    fi
else
    echo "install docker" >&2
    exit 0
fi
sudo docker network create shams
sudo docker build -t server_shams ./server
sudo docker run -d -p 3000:3000 -v servervol:/serverdata  --network=shams --name serverContainer server_shams
sleep 5s
docker logs serverContainer
echo "successfully run container server_shams on port 3000"
