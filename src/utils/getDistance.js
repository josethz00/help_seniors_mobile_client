const degToRad = (deg) => { return deg * (Math.PI / 180); }

function getDistance (position1, position2) {

    const Radius = 6371,
    dLat = degToRad(position2.lat - position1.lat),
    dLng = degToRad(position2.lng - position1.lng),
    a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
            + Math.cos(degToRad(position1.lat))
            * Math.cos(degToRad(position1.lat))
            * Math.sin(dLng / 2) * Math.sin(dLng / 2),
    c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const final = (Radius * c * 1000)/1000;
       
    return final.toFixed(2) + 'km';

}

export { getDistance };