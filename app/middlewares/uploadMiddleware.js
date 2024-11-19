const multer = require('multer');
const { bucket } = require('../config/googleCloud');

// Configure multer storage
const multerStorage = multer.memoryStorage();

// Configure multer upload
const multerUpload = multer({
    storage: multerStorage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = ['image/jpeg', 'image/png', 'image/gif'];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Formato de archivo no válido. Solo se permiten JPG, PNG y GIF.'));
        }
    }
}).single('imagen');

// Error handler middleware
const handleMulterError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(400).json({ 
            error: 'Error al subir el archivo',
            details: err.message 
        });
    } else if (err) {
        return res.status(400).json({ 
            error: err.message 
        });
    }
    next();
};

// Google Cloud Storage upload function
const uploadToGCS = async (file) => {
    try {
        if (!file) return null;
        
        const fileName = `usuarios/${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`;
        const fileUpload = bucket.file(fileName);
        
        const blobStream = fileUpload.createWriteStream({
            resumable: false,
            metadata: {
                contentType: file.mimetype
            }
        });

        return new Promise((resolve, reject) => {
            blobStream.on('error', (error) => {
                console.error('Error al subir archivo:', error);
                reject(error);
            });
            
            blobStream.on('finish', () => {
                const publicUrl = `https://storage.googleapis.com/cliquealo/${fileName}`;
                resolve(publicUrl);
            });
            
            blobStream.end(file.buffer);
        });
    } catch (error) {
        console.error('Error en uploadToGCS:', error);
        throw error;
    }
};

module.exports = {
    multerUpload,
    handleMulterError,
    uploadToGCS
};