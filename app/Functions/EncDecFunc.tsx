import archiver from 'archiver';
import crypto from 'crypto';
import { decrypt, encrypt } from 'edcrypt';
import {
  createReadStream,
  createWriteStream,
  readFileSync,
  unlinkSync,
} from 'fs';
import unzipper from 'unzipper';
import { privDecrypt, pubEncrypt } from './EncDec';

import { myRef } from '../components/DialogBox/DialogBox';

const encryption = (filePath: string, fileName: string) => {
  const output = createWriteStream(
    `${filePath.slice(0, filePath.lastIndexOf('/'))}/encrypted-${fileName}`
  );
  const archive = archiver('zip', { zlib: { level: 9 } });
  const passphrase = crypto.randomBytes(16).toString('hex');
  const encPasspharse = pubEncrypt(
    passphrase,
    `${localStorage.getItem('publicLocation')}`
  );
  const zip = `${filePath}.enc`;

  encrypt({ file: filePath, password: passphrase });
  archive.pipe(output);
  archive.append(encPasspharse, { name: `${fileName}.pass` });

  setTimeout(() => {
    try {
      archive.append(createReadStream(zip), {
        name: `decrypted-${fileName}.enc`,
      });
      archive.finalize();
      unlinkSync(zip);
    } catch (error) {
      myRef.current.click();
      console.error(error);
    }
  }, 2000);
};

const decryption = (filePath: string) => {
  createReadStream(filePath).pipe(
    unzipper.Extract({
      path: `${filePath.slice(0, filePath.lastIndexOf('/'))}`,
    })
  );
  setTimeout(() => {
    try {
      const encFile = readFileSync(
        `${filePath.replace('encrypted-', '')}.pass`,
        {
          encoding: 'utf8',
        }
      );
      const rsaPassphrase = privDecrypt(
        encFile,
        localStorage.getItem('privateLocation')
      );
      decrypt({
        file: `${filePath.replace('encrypted', 'decrypted')}.enc`,
        password: rsaPassphrase,
      });
      unlinkSync(`${filePath.replace('encrypted-', '')}.pass`);
      setTimeout(() => {
        unlinkSync(`${filePath.replace('encrypted-', 'decrypted-')}.enc`);
      }, 500);
    } catch (error) {
      myRef.current.click();
      console.error(error);
    }
  }, 2000);
};

export { encryption, decryption };
