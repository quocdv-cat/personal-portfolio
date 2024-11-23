document.addEventListener('DOMContentLoaded', function() {
    // Lấy ngày hiện tại
    const today = new Date().toDateString();
    
    // Kiểm tra và khởi tạo localStorage nếu chưa có
    if (!localStorage.getItem('visitorStats')) {
        localStorage.setItem('visitorStats', JSON.stringify({
            totalCount: 0,
            dailyCount: 0,
            lastVisit: today
        }));
    }

    let stats = JSON.parse(localStorage.getItem('visitorStats'));

    // Reset daily count nếu là ngày mới
    if (stats.lastVisit !== today) {
        stats.dailyCount = 0;
        stats.lastVisit = today;
    }

    // Tăng số lượt truy cập
    stats.dailyCount++;
    stats.totalCount++;

    // Cập nhật localStorage
    localStorage.setItem('visitorStats', JSON.stringify(stats));

    // Hiển thị số liệu
    document.getElementById('today-count').textContent = stats.dailyCount;
    document.getElementById('total-count').textContent = stats.totalCount;
}); 