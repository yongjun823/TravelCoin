# mkdir dist

./fabric-scripts/hlfv11/stopFabric.sh
./fabric-scripts/hlfv11/teardownFabric.sh
./fabric-scripts/hlfv11/startFabric.sh

composer card delete --card admin@ttcnetwork

composer archive create --sourceType dir --sourceName . -a ./dist/ttc-network.bna

composer network install --card PeerAdmin@hlfv1 --archiveFile ./dist/ttc-network.bna

composer network start --networkName ttcnetwork --networkVersion 0.2.8 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card

composer card import --file networkadmin.card
composer network ping --card admin@ttcnetwork