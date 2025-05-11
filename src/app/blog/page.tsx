// import { client } from "@/lib/microcms"
// import Link from "next/link"
// import { Card, CardContent } from "@/components/ui/card"
// import Image from "next/image"
// import dayjs from "dayjs"

// // microCMSの記事型
// type Blog = {
//   id: string
//   title: string
//   publishedAt: string
//   body: string
//   eyecatch?: {
//     url: string
//   }
//   category?: { 
//     name: string 
//   }
// }
// // microCMSから記事を取得
// async function getBlogPosts(): Promise<Blog[]> {
//   const data = await client.get({
//     endpoint: "blogs",
//     queries: {
//       fields: "id,title,publishedAt,eyecatch,body,category,content",
//       limit: 10,
//     },
//   })
//   return data.contents
// }

// export default async function BlogPage() {
//   const posts = await getBlogPosts();
//   console.log(posts);

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-8">Blog</h1>
//       <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//         {posts.map((post) => (
//           <Card key={post.id} className="overflow-hidden pt-0">
//               <div className="relative h-54 w-full">
//                 <Image
//                   src={post.eyecatch?.url??'/images/sample1.jpg'}
//                   alt={post.title}
//                   fill
//                   className="object-cover"
//                 />
//               </div>
//             <CardContent className="p-4 space-y-2">
//               <div className="text-xs text-gray-500">{dayjs(post.publishedAt).format("YYYY-MM-DD")}</div>
//               <Link href={`/blog/${post.id}`} className="text-lg font-semibold hover:underline line-clamp-2">
//                 {post.title}
//               </Link>
//               <div className="flex flex-wrap gap-1 text-xs mt-2">
//                 <span className="bg-gray-200 px-2 py-0.5 rounded-full text-gray-600">
//                   #{post.category.name}
//                 </span>
//               </div>
//               <p className="text-sm text-gray-700 line-clamp-3">{post.body}</p>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   )
// }
// app/blog/page.tsx
import { redirect } from "next/navigation";

export default function BlogRedirectPage() {
  redirect("/blog/page/1");
}