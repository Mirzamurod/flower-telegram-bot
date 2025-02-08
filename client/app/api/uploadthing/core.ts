import { authOptions } from '@/lib/auth-options'
import { getServerSession } from 'next-auth'
import { createUploadthing, type FileRouter } from 'uploadthing/next'
import { UploadThingError } from 'uploadthing/server'

const f = createUploadthing()

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({
    image: {
      /**
       * For full list of options and defaults, see the File Route API reference
       * @see https://docs.uploadthing.com/file-routes#route-config
       */
      maxFileSize: '1MB',
      maxFileCount: 1,
    },
  })
    // Set permissions and file types for this FileRoute
    .middleware(async () => {
      const token = await getServerSession(authOptions)

      if (!token) throw new UploadThingError('Unauthorized')

      return { token }
    })
    // @ts-ignore
    .onUploadComplete(async ({ file }) => {
      return file
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
