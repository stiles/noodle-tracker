import { dateParser } from './utils/d3-utils';

// Grab some data
const dataElement = document.getElementById('bonesdays');
const data = JSON.parse(dataElement.textContent);

const bonesData = data.map((d) => {
    d.date = dateParser(d.date);
    return d;
  });

console.log(bonesData);
