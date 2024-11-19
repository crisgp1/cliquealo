const { Storage } = require('@google-cloud/storage');

const storage = new Storage({
    projectId: "cliquealomx",
    credentials: {
        type: "service_account",
        project_id: "cliquealomx",
    private_key_id: "46b7cc0417556cc4808d84066aa0b74585ed32e3",
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEugIBADANBgkqhkiG9w0BAQEFAASCBKQwggSgAgEAAoIBAQCuRpJDgzHjghYM\n8ZplwDQyUn2m+KL2UGQyGomhF5lMuPguM9BdOR9ms2f5ugT/FPaLCgepwnLEjvBh\ndOYbd6CtV7O2+MVZ5zBaiyxaH8SPgIv/7sMmFN1W21VVC5PhYrEyYFsaP87CCLvh\nPAv5rv22AZNMkbodiC/Nc/V+az4wEEBHKP6kofJqc3888JxKDzhjVPJntOyq/2Ds\nY/Ovnrjtim219IKCuywBvlJkfxQudNxxy6UqTf5a9Ai6eXgx/tn9G5r40PM8/Mel\nKafstIMmFOXNgu5Qf7s27sc7zogHBr2SORqGqqVbDq+hr+GbudX0jODt7jX8Vkx6\nzwjFE+plAgMBAAECgf8vihCxWe3B9zph+DCl5khWxynU4lOR3VwiTsWRrAj6uiT5\nICk2mjPL+s83erGM46sH7TR/RQu0PUmqoWN5GqjkoDKQjEv0D5yhFlXYP9Iz/bIy\n88PyyhOWyJNTylS3UV9aM+6mD8HW1uBpZc0zzwhmcweQsNqUM7zWeUtTsO1wg9/Z\n9IJt8FSH4mC2X2U0L/brB7SanWFVFt3kDiAnCuOmumfvWPLcVAV5zvH/O8gsIT2l\n2HfQr96w8DhUFMudkb4fj51wYqSOsd9edwk4Ah8xyN3bi4dAXJ9MTWSAx4WlnsnF\nZSt4cXI3Gd72DeGWLKGO9N/tMlvKts1iO6XMeVECgYEAvseInpWHw2wjP6M6W45D\nlE1PVR1wRbmn/Z7Cp8RijeRyMn0NI12N2QQkMD/1RefuTzLMticuYNYCk0wuFgx2\ndG7ZldayRqSDVZvOdV0DzlTyY+L5rTV7YKcoTpqmxSczbFc8wBsaLOODikzyuZRE\nhGABW/6kPyBHvf83r40d0DkCgYEA6dqtGtSjUBkFbub/yU/1ys1Vz4KGsiJU0y9e\nB1bDCo3biNRimt6Crr6vMiFwWBcxVT11Ceq6IBq5kwBvlpSdsJxrTdb34fXwO2zu\nLjjE14KpT0tlA4gsh8yJ5Xx6Jrvd8RgZSTG34PmCRrTv1aRGsnvI3Lu0c4qHy9VG\nlZbUE40CgYAI3TJ+08nEDbExkr7yZBDFwjXOaZi+1Jp2kTrQGrLNjvCzYdYLb5xY\nmfWofEBEKDuNWHnkeLuR6j+iYma9xYR3cnMPoDMWTyx+/MdB8rlri8zbUT9yicqa\nugmIZW0cOe8MuJzs/BViQovpEBwy/S2VzPQjNxigijprHIGU2YSqGQKBgAMpV6nD\nMioFDJPBP7gDArmpKP3TL+r8l9T7EPRcceqUnGEvLd4WIAIoxcmRtikatyoF2K03\npSiF8/hOyzNn8vHOS40T2OoPHx5OjLHHRrH7LDrMNCNmFeQIGd0mX6hiZc+6mazp\npSi/dslp7MwgmmwTTFXfm8LsHoXc7kVbcqaJAoGAddKTlHLhiAhppNFLERiE3lqo\nNl9/P791nLfpTR3ZC6tjUrBj8TdSY3ZcbkMizkigGnoE4pLf17yagHxz+b7+QD3N\n7MyvCaMIHVtxDjE+IuhI/WvicvDTCvlk56hyt7VykVVfpacHtAQWiMXvgSMvTcvr\nzDgsNVJYBbbZTWoDHsc=\n-----END PRIVATE KEY-----\n",
    client_email: "53461032474-compute@developer.gserviceaccount.com",
    client_id: "107853068041480788495",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/53461032474-compute%40developer.gserviceaccount.com",
    universe_domain: "googleapis.com"
  }
});

// Nombre correcto del bucket
const bucketName = 'cliquealo'; // Cambiado de 'cliquealomx' a 'cliquealo'
const bucket = storage.bucket(bucketName);

module.exports = { bucket, storage };