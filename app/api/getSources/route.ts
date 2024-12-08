import { NextResponse } from "next/server";
import { z } from "zod";

let excludedSites = ["youtube.com"];
let searchEngine: "bing" | "serper" = "serper";

export async function POST(request: Request) {
  try {
    let { question } = await request.json();

    if (!question) {
      return NextResponse.json({ error: "Question is required" }, { status: 400 });
    }

    const finalQuestion = `what is ${question}`;

    if (searchEngine === "bing") {
      const BING_API_KEY = process.env["BING_API_KEY"];
      if (!BING_API_KEY) {
        return NextResponse.json({ error: "BING_API_KEY is required" }, { status: 500 });
      }

      const params = new URLSearchParams({
        q: `${finalQuestion} ${excludedSites.map((site) => `-site:${site}`).join(" ")}`,
        mkt: "en-US",
        count: "6",
        safeSearch: "Strict",
      });

      const response = await fetch(
        `https://api.bing.microsoft.com/v7.0/search?${params}`,
        {
          method: "GET",
          headers: {
            "Ocp-Apim-Subscription-Key": BING_API_KEY,
          },
        },
      );

      if (!response.ok) {
        return NextResponse.json({ error: "Bing API request failed" }, { status: response.status });
      }

      const BingJSONSchema = z.object({
        webPages: z.object({
          value: z.array(z.object({ name: z.string(), url: z.string() })),
        }),
      });

      const rawJSON = await response.json();
      
      try {
        const data = BingJSONSchema.parse(rawJSON);
        let results = data.webPages.value.map((result) => ({
          name: result.name,
          url: result.url,
        }));
        return NextResponse.json(results);
      } catch (error) {
        return NextResponse.json({ error: "Invalid response format from Bing API" }, { status: 500 });
      }

    } else if (searchEngine === "serper") {
      const SERPER_API_KEY = process.env["SERPER_API_KEY"];
      if (!SERPER_API_KEY) {
        return NextResponse.json({ error: "SERPER_API_KEY is required" }, { status: 500 });
      }

      const response = await fetch("https://google.serper.dev/search", {
        method: "POST",
        headers: {
          "X-API-KEY": SERPER_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          q: finalQuestion,
          num: 9,
        }),
      });

      if (!response.ok) {
        return NextResponse.json({ error: "Serper API request failed" }, { status: response.status });
      }

      const rawJSON = await response.json();

      const SerperJSONSchema = z.object({
        organic: z.array(z.object({ title: z.string(), link: z.string() })),
      });

      try {
        const data = SerperJSONSchema.parse(rawJSON);
        let results = data.organic.map((result) => ({
          name: result.title,
          url: result.link,
        }));
        return NextResponse.json(results);
      } catch (error) {
        return NextResponse.json({ error: "Invalid response format from Serper API" }, { status: 500 });
      }
    }

    return NextResponse.json({ error: "Invalid search engine specified" }, { status: 400 });

  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
