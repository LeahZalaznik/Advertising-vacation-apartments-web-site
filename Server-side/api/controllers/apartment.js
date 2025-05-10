import { saveImages } from '../../images.js'
import advertiser from '../models/advertiser.js'
import advertisers from '../models/advertiser.js'
import apartment from '../models/apartment.js'
import Apartment from '../models/apartment.js'
import category from '../models/category.js'
import categorys from '../models/category.js'
import city from '../models/city.js'
import citys from '../models/city.js'
export const getAll = (req, res) => {
    Apartment.find()
        .populate('city', 'name')
        .populate('category', 'name')
        .populate('advertiser', 'email phoneNumber')
        .then(data => {
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}
export const getAepartmentsByAdvertiser = (req, res) => {
    Apartment.find({ advertiser: req.params.id })
        .populate('city', 'name')
        .populate('category', 'name')
        .then(apartments => {
            if (!apartments || apartments.length === 0) {
                return res.status(404).send({ message: 'No apartments found for this advertiser.' });
            }
            res.status(200).send(apartments);
        })
        .catch(err => {
            res.status(500).send({ error: err.message });
        });
};
export const getAepartmentsByCity = (req, res) => {
    citys.findById(req.params.id)
        .populate({
            path: 'apartments',
            populate: [
                { path: 'category', select: 'name -_id' },
                { path: 'city', select: 'name -_id' },
                { path: 'advertiser', select: 'email phoneNumber phoneNumber2 -_id' },
            ],
            select: '-__v -_id',
        })
        .then(data => {
            res.status(200).send(data.apartments)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}
export const getAepartmentsByCategory = (req, res) => {
    categorys.findById(req.params.id)
        .populate({
            path: 'apartments',
            populate: [
                { path: 'category', select: 'name' },
                { path: 'city', select: 'name' },
                { path: 'advertiser', select: 'email phoneNumber phoneNumber2' },
            ],
        })
        .then(data => {
            res.status(200).send(data.apartments)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}
export const getById = (req, res) => {
    Apartment.findById(req.params.id)
        .then(p => {
            if (!p) {
                return res.status(404).send({ error: 'Apartment not found!' })
            }
            res.status(200).send(p)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}
export const update = (req, res) => {
    const { id } = req.params;

    // עדכון דירה על פי ה-ID שנשלח
    Apartment.findByIdAndUpdate(id, req.body, { new: true })
        .then(async (apartment) => {
            if (!apartment) {
                return res.status(404).send({ error: 'Apartment not found' });
            }
            const { name, description, city, address, category, Numbers_beds, price, advertiser, img, additives } = req.body;

            let updatedApartment = {
                name,
                description,
                city,
                address,
                category,
                Numbers_beds,
                price,
                img,
                additives
            };

            if (apartment.category !== category) {
                await categorys.findByIdAndUpdate(category, { $push: { apartments: apartment._id } });
                await categorys.findByIdAndUpdate(apartment.category, { $pull: { apartments: apartment._id } });
            } if (apartment.city !== city) {
                await citys.findByIdAndUpdate(city, { $push: { apartments: apartment._id } });
                await citys.findByIdAndUpdate(apartment.city, { $pull: { apartments: apartment._id } });
            }

            if (apartment.advertiser !== advertiser) {
                await advertisers.findByIdAndUpdate(advertiser, { $push: { apartments: apartment._id } });
                await advertisers.findByIdAndUpdate(Apartment.advertiser, { $pull: { apartments: apartment._id } });
            }
            const apartments = await Apartment.find()
            .populate('city', 'name')
            .populate('category', 'name')
            .populate('advertiser', 'email phoneNumber');

        res.status(200).send({ message: `update apartment ${apartment._id} succeeded!`, apartments });
            res.status(200).send({ message: `Apartment ${apartment._id} updated successfully`, apartment });
        })
        .catch((error) => {
            res.status(500).send({ error: error.message });
        });
};
export const getByBed = (req, res) => {
    const { condition, beds } = req.params;
    switch (condition) {
        case "min":
            Apartment.find().where({ Numbers_beds: { $lte: beds } })
                .then(apartments => {
                    if (apartments.length === 0) {
                        res.status(404).send({ message: "No apartments found matching the condition." });
                    } else {
                        res.status(200).send(apartments);
                    }
                }).
                catch(err => {
                    res.status(500).send({ message: err.message });
                })
            break;
        case "max":
            Apartment.find().where({ Numbers_beds: { $gte: beds } })
                .then(apartments => {
                    if (apartments.length === 0) {
                        res.status(404).send({ message: "No apartments found matching the condition." });
                    } else {
                        res.status(200).send(apartments);
                    }
                }).
                catch(err => {
                    res.status(500).send({ message: err.message });
                })
            break;
        case "equal":
            Apartment.find().where({ Number_beds: { $eq: beds } })
                .then(apartments => {
                    if (apartments.length === 0) {
                        res.status(404).send({ message: "No apartments found matching the condition." });
                    } else {
                        res.status(200).send(apartments);
                    }
                }).
                catch(err => {
                    res.status(500).send({ message: err.message });
                })
            break;
        default:
            res.status(400).send({ message: "Invalid condition." });
    }
}
export const getByPrice = (req, res) => {
    const { thePrice, cond } = req.params;
    Apartment.find()
        .where({ price: cond == 'lte' ? { $lte: thePrice } : cond == 'gte' ? { $gte: thePrice } : { $eq: thePrice } })
        .then(data => {
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}

export const getByConditions = (req, res) => {
    const filter = {}
    const { minBeds, maxBeds, bed, minPrice, maxPrice, price, city, category, advertiser, additives } = req.body;
    if (city) filter.city = city;
    if (category) filter.category = category;
    if (minBeds) filter.Numbers_beds = { ...filter.Numbers_beds, $gte: parseInt(minBeds) };
    if (maxBeds) filter.Numbers_beds = { ...filter.Numbers_beds, $lte: parseInt(maxBeds) };
    if (price) filter.price = { ...filter.price, $eq: parseInt(price) };
    if (bed) filter.Numbers_beds = { ...filter.Numbers_beds, $eq: parseInt(bed) };
    if (minPrice) filter.price = { ...filter.price, $gte: parseInt(minPrice) };
    if (maxPrice) filter.price = { ...filter.price, $lte: parseInt(maxPrice) };
    if (advertiser) filter.advertiser = advertiser;
    if (additives) filter.additives = { $all: additives.split(',') }
    console.log(filter);

    Apartment.find(filter)
        .populate('city', 'name')
        .populate('category', 'name')
        .populate('advertiser', 'email phoneNumber')
        .then(data => {
            if (data.length == 0)
                return res.status(404).send({ message: "No apartments found matching the condition." });
            res.status(200).send(data)
        })
        .catch(err => {
            res.statזus(500).send({ error: err.message })

        });
}

export const addApartment = async (req, res) => {
    try {
        console.log("🔹 נתונים שהתקבלו:", req.body);
        console.log("🔹 קבצים שהתקבלו:", req.files); // חשוב מאוד לבדוק

        const {
            name,
            description,
            category,
            city,
            address,
            Numbers_beds,
            additives,
            price,
            advertiser
        } = req.body;

        if (!name || !category || !city || !address || !price || !advertiser) {
            return res.status(400).send({ error: "חסרים שדות חובה" });
        }

        let imagesPaths = [];
        try {
            imagesPaths = saveImages(name, req.files?.img); // שימו לב: req.files.img הוא מערך התמונות
        } catch (error) {
            console.error("הבעיה כאןןןןןןן!!!", error);
            return res.status(500).send({ error: "שגיאה בשמירה של תמונות" });
        }

        const newApartment = new Apartment({
            name,
            description,
            img: imagesPaths, // שומרים את שמות התמונות במסד הנתונים
            category,
            city,
            address,
            Numbers_beds,
            additives,
            price,
            advertiser
        });

        const apartment = await newApartment.save();
        console.log('----');

        await categorys.findByIdAndUpdate(category, { $push: { apartments: apartment._id } });
        console.log('----');
        await advertisers.findByIdAndUpdate(advertiser, { $push: { aepartments: apartment._id } }); // תיקון טעות כתיב aepartments
        console.log('--988--');
        await citys.findByIdAndUpdate(city, { $push: { apartments: apartment._id } });
        console.log('-*******---'); 
        const apartments = await Apartment.find()
            .populate('city', 'name')
            .populate('category', 'name')
            .populate('advertiser', 'email phoneNumber');

        res.status(200).send({ message: `add apartment ${apartment._id} succeeded!`, apartments });
    } catch (err) {
        console.error("שגיאה בשרת:", err);
        res.status(500).send({ error: err.message });
    }
};


export const remove = async (req, res) => {
    try {
        const apartment = await Apartment.findByIdAndDelete(req.params.id);
        if (!apartment) {
            return res.status(404).send({ error: 'Apartment not found' });
        }

        await category.findByIdAndUpdate(apartment.category, { $pull: { apartments: apartment._id } });
        await advertiser.findByIdAndUpdate(apartment.advertiser, { $pull: { apartments: apartment._id } });
        await city.findByIdAndUpdate(apartment.city, { $pull: { apartments: apartment._id } });

        const apartments = await Apartment.find()
            .populate('city', 'name')
            .populate('category', 'name')
            .populate('advertiser', 'email phoneNumber');

        res.status(200).send({ message: `Delete apartment ${apartment._id} succeeded!`, apartments });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};


export const addOpinion = async (req, res) => {
    const id = req.params.id

}