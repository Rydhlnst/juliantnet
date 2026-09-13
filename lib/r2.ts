import { DeleteObjectCommand, HeadObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { createPresignedPost } from "@aws-sdk/s3-presigned-post"

const required = ["R2_ACCOUNT_ID", "R2_ACCESS_KEY_ID", "R2_SECRET_ACCESS_KEY", "R2_BUCKET", "R2_PUBLIC_URL"] as const
export function isR2Configured() { return required.every((key) => Boolean(process.env[key])) }
function client() { if (!isR2Configured()) throw new Error("R2 belum dikonfigurasi."); return new S3Client({ region: "auto", endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`, credentials: { accessKeyId: process.env.R2_ACCESS_KEY_ID!, secretAccessKey: process.env.R2_SECRET_ACCESS_KEY! } }) }
export async function createImageUpload(key: string, mimeType: string) { const upload = await createPresignedPost(client(), { Bucket: process.env.R2_BUCKET!, Key: key, Conditions: [["content-length-range", 1, 5 * 1024 * 1024], ["eq", "$Content-Type", mimeType]], Fields: { "Content-Type": mimeType }, Expires: 300 }); return upload }
export async function verifyObject(key: string) { return client().send(new HeadObjectCommand({ Bucket: process.env.R2_BUCKET!, Key: key })) }
export async function deleteObject(key: string) { return client().send(new DeleteObjectCommand({ Bucket: process.env.R2_BUCKET!, Key: key })) }
export function publicR2Url(key: string) { return `${process.env.R2_PUBLIC_URL!.replace(/\/$/, "")}/${key}` }
