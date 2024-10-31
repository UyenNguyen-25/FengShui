import { canChiMenh } from "../constants/elements";

// Hàm tính Thiên Can, Địa Chi và mệnh ngũ hành
export const getMenh = (year) => {
    if (!year || isNaN(year)) return "Năm sinh không hợp lệ";
    const canIndex = year % 10;
    const chiIndex = year % 12;

    const can = canChiMenh.Can[canIndex];
    const chi = canChiMenh.Chi[chiIndex];

    const menh = canChiMenh.Menh[`${can} ${chi}`];

    return menh || 'Không xác định';
};
