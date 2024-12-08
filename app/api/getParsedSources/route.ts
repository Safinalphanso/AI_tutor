import { Readability } from "@mozilla/readability";
import jsdom, { JSDOM } from "jsdom";
import { cleanedText, fetchWithTimeout } from "@/utils/utils";
import { NextResponse } from "next/server";

export const maxDuration = 30;

interface Source {
  name: string;
  url: string;
}

export async function POST(request: Request) {
  try {
    const { sources } = await request.json();
    
    if (!Array.isArray(sources)) {
      return NextResponse.json({ error: "Sources must be an array" }, { status: 400 });
    }

    console.log("[getAnswer] Fetching text from source URLS");
    let finalResults = await Promise.all(
      sources.map(async (result: Source) => {
        try {
          const response = await fetchWithTimeout(result.url);
          const html = await response.text();
          const virtualConsole = new jsdom.VirtualConsole();
          const dom = new JSDOM(html, { virtualConsole });

          const doc = dom.window.document;
          const parsed = new Readability(doc).parse();
          let parsedContent = parsed
            ? cleanedText(parsed.textContent)
            : "Nothing found";

          return {
            ...result,
            fullContent: parsedContent,
          };
        } catch (e) {
          console.log(`error parsing ${result.name}, error: ${e}`);
          return {
            ...result,
            fullContent: "not available",
          };
        }
      }),
    );

    return NextResponse.json(finalResults);
  } catch (error) {
    console.error("[getParsedSources] Error:", error);
    return NextResponse.json({ error: "Failed to parse sources" }, { status: 500 });
  }
}
