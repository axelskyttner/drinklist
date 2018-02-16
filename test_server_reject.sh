echo "this should be ok"
curl 'http://molnhatt.se/update_list?username=Mikael+Langer&beverage=beer'

echo "this should not be ok"
curl 'http://molnhatt.se/update_list?username=Mikael+Langer&beverage=beernotknow'
