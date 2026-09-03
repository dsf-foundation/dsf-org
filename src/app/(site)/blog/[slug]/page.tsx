import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IoArrowForward, IoArrowBack } from "react-icons/io5";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { RichContent } from "@/components/ui/rich-content";
import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import { getBlogPost, getAllBlogPosts, getAllBlogSlugs } from "@/lib/content";
import { FacebookIcon, WhatsappIcon } from "@/components/icons";
import { site } from "@/data/site";

export const revalidate = 300;

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  const allPosts = await getAllBlogPosts();
  const related = allPosts.filter((p) => p.slug !== slug).slice(0, 3);
  const shareUrl = `${site.url}/blog/${post.slug}`;

  return (
    <>
      <PageHero
        kicker={post.category}
        title={post.title}
        subtitle={post.summary}
        image={post.thumbnail}
      />

      {/* Article */}
      <section className="container-site section-pad">
        <div className="grid gap-12 lg:grid-cols-[1.7fr_1fr]">
          <article>
            {/* Featured image with caption */}
            <Reveal className="relative aspect-[16/9] overflow-hidden">
              <Image
                src={post.thumbnail}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="img-zoom object-cover"
              />
            </Reveal>

            {/* Summary */}
            <Reveal className="mt-9">
              <p className="text-xl leading-9 text-ink md:text-2xl md:leading-10">
                {post.summary}
              </p>
            </Reveal>

            {/* Rich body */}
            <div className="mt-9">
              <RichContent blocks={post.blocks} />
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="space-y-6">
              <Reveal className="border border-line bg-surface p-6">
                <h3 className="mb-4 text-base font-semibold text-ink">
                  Share this story
                </h3>
                <div className="flex items-center gap-3">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on Facebook"
                    className="flex h-11 w-11 items-center justify-center border border-line text-body transition hover:border-primary hover:text-primary"
                  >
                    <FacebookIcon className="h-4 w-4" />
                  </a>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(post.title + " " + shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on WhatsApp"
                    className="flex h-11 w-11 items-center justify-center border border-line text-body transition hover:border-primary hover:text-primary"
                  >
                    <WhatsappIcon className="h-4 w-4" />
                  </a>
                  <CopyButton
                    value={shareUrl}
                    label="Copy"
                    copiedLabel="Copied"
                    className="ml-auto"
                  />
                </div>
              </Reveal>

              <Reveal delay={80}>
                <div className="border border-line bg-primary-soft p-8">
                  <p className="text-xs font-bold text-primary">
                    Support this work
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-ink">
                    Let&apos;s make change together
                  </h3>
                  <p className="mb-6 mt-2 text-sm leading-6 text-body">
                    Your support reaches those who need it most — and is fully
                    accounted for.
                  </p>
                  <div className="space-y-3">
                    <Button href="/donate" variant="primary" className="w-full">
                      Donate
                      <IoArrowForward className="h-4 w-4" />
                    </Button>
                    <Button href="/get-involved" variant="ghost" className="w-full">
                      Get involved
                    </Button>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={120}>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:gap-3"
                >
                  <IoArrowBack className="h-4 w-4" />
                  All news
                </Link>
              </Reveal>
            </div>
          </aside>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-line bg-warm py-20 md:py-24">
          <div className="container-site">
            <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6">
              <div>
                <h2 className="display-md text-3xl text-ink">More from our news</h2>
              </div>
              <Button href="/blog" variant="ghost">
                All news
                <IoArrowForward className="h-4 w-4" />
              </Button>
            </Reveal>
            <div className="grid gap-8 lg:grid-cols-3">
              {related.map((post, i) => (
                <Reveal key={post.slug} delay={i * 90}>
                  <Link href={`/blog/${post.slug}`} className="group block">
                    <div className="img-zoom relative aspect-[3/2] overflow-hidden">
                      <Image
                        src={post.thumbnail}
                        alt={post.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="py-5">
                      <p className="mb-2 text-xs font-bold text-primary">
                        {post.category}
                      </p>
                      <h3 className="text-lg font-semibold leading-snug text-ink transition group-hover:text-primary">
                        {post.title}
                      </h3>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
