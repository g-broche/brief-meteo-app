# Project

Take-home task based on the [weather-app repo](https://github.com/madzadev/weather-app.git).


## Modifications to implement

1. Change of API used for data from weather app to open meteo.

2. Removal of location based search and replacing it with a config file used to specifiy a city.

3. Add data and display refreshing every hour.

## Configuring a location

Due to the new implementation and endpoints given by open meteo, a unique location is defined not by a city name but by latitude and longitude coordinates.
The city/location and country names must also be entered by the user in the configuration as they are not part of received data when using coordinates as endpoint parameters.

To enter these informations, use the api-config.json file.
To find coordinates you can use the API website of [Open Meteo](https://open-meteo.com/en/docs) and the search box to enter a location to get the corresponding coordinates.