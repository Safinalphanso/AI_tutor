// import llama3Tokenizer from "llama3-tokenizer-js";

export const cleanedText = (text: string) => {
  let newText = text
    .trim()
    .replace(/(\n){4,}/g, "\n\n\n")
    .replace(/\n\n/g, " ")
    .replace(/ {3,}/g, "  ")
    .replace(/\t/g, "")
    .replace(/\n+(\s*\n)*/g, "\n")
    .substring(0, 100000);

  // console.log(llama3Tokenizer.encode(newText).length);

  return newText;
};

export async function fetchWithTimeout(
  url: string,
  options = {},
  timeout = 3000,
) {
  // Create an AbortController
  const controller = new AbortController();
  const { signal } = controller;

  // Set a timeout to abort the fetch
  const fetchTimeout = setTimeout(() => {
    controller.abort();
  }, timeout);

  // Start the fetch request with the abort signal
  return fetch(url, { ...options, signal })
    .then((response) => {
      clearTimeout(fetchTimeout); // Clear the timeout if the fetch completes in time
      return response;
    })
    .catch((error) => {
      if (error.name === "AbortError") {
        throw new Error("Fetch request timed out");
      }
      throw error; // Re-throw other errors
    });
}

type suggestionType = {
  id: number;
  name: string;
  icon: string;
};

export const suggestions: suggestionType[] = [
  {
    id: 1,
    name: "Basketball",
    icon: "/basketball-new.svg",
  },
  {
    id: 2,
    name: "Machine Learning",
    icon: "/light-new.svg",
  },
  {
    id: 3,
    name: "Personal Finance",
    icon: "/finance.svg",
  },
  {
    id: 4,
    name: "U.S History",
    icon: "/us.svg",
  },
];

type AgeGroupType = "Elementary School" | "Middle School" | "High School" | "College";

export function getSystemPrompt(sources: string, ageGroup: string) {
  const ageGroupPrompts: Record<AgeGroupType, string> = {
    "Elementary School": `You are a friendly teacher explaining to elementary school students (ages 5-11). 
      Use simple words, short sentences, and fun examples. Avoid complex terminology. 
      Break down concepts into very basic parts. Use analogies that children can relate to.`,
    
    "Middle School": `You are a teacher explaining to middle school students (ages 11-14). 
      Use clear language and provide relevant examples. Introduce some basic technical terms but explain them carefully. 
      Connect concepts to things they might experience in daily life.`,
    
    "High School": `You are a teacher explaining to high school students (ages 14-18). 
      You can use more advanced terminology but still provide clear explanations. 
      Include more detailed examples and encourage critical thinking. 
      Make connections to their curriculum where possible.`,
    
    "College": `You are explaining to college-level students. 
      You can use technical terminology and complex concepts. 
      Provide in-depth explanations and encourage analytical thinking. 
      Include relevant academic context and theoretical frameworks.`
  };

  return `${ageGroupPrompts[ageGroup as AgeGroupType]}
    
    Use the following sources to answer the user's questions:
    ${sources}
    
    If you don't know something or can't find it in the sources, admit that you don't know.
    Always maintain the appropriate language level for ${ageGroup} students.`;
}
