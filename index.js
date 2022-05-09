const {parse} =require("csv-parse");
const { on } = require("events");
const fs = require ("fs");

// buffers are objects node used in collection of bytes

const habitablePlanets = [];
///////////////////////////////////////////
function isHabitablePlanet(planet) {
    return planet['koi_disposition'] === 'CONFIRMED'
      && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
      && planet['koi_prad'] < 1.6;
  }
///////////////////////////////////////
fs.createReadStream("kepler_data.csv")
.pipe(parse({
    comment:'#',
    columns:true,
    //this will return the csv as a javascript objet with key value pair


}))
.on("data", (data) => {
    if (isHabitablePlanet(data)){
        habitablePlanets.push(data);
    }

    

})
.on("error", (err)=>{
console.log(err)
})

.on('end', () => {
    console.log(habitablePlanets.map((planet) => {
      return planet['kepler_name'];
    }));
    console.log(`${habitablePlanets.length} habitable planets found!`);
  });


