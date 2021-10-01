import sizeOf from 'image-size';
import url from 'url';
import https from 'https';

export default async function getImageSize(image: string) {
  return new Promise((resolve, reject) => {
    try {
      const options = url.parse(image);
      https.get(options, response => {
        const chunks = [];
        if(response.statusCode === 200) {
          return response.on('data', (chunk) => {
            chunks.push(chunk);
          }).on('end', () => {
            try {
              const buffer = Buffer.concat(chunks);
              return resolve(sizeOf(buffer));
            } catch (err) {
              // FIXME: fix the bug
              console.log(`${err.message} with ${image}`);
              return resolve(null);
            }
          });
        }
        else {
          return reject(new Error(`can't get ${image}`));
        }
      });
    } catch(err) {
      return reject(err);
    }
  });

}
