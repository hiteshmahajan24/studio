
'use client';

import { useParams } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader } from '@/components/ui/card';
import { allUsers, mockArticles } from '@/lib/mock-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Calendar, Clock } from 'lucide-react';
import Image from 'next/image';
import { ArticleImageSlider } from '@/components/articles/article-image-slider';

export default function ArticlePage() {
  const params = useParams();
  const articleId = params.articleId as string;
  const article = mockArticles.find((a) => a.id === articleId);

  if (!article) {
    return <div className="text-center py-10">Article not found.</div>;
  }

  const articleImage = PlaceHolderImages.find((img) => img.id === article.imageId);
  const author = allUsers.find(user => user.id === article.authorId);
  const authorAvatar = PlaceHolderImages.find(img => img.id === author?.avatarId);

  const sliderImages = [
    PlaceHolderImages.find(img => img.id === "article-content-1"),
    PlaceHolderImages.find(img => img.id === "article-content-2"),
    PlaceHolderImages.find(img => img.id === "article-content-3"),
  ].filter(Boolean);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card className="overflow-hidden">
        <div className="h-64 w-full relative">
            {articleImage && (
                 <Image
                    src={articleImage.imageUrl}
                    alt={article.title}
                    data-ai-hint={articleImage.imageHint}
                    fill
                    className="object-cover"
                />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        </div>
        <CardHeader className="relative -mt-20 z-10 p-6 flex-col items-start text-white">
            <div className="flex flex-wrap gap-2 mb-2">
                {article.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="bg-white/20 text-white border-none">{tag}</Badge>
                ))}
            </div>
            <CardTitle className="text-4xl font-bold">{article.title}</CardTitle>
            <div className="flex items-center gap-6 text-sm mt-4">
                 {author && (
                    <div className='flex items-center gap-3'>
                        <Avatar className='w-10 h-10 border-2 border-white/50'>
                            {authorAvatar && <AvatarImage src={authorAvatar.imageUrl} alt={author.name} data-ai-hint={authorAvatar.imageHint} />}
                            <AvatarFallback>{author.name.slice(0,2)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className='font-semibold'>{author.name}</p>
                            <p className='text-xs text-white/80'>{author.title}</p>
                        </div>
                    </div>
                )}
                <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>2 days ago</span>
                </div>
                <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{article.readTime} min read</span>
                </div>
            </div>
        </CardHeader>
      </Card>
      
      <article className="prose dark:prose-invert max-w-none text-foreground/90 prose-headings:text-foreground">
        <p>
            The world of web development is in a constant state of flux, with new tools, frameworks, and paradigms emerging at a breathtaking pace. One of the most significant shifts in recent years has been the evolution of component architectures, particularly within the React ecosystem. For a long time, client-side rendering (CSR) was the undisputed king, but the pendulum is swinging back towards the server, bringing with it powerful new capabilities.
        </p>

        {sliderImages.length > 0 && (
             <div className="my-8 rounded-lg overflow-hidden">
                <ArticleImageSlider images={sliderImages as any} />
            </div>
        )}
        
        <h2>The Old Way: Client-Side Everything</h2>
        <p>
            In a traditional Create React App (CRA) setup, the server's job was minimal: send a nearly empty HTML file and a massive JavaScript bundle. The browser would then execute this JavaScript, build the entire component tree, fetch data, and render the page. This approach gave us highly interactive, app-like experiences but came with significant trade-offs, including slow initial load times (Time to Interactive), poor SEO performance, and the need to expose API endpoints for data fetching.
        </p>
        
        <h2>Enter Server Components</h2>
        <p>
            React Server Components (RSCs), pioneered by Next.js, flip this model on its head. RSCs run exclusively on the server. They can directly access server-side resources like databases or file systems without needing an API layer. They render to an intermediate, serializable format that is streamed to the client, where it's efficiently merged with Client Components to create the final UI.
        </p>

        <blockquote>
            This means less JavaScript is sent to the client, resulting in faster load times and a better user experience, especially on slower networks or less powerful devices.
        </blockquote>

        <h2>Key Benefits of Server Components</h2>
        <ul>
            <li><strong>Zero Bundle Size:</strong> Server Components add zero kilobytes to your client-side JavaScript bundle. This is their superpower.</li>
            <li><strong>Direct Data Access:</strong> Fetch data directly within your component, simplifying your architecture and improving security by keeping sensitive logic and tokens on the server.</li>
            <li><strong>Improved Performance:</strong> By offloading rendering work to the server, you reduce the amount of work the client's device has to do, leading to a much faster Time to Interactive.</li>
            <li><strong>Seamless Integration:</strong> Server and Client Components can be seamlessly interleaved, allowing you to choose the best rendering environment for each part of your application.</li>
        </ul>

        <h2>When to Use Server vs. Client Components</h2>
        <p>
            The new default in the Next.js App Router is Server Components. You should only opt into Client Components (by adding the `'use client'` directive) when you need to use hooks like `useState`, `useEffect`, or handle browser events like `onClick`.
        </p>
      </article>

    </div>
  );
}
