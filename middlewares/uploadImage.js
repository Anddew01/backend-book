const multer = require('multer');

// กำหนดที่เก็บไฟล์รูปภาพ
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Middleware สำหรับการอัปโหลดรูปภาพ
exports.uploadImage = (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // กรณีเกิดข้อผิดพลาดจาก Multer
      return res.status(400).json({ error: 'เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ' });
    } else if (err) {
      // กรณีเกิดข้อผิดพลาดอื่น ๆ
      return res.status(500).json({ error: 'เกิดข้อผิดพลาดในระบบ' });
    }

    // ตรวจสอบว่ามีไฟล์ภาพถูกอัปโหลดมาหรือไม่
    if (!req.file) {
      return res.status(400).json({ error: 'กรุณาอัปโหลดรูปภาพ' });
    }

    // นำข้อมูลไฟล์ภาพไปยัง req.body.image เพื่อให้สามารถใช้ใน controller
    req.body.image = req.file;

    // ไปทำ middleware ถัดไป
    next();
  });
};
