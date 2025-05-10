import path from 'path'
import multer from 'multer'
import fs from 'fs'

const fileFilter=(req, file, cb) =>{
    if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/gif"
    ) {
        cb(null, true) // אישור קובץ
    } else {
        cb(new Error("Only image files are allowed!"), false) // דחיית קובץ
    }
}

export const upload = multer({
    storage: multer.memoryStorage(), 
    fileFilter: fileFilter
}).fields([{ name: "img", maxCount: 100 }]) 

export const saveImages=(apartmentName, files) =>{
    console.log(files);
    console.log(files);
    console.log(files);
    if(!apartmentName)
        throw new Error('apartmentName is required')
    const directoryPath = path.join("../client-side/public/pict", apartmentName)
    if(!fs.existsSync(directoryPath))
        fs.mkdirSync(directoryPath,{ recursive: true})
    console.log(files);
    return files?.map((file,index) => {
        const fileName = Date.now() + path.extname(file.originalname)
        const filePath = path.join(directoryPath, fileName)
        fs.writeFileSync(filePath, file.buffer)
        if(index===1)
            return `/pictures/aaaa/logo.jpg`
        else
        return `/pictures/${apartmentName}/${fileName}`
    })
}

