
// --- CẤU HÌNH LINK TELEGRAM TẠI ĐÂY ---
const telegramLink = "https://t.me/cskh_hupcode";

// --- 1. Cấu hình Slider ---
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1, spaceBetween: 15, loop: true,
    autoplay: { delay: 2500, disableOnInteraction: false },
    breakpoints: {
        640: { slidesPerView: 2, spaceBetween: 20 },
        768: { slidesPerView: 3, spaceBetween: 25 },
        1024: { slidesPerView: 3, spaceBetween: 30 },
    },
});

// --- 2. Xử lý Popup ---
const btnCheck = document.querySelector('.btn-check');
const inputs = document.querySelectorAll('.input-wrapper input');
const customPopup = document.getElementById('customPopup');
const popupContent = document.getElementById('popupContent');
const closeCustomPopup = document.getElementById('closeCustomPopup');

// Hàm đóng popup
closeCustomPopup.addEventListener('click', () => {
    customPopup.style.display = 'none';
});

// Hàm hiển thị nội dung
function showPopupContent(html) {
    popupContent.innerHTML = html;
    customPopup.style.display = 'flex';
}

btnCheck.addEventListener('click', function () {
    const username = inputs[0].value.trim();
    const code = inputs[1].value.trim();

    if (!username || !code) {
        Swal.fire({
            icon: 'warning', title: 'Thiếu thông tin!',
            text: 'Vui lòng nhập Tên đăng nhập và Mã Code.',
            confirmButtonColor: '#3085d6',
        });
        return;
    }

    // BƯỚC 1: Loading
    showPopupContent(`
                <div class="loading-spinner"></div>
                <p style="margin-top: 15px; font-size: 18px; color: #fff;">Đang kiểm tra...</p>
                <p style="font-size: 14px; opacity: 0.8; color: #ddd;">Vui lòng chờ giây lát</p>
            `);

    // BƯỚC 2: Hiển thị kết quả sau 2 giây
    setTimeout(() => {
        if (code.toUpperCase() === '78WIN') {
            // --- TRƯỜNG HỢP: KHUYẾN MÃI KHÔNG KHẢ DỤNG (Yêu cầu qua Tele) ---
            showPopupContent(`
                        <h2 style="color: #FFFF00; margin-bottom: 15px; text-transform: uppercase; font-size: 22px; line-height: 1.2;">
                            Khuyến mãi không khả dụng!
                        </h2>
                        
                        <div style="text-align: left; display: inline-block; color: white; font-size: 15px; margin-bottom: 20px; background: rgba(0,0,0,0.3); padding: 10px; border-radius: 8px; width: 100%;">
                            <p style="margin-bottom: 5px;">👤 <b>Tên:</b> <span style="color: #f1c40f;">${username}</span></p>
                            <p style="margin-bottom: 5px;">🎟️ <b>Mã:</b> <span style="color: #f1c40f;">${code}</span></p>
                            <p style="line-height: 1.4;">⚠️ <b>Lý do:</b> Tài khoản đang được TL phê duyệt.</p>
                        </div>

                        <a href="${telegramLink}" target="_blank" style="text-decoration: none;">
                            <button class="btn-action" style="background: linear-gradient(to bottom, #2980b9, #0088cc); box-shadow: 0 4px 0 #005f8d; width: 100%;">
                                LIÊN HỆ TELEGRAM NGAY
                            </button>
                        </a>
                    `);
        } else {
            // --- TRƯỜNG HỢP: MÃ SAI ---
            showPopupContent(`
                        <h2 style="color: #ff4444; margin-bottom: 10px; text-transform: uppercase;">Rất tiếc!</h2>
                        <p style="color: white;">Mã code không tồn tại</p>
                        <p style="color: white; margin-bottom: 20px;">hoặc đã hết hạn.</p>
                        <button onclick="document.getElementById('customPopup').style.display='none'" class="btn-action error">
                            THỬ LẠI
                        </button>
                    `);
        }
    }, 2000);
});

