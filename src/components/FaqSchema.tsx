import type { Faq } from "@/sanity/types";

/**
 * FAQPage structured data for a list that is already on the page.
 *
 * Google stopped showing FAQ rich results in May 2026, so this earns no
 * expanded listing there. It is kept because Bing and the AI search tools
 * (ChatGPT, Copilot and Perplexity, which read Bing's index) still parse it,
 * and because it costs a few hundred bytes. It must only ever describe
 * questions that are visible on the same page.
 */
export function FaqSchema({ faqs }: { faqs: Faq[] }) {
  if (faqs.length === 0) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
