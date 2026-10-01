import type { Element, Root } from "hast";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { visit } from "unist-util-visit";
import { asset, isExternal } from "./paths";

// Raw HTML inside Markdown is dropped by remark-rehype (no allowDangerousHtml),
// so content files cannot inject scripts into the page.
function rehypeSiteLinks() {
  return (tree: Root) => {
    visit(tree, "element", (node: Element) => {
      if (node.tagName === "img" && typeof node.properties.src === "string") {
        node.properties.src = asset(node.properties.src);
        node.properties.loading = "lazy";
        node.properties.decoding = "async";
      }
      if (node.tagName === "a" && typeof node.properties.href === "string") {
        const href = node.properties.href;
        if (/^[a-z][a-z0-9+.-]*:/i.test(href) && !isExternal(href)) {
          delete node.properties.href; // javascript:, data:, etc.
        } else if (isExternal(href)) {
          if (href.startsWith("http") || href.startsWith("//")) {
            node.properties.target = "_blank";
            node.properties.rel = ["noopener", "noreferrer"];
          }
        } else {
          node.properties.href = asset(href);
        }
      }
    });
  };
}

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeSiteLinks)
  .use(rehypeStringify);

export function renderMarkdown(source: string): string {
  return String(processor.processSync(source));
}
