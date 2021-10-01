export const verifyToken = () => {

};



const ISSUER: string = process.env.ISSUER || 'Chnirt corp';
const AUDIENCE: string = process.env.AUDIENCE || 'http://chnirt.github.io';
const ACCESS_TOKEN: string = process.env.ACCESS_TOKEN || 'access-token';
const ACCESS_TOKEN_SECRET: string =
	process.env.ACCESS_TOKEN_SECRET || 'access-token-key';
const REFRESH_TOKEN: string = process.env.REFRESH_TOKEN || 'refresh-token';
const REFRESH_TOKEN_SECRET: string =
	process.env.REFRESH_TOKEN_SECRET || 'refresh-token-key';
const EMAIL_TOKEN: string = process.env.EMAIL_TOKEN || 'email-token';
const EMAIL_TOKEN_SECRET: string =
	process.env.EMAIL_TOKEN_SECRET || 'email-token-key';
const RESETPASS_TOKEN: string = process.env.RESETPASS_TOKEN || 'resetpass-token';
const RESETPASS_TOKEN_SECRET: string =
	process.env.RESETPASS_TOKEN_SECRET || 'resetpass-token-key';


type TokenType =
	| 'accessToken'
	| 'refreshToken'
	| 'emailToken'
	| 'resetPassToken'

const common = {
  accessToken: {
    privateKey: ACCESS_TOKEN_SECRET!,
    signOptions: {
      expiresIn: '15m' // 15m
    }
  },
  refreshToken: {
    privateKey: REFRESH_TOKEN_SECRET!,
    signOptions: {
      expiresIn: '7d' // 7d
    }
  },
  // createUser
  emailToken: {
    privateKey: EMAIL_TOKEN_SECRET!,
    signOptions: {
      expiresIn: '1d' // 1d
    }
  },
  // forgotPassword
  resetPassToken: {
    privateKey: RESETPASS_TOKEN_SECRET!,
    signOptions: {
      expiresIn: '1d' // 1d
    }
  }
};

