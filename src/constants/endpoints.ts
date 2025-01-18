export const image_url = (path: string) => {
  if (path) {
    return "https://image.tmdb.org/t/p/w500/" + path;
  } else {
    return "../not-found.png    ";
  }
};

export const baseURL = "https://134.209.209.81:3000";
// export const baseURL = "https://dsh.kznhks.com";

export const endpoints = {
  get_withdraws: `${baseURL}/dashboard/withdraw-list`,
  create_withdraws: `${baseURL}/dashboard/withdraw`,
  login: `${baseURL}/auth/login`,
  get_withdraw_data: `${baseURL}/dashboard/usdt-balance-chains`,
};
