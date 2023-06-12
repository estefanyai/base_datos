import crypto from 'crypto';

const algorithm = 'aes-256-ctr';
const secretKey = 'vasebeyondthelimitsoftheuniverse';

export const encryptPassword = (password: string)=> {
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt).update(password).digest("base64");
    return salt + "$" + hash;
}

export const createConfirmationToken = (data: any) => {
    return generateTokenByData(data);
}

const generateTokenByData = (data: any) => {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    const dataAsString = typeof data === 'string' ? data : JSON.stringify(data);
    const encrypted = Buffer.concat([cipher.update(dataAsString), cipher.final()]);

    const finalToken = `iv:${iv.toString('hex')}content:${encrypted.toString('hex')}`;
    return finalToken;
}

export const decryptData = (token: any) =>{
    const iv = token.split(':')[1].split('content')[0];
    const content = token.split('content:')[1];
    const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(iv, 'hex'));
    const decrpyted = Buffer.concat([decipher.update(Buffer.from(content, 'hex')), decipher.final()]);
    return decrpyted.toString();
}

export const generatePasswordToken = (data: any) => {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);
    const finalToken = `${iv.toString('hex')}${encrypted.toString('hex')}`;
    return finalToken;
}
