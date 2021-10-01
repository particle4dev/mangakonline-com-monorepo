export default function getFilename(url: string) {
  return url.substring(url.lastIndexOf('/') + 1).replace(/\.[^/.]+$/, "");
}
