import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

function pubEncrypt(toEncrypt, pathToPublicKey) {
  const absolutePath = path.resolve(pathToPublicKey);
  const publicKey = fs.readFileSync(absolutePath, 'utf8');
  const buffer = Buffer.from(toEncrypt, 'utf8');
  const encrypted = crypto.publicEncrypt(publicKey, buffer);
  return encrypted.toString('base64');
}

function privDecrypt(toDecrypt, pathtoPrivateKey) {
  const absolutePath = path.resolve(pathtoPrivateKey);
  const privateKey = fs.readFileSync(absolutePath, 'utf8');
  const buffer = Buffer.from(toDecrypt, 'base64');
  const decrypted = crypto.privateDecrypt(
    {
      key: privateKey.toString(),
      passphrase: '',
    },
    buffer
  );
  return decrypted.toString('utf8');
}

export { pubEncrypt, privDecrypt };
