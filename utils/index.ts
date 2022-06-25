interface ICookieInfo {
  userId: number;
  nickname: string;
  avatar: string;
}

// クッキーのセット
export const setCookie = (
  cookies: any,
  { userId, nickname, avatar }: ICookieInfo
) => {
  // ログインタイムアウト, 24h
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
  // クッキーアクセス許可path
  const path = '/';

  cookies.set('userId', userId, {
    path,
    expires,
  });
  cookies.set('nickname', nickname, {
    path,
    expires,
  });
  cookies.set('avatar', avatar, {
    path,
    expires,
  });
};

export const clearCookie = (cookies: any) => {
  // ログインタイムアウト, 24h
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
  // クッキーアクセス許可path
  const path = '/';

  cookies.set('userId', '', {
    path,
    expires,
  });
  cookies.set('nickname', '', {
    path,
    expires,
  });
  cookies.set('avatar', '', {
    path,
    expires,
  });
};
