import $ from 'jquery';
import {GOOGLE_MAP_KEY} from "../constants";

export const detectLocation = async () => {
  let location = false;
  if ("geolocation" in navigator) {
    location = await new Promise((resolve) => navigator.geolocation.getCurrentPosition(
      function success(position) {
        // console.log('latitude', position.coords.latitude,
        //   'longitude', position.coords.longitude);
        resolve(position.coords);
      },
      function error(error_message) {
        // for when getting location results in an error
        resolve(false);
      }
    ));
  }
  return location;
};

export const ipLookUp = async () => {
  return await new Promise((resolve) => $.ajax('http://ip-api.com/json')
    .then(
      function success(response) {
        resolve({latitude: response.lat, longitude: response.lon, ...response});
      },
      function fail(data, status) {
        resolve(false);
      }
    ));
};

export const getAddress = async (latitude, longitude) => {
  return await new Promise((resolve) => $.ajax('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&key=' + GOOGLE_MAP_KEY)
    .then(
      function success (response) {
        resolve(response);
      },
      function fail (status) {
        resolve(false);
      }
    ));
};

export const calcDistance = (lat1, lon1, lat2, lon2, unit) => {
  if ((lat1 === lat2) && (lon1 === lon2)) {
    return 0;
  }
  else {
    let radlat1 = Math.PI * lat1/180;
    let radlat2 = Math.PI * lat2/180;
    let theta = lon1-lon2;
    let radtheta = Math.PI * theta/180;
    let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = dist * 180/Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit === "K") { dist = dist * 1.609344 }
    if (unit === "N") { dist = dist * 0.8684 }
    return dist;
  }
};