// Bảng mệnh ngũ hành theo Can Chi
export const canChiMenh = {
    Can: ['Canh', 'Tân', 'Nhâm', 'Quý', 'Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ'],
    Chi: ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'],
    Menh: {
        'Canh-Tý': 'Thổ', 'Tân-Sửu': 'Thổ', 'Nhâm-Dần': 'Kim', 'Quý-Mão': 'Kim',
        'Giáp-Thìn': 'Hỏa', 'Ất-Tỵ': 'Hỏa', 'Bính-Ngọ': 'Thủy', 'Đinh-Mùi': 'Thủy',
        'Mậu-Thân': 'Mộc', 'Kỷ-Dậu': 'Mộc', 'Canh-Tuất': 'Kim', 'Tân-Hợi': 'Kim',
        'Nhâm-Tý': 'Mộc', 'Quý-Sửu': 'Mộc', 'Giáp-Dần': 'Thủy', 'Ất-Mão': 'Thủy',
        'Bính-Thìn': 'Thổ', 'Đinh-Tỵ': 'Thổ', 'Mậu-Ngọ': 'Hỏa', 'Kỷ-Mùi': 'Hỏa',
        'Canh-Thân': 'Mộc', 'Tân-Dậu': 'Mộc', 'Nhâm-Tuất': 'Thủy', 'Quý-Hợi': 'Thủy',
        'Giáp-Tý': 'Kim', 'Ất-Sửu': 'Kim', 'Bính-Dần': 'Hỏa', 'Đinh-Mão': 'Hỏa',
        'Mậu-Thìn': 'Thổ', 'Kỷ-Tỵ': 'Thổ', 'Canh-Ngọ': 'Kim', 'Tân-Mùi': 'Kim',
        'Nhâm-Thân': 'Kim', 'Quý-Dậu': 'Kim', 'Giáp-Tuất': 'Hỏa', 'Ất-Hợi': 'Hỏa'
        // Bổ sung thêm các năm khác nếu cần
    }
};

// Gợi ý cá Koi và hồ theo mệnh
export const suggestionsByMenh = {
    'Kim': {
        fish: 'Cá Koi màu trắng, bạc, vàng kim',
        number: '4 hoặc 9 con',
        shape: 'Hình tròn hoặc bầu dục',
        direction: 'Hướng Tây hoặc Tây Bắc'
    },
    'Mộc': {
        fish: 'Cá Koi màu xanh lá cây hoặc đen',
        number: '3 hoặc 8 con',
        shape: 'Hình chữ nhật hoặc dài',
        direction: 'Hướng Đông hoặc Đông Nam'
    },
    'Thủy': {
        fish: 'Cá Koi màu đen, xanh dương',
        number: '1 hoặc 6 con',
        shape: 'Hình tròn hoặc cong uốn lượn',
        direction: 'Hướng Bắc'
    },
    'Hỏa': {
        fish: 'Cá Koi màu đỏ, cam',
        number: '2 hoặc 7 con',
        shape: 'Hình tam giác',
        direction: 'Hướng Nam'
    },
    'Thổ': {
        fish: 'Cá Koi màu vàng, nâu, cam đất',
        number: '5 hoặc 10 con',
        shape: 'Hình vuông',
        direction: 'Hướng Tây Nam hoặc Đông Bắc'
    }
};

// Hàm tính Thiên Can, Địa Chi và mệnh ngũ hành
export const getMenh = (year) => {
    const canIndex = year % 10;
    const chiIndex = year % 12;

    const can = canChiMenh.Can[canIndex];
    const chi = canChiMenh.Chi[chiIndex];
    const menh = canChiMenh.Menh[`${can}-${chi}`];

    return menh || 'Không xác định';
};
