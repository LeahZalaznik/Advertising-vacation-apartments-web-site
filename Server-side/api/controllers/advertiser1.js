import advertiser from "../models/advertiser.js";
import Advertiser from "../models/advertiser.js";
import jwt from "jsonwebtoken";

export const getById = (req, res) => {
    Advertiser.findById(req.params.id)
        .then(advertiser => {
            if (!advertiser) {
                return res.status(404).send({ error: 'advertiser not found!' })
            }
            const token = jwt.sign({ name: advertiser.name, email: advertiser.email }, process.env.SECRET_KEY, { expiresIn: '1h' });
            res.status(200).send({ advertiser, token });
        })
        .catch(err => {
            res.status(500).send({ error: err.message })
        })
}
export const Register = (req, res) => {
    const { email, password, phoneNumber, phoneNumber2 } = req.body;
    const newAdvertiser = new Advertiser({ email, password, phoneNumber, phoneNumber2 });
    Advertiser.findOne({ email })
        .then(advertiser => {
            if (advertiser) {
                return res.status(400).send({ error: 'Advertiser already exists!' })
            }
            newAdvertiser.save()
                .then(advertiser => {
                    newAdvertiser.save()
                        .then(data => {
                            const token = jwt.sign({ name: data.name, email: data.email }, process.env.SECRET_KEY, { expiresIn: '1h' });
                            res.send({ data, token });
                        }).catch(err => {
                            res.status(500).send({
                                message: err.message || "Some error occurred while creating the Advertiser."
                            });
                        });
                })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Advertiser."
            });
        });

}

export const Login = (req, res) => {
    const email = req.params.email;
    console.log(email);
    Advertiser.findOne({ email })
    .then(advertiser => {
        if (!advertiser) {
            return res.status(404).send({ error: 'advertiser not found!' })
        }
        const token = jwt.sign({ name: advertiser.name, email: advertiser.email }, process.env.SECRET_KEY, { expiresIn: '6h' });
        res.status(200).send({ advertiser, token });
    })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Advertiser."
            });

        })
}


