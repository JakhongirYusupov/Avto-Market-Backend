import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs";

export function UploadFile(file) {
  const { filename, createReadStream } = file;
  const fileUrl = `${uuidv4()}${path.extname(filename)}`;
  const stream = createReadStream();
  const fileAddress = path.join(process.cwd(), "uploads", fileUrl);
  const out = fs.createWriteStream(fileAddress);
  stream.pipe(out);

  return fileUrl;
}
