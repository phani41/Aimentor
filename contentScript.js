(() => {
  const host = window.location.hostname;
  let title = "";
  let description = "";

  // 🟦 LeetCode
  if (host.includes("leetcode.com")) {
    title = document.querySelector("h1")?.innerText || "";
    description =
      document.querySelector(".content__u3I1")?.innerText ||
      document.querySelector("[data-track-load='description_content']")?.innerText ||
      "";
  }

  // 🟩 GeeksforGeeks
  else if (host.includes("geeksforgeeks.org")) {
    title =
      document.querySelector("h1")?.innerText ||
      document.querySelector(".problem-title")?.innerText ||
      "";
    description =
      document.querySelector(".problem-statement")?.innerText ||
      document.querySelector("article")?.innerText ||
      "";
  }

  // 🟨 Codeforces
  else if (host.includes("codeforces.com")) {
    title = document.querySelector(".title")?.innerText || "";
    description = document.querySelector(".problem-statement")?.innerText || "";
  }

  // 🟧 HackerRank
  else if (host.includes("hackerrank.com")) {
    title =
      document.querySelector(".challenge-view h1")?.innerText ||
      document.querySelector(".ui-icon-label")?.innerText ||
      "";
    description =
      document.querySelector(".challenge-body")?.innerText ||
      document.querySelector(".problem-statement")?.innerText ||
      "";
  }

  // 🟪 Generic fallback — for any unknown platform
  else {
    title = document.title || "Untitled Problem";
    const mainContent =
      document.querySelector("main")?.innerText ||
      document.querySelector("article")?.innerText ||
      document.body.innerText.slice(0, 1500); // limit to avoid overload
    const codeBlocks = Array.from(document.querySelectorAll("pre, code"))
      .map((el) => el.innerText)
      .join("\n");
    description = `${mainContent}\n\n${codeBlocks}`;
  }

  // Save detected problem info
  if (title || description) {
    chrome.storage.local.set({
      detectedProblem: {
        title,
        description,
        site: host,
      },
    });
  }
})();
