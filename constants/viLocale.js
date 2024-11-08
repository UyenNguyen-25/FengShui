export const vietnameseMonths = [
  "Tháng 1",
  "Tháng 2",
  "Tháng 3",
  "Tháng 4",
  "Tháng 5",
  "Tháng 6",
  "Tháng 7",
  "Tháng 8",
  "Tháng 9",
  "Tháng 10",
  "Tháng 11",
  "Tháng 12",
];

export const vietnameseDays = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

export const viElement = {
  fire: "Hỏa",
  water: "Nước",
  wood: "Mộc",
  earth: "Thổ",
  metal: "Kim",
};

export const viGender = {
  1: "Nam",
  2: "Nữ",
  0: "Khác",
};

export const viPondShape = {
  rectangle: "Hình chữ nhật",
  round: "Hình tròn",
  triangle: "Hình tam giác",
  square: "Hình vuông",
  oval: "Hình bầu dục",
};

export const viPondDirection = {
  North: "Bắc",
  Northeast: "Đông Bắc",
  Northwest: "Tây Bắc",
  South: "Nam",
  Southeast: "Đông Nam",
  Southwest: "Tây Nam",
  West: "Tây",
  East: "Đông",
  Center: "Trung tâm",
};

export const viOrigin = {
  Japan: "Nhật Bản",
  China: "Trung Quốc",
  Vietnam: "Việt Nam",
};

export const viColors = {
  white: "trắng",
  silver: "bạc",
  black: "đen",
  yellow: "vàng",
  red: "đỏ",
  purple: "tím",
  green: "xanh lá",
  blue: "xanh dương",
  brown: "nâu",
  gray: "xám",
};

export const viTranslation = {
  ...viElement,
  ...viTranslation,
  ...viPondDirection,
  ...viPondShape,
  ...viColors,
  ...viOrigin,
  ...viGender,
};

export const translate = (array) => {
  if (Array.isArray(array)) {
    let translateArray = [];
    return (translateArray = array.map((item) => [
      ...translateArray,
      viTranslation[item],
    ]));
  }
  return viTranslation[array];
};

export const joinArray = (array) => {
  return array?.join(", ");
};
