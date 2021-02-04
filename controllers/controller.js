const multer = require("multer");
const admZip = require("adm-zip");
const fs = require("fs");
const zip = async (req, res) => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "./media/zipUploads")
        },
        filename: (req, file, cb) => {
            const path = file.originalname.replace(/\./, `-${new Date().getTime().toString()}.`)
            cb(null, path)
        }
    });

    const upload = multer({ storage, limits: { fileSize: 1024 * 1024 * 50 } }).single("file");
    try {
        upload(req, res, async (err) => {
            if (err) {
                return res.send("Something went wrong!");
            }
            const zip = new admZip();
            const fd = req.file;
            zip.addLocalFile(fd.path);
            fs.unlinkSync(fd.path);
            var willSendthis = zip.toBuffer();
            fs.writeFileSync(`media/zipUploads/${fd.filename.split(".")[0] + ".zip"}`, willSendthis);
            res.send({ msg: "The file compressed successfully !", destination: `zipper/media/zipUploads/${fd.filename.split(".")[0] + ".zip"}` })
        })
    } catch (error) {
        res.send({ msg: "Something went wrong", error });
    }
}

const unZip = async (req, res) => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "./media/unzipUploads")
        },
        filename: (req, file, cb) => {
            const path = file.originalname.replace(/\./, `-${new Date().getTime().toString()}.`)
            cb(null, path)
        }
    });

    const upload = multer({ storage, limits: { fileSize: 1024 * 1024 * 50 } }).single("file");
    try {
        upload(req, res, async (err) => {
            if (err) {
                return res.send("Something went wrong!");
            }
            const zip = new admZip(req.file.path);
            const fd=req.file
            fs.unlinkSync(req.file.path);
            const fileName=zip.getEntries().toString();
            console.log("chchh",zip.getEntries()[0].entryName);
            zip.extractAllTo("./media/unzipUploads",true);
            res.send({ msg: "The file compressed successfully !",destination:`zipper/media/unzipUploads/${zip.getEntries()[0].entryName}` })
        })
    } catch (error) {
        res.send({ msg: "Something went wrong", error });
    }
}

module.exports = {
    zip,
    unZip
}
