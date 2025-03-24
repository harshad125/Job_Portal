


const constants = {
	logging: {
		logPrefix: '🚀 ChatApp',
		logLevel: 'debug',
		logLineSize: 256,
		logFileSize: '50m',
	},
	auth: {
		authorization: 'authorization',
		bearer: 'bearer',
	},
    jwt:{
        issuer: 'Chat-app',
		algorithm: 'RS256',
		sessionTokenExpiryInSecs:120, // 1 hour (for now)
		refreshTokenExpiryInSecs: 86400, // 3 days
		audience: {
			session: 'session-token',
			refresh: 'refresh-token',
		},
		publicKeyFile: 'jwt.public.key',
		privateKeyFile: 'jwt.private.key',
    }
}

export default constants;