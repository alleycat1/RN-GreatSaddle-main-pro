export const getDistance = (lat1, long1, lat2, long2) => {
    lat1 = parseFloat(lat1);
    long1 = parseFloat(long1);
    lat2 = parseFloat(lat2);
    long2 = parseFloat(long2);

    if (isNaN(lat1) || isNaN(long1) || isNaN(lat2) || isNaN(long2))
        return NaN;

    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI / 180; // φ, λ in radians
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (long2 - long1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c; // in metres
    return d;
}
