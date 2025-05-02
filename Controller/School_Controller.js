const School = require('../Model/School');

exports.addSchool = async (req, res) => {
    const { name, address, latitude, longitude } = req.body
    if (!name || typeof name != 'string' || name.trim() === '') {
        return res.status(400).json({
            errro: "Name must be not Empty"
        })
    }
    if (!address || typeof address != 'string' || address.trim() === '') {
        return res.status(400).json({
            error: "Address is not valid"
        })
    }

    const lat = parseFloat(latitude)
    const long = parseFloat(longitude)

    if (isNaN(lat) || isNaN(long)) {
        return res.status(400).json({
            error: "Latitude and Longitude must be a valid Number"
        })
    }

    try {
        const existingSchool = await School.findOne({
            where: {
                name: name.trim(),
                address: address.trim()
            }
        })
        if (existingSchool) {
            return res.status(409).json({
                error: "School with same name and address already exist !"
            })
        }

        const school = await School.create({
            name: name.trim(),
            address: address.trim(),
            latitude: lat,
            longitude: long
        })

        return res.status(200).json({
            success: true,
            msg: "School added Successfully",
            school
        })
    }
    catch (err) {
        return res.status(500).json({
            error: "Internal Server Error",
            detail: err.message
        })
    }

}


exports.listSchool = async (req, res) => {
    const { latitude, longitude } = req.body;

    const lat = parseFloat(latitude)
    const long = parseFloat(longitude)

    if (isNaN(lat) || isNaN(long)) {
        return res.status(400).json({
            error: "Latitude and Longitude must be a valid Number"
        })
    }

    try {
        const schools = await School.findAll();
        // Using Haversine formula to calculate the sortest distance between 2 points on the globe.

        const HaversineDistance = (lat1, lat2, lon1, lon2) => {
            const in_Radian = (angle) => (angle * Math.PI) / 180;
            const radius = 6371  // Radius of earth in km

            const diff_Latitude = in_Radian(lat2 - lat1);
            const diff_Longitude = in_Radian(lon2 - lon1);

            // Now applying the formula
            
            const a = Math.sin(diff_Latitude / 2) ** 2 +
                Math.cos(in_Radian(lat1)) * Math.cos(in_Radian(lat2)) * Math.sin(diff_Longitude / 2) ** 2;

            const angular_Distance = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

            return radius * angular_Distance  // diatance in km
        }


        const sorted_School = schools.map((school) => {
            const distance = HaversineDistance(
                lat, long, school.latitude, school.longitude
            );


            return {
                name: school.name,
                address: school.address,
                latitude: school.latitude,
                longitude: school.longitude,
                distance: parseFloat(distance.toFixed(5))
            };
        })
        
        sorted_School.sort((a, b) => a.distance - b.distance);

        return res.status(200).json({
            success: true,
            headers: ["Name", "Address", "Latitude", "Longitude", "Distance (km)"],
            rows: sorted_School
        })
    } catch (err) {
        return res.status(500).json({
            error: err.message
        })
    }
}