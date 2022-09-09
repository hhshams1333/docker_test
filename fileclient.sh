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
sudo docker build -t client_shams ./client
sudo docker run -d -v clientvol:/clientdata --network=shams --name clientContainer client_shams
sleep 5s
docker logs clientContainer
echo "successfully run container client_shams"
