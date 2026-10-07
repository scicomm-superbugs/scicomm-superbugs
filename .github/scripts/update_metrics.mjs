import { readFileSync, writeFileSync } from 'fs';

async function updateLiveMetrics() {
  const query = `{
    user(login: "scicomm-superbugs") {
      contributionsCollection {
        contributionCalendar {
          totalContributions
        }
      }
    }
  }`;

  const token = process.env.GITHUB_TOKEN;
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json",
      "User-Agent": "GitHub-Action"
    },
    body: JSON.stringify({ query })
  });

  const data = await res.json();
  const count = data?.data?.user?.contributionsCollection?.contributionCalendar?.totalContributions || 757;
  console.log("Live contributions count:", count);

  // Update badge SVG
  const message = `${count}+ CONTRIBUTIONS`;
  const msgWidth = message.length * 8.8 + 24;
  const labelWidth = 88;
  const totalWidth = Math.round(labelWidth + msgWidth);
  const msgCenter = labelWidth + (msgWidth / 2);

  const badgeSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="28" role="img" aria-label="GITHUB: ${message}">
  <title>GITHUB: ${message}</title>
  <g shape-rendering="crispEdges">
    <rect width="${labelWidth}" height="28" fill="#555"/>
    <rect x="${labelWidth}" width="${msgWidth}" height="28" fill="#4f46e5"/>
  </g>
  <g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" text-rendering="geometricPrecision" font-size="100">
    <image x="9" y="7" width="14" height="14" href="data:image/svg+xml;base64,PHN2ZyBmaWxsPSJ3aGl0ZSIgcm9sZT0iaW1nIiB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHRpdGxlPkdpdEh1YjwvdGl0bGU+PHBhdGggZD0iTTEyIC4yOTdjLTYuNjMgMC0xMiA1LjM3My0xMiAxMiAwIDUuMzAzIDMuNDM4IDkuOCA4LjIwNSAxMS4zODUuNi4xMTMuODItLjI1OC44Mi0uNTc3IDAtLjI4NS0uMDEtMS4wNC0uMDE1LTIuMDQtMy4zMzguNzI0LTQuMDQyLTEuNjEtNC4wNDItMS42MUM0LjQyMiAxOC4wNyAzLjYzMyAxNy43IDMuNjMzIDE3LjdjLTEuMDg3LS43NDQuMDg0LS43MjkuMDg0LS43MjkgMS4yMDUuMDg0IDEuODM4IDEuMjM2IDEuODM4IDEuMjM2IDEuMDcgMS44MzUgMi44MDkgMS4zMDUgMy40OTUuOTk4LjEwOC0uNzc2LjQxNy0xLjMwNS43Ni0xLjYwNS0yLjY2NS0uMy01LjQ2Ni0xLjMzMi01LjQ2Ni01LjkzIDAtMS4zMS40NjUtMi4zOCAxLjIzNS0zLjIyLS4xMzUtLjMwMy0uNTQtMS41MjMuMTA1LTMuMTc2IDAgMCAxLjAwNS0uMzIyIDMuMyAxLjIzLjk2LS4yNjcgMS45OC0uMzk5IDMtLjQwNSAxLjAyLjAwNiAyLjA0LjEzOCAzIC40MDUgMi4yOC0xLjU1MiAzLjI4NS0xLjIzIDMuMjg1LTEuMjMuNjQ1IDEuNjUzLjI0IDIuODczLjEyIDMuMTc2Ljc2NS44NCAxLjIzIDEuOTEgMS4yMyAzLjIyIDAgNC42MS0yLjgwNSA1LjYyNS01LjQ3NSA1LjkyLjQyLjM2LjgxIDEuMDk2LjgxIDIuMjIgMCAxLjYwNi0uMDE1IDIuODk2LS4wMTUgMy4yODYgMCAuMzE1LjIxLjY5LjgyNS41N0MyMC41NjUgMjIuMDkyIDI0IDE3LjU5MiAyNCAxMi4yOTdjMC02LjYyNy01LjM3My0xMi0xMi0xMiIvPjwvc3ZnPg=="/>
    <text transform="scale(.1)" x="522.5" y="175" textLength="465">GITHUB</text>
    <text transform="scale(.1)" x="${msgCenter * 10}" y="175" textLength="${(msgWidth - 20) * 10}" font-weight="bold">${message}</text>
  </g>
</svg>`;

  writeFileSync("assets/contributions-badge.svg", badgeSvg, "utf-8");

  // Update metrics.svg
  if (readFileSync("assets/metrics.svg", "utf-8")) {
    let m = readFileSync("assets/metrics.svg", "utf-8");
    m = m.replace(/<text[^>]*class="stat-hero"[^>]*>\d+\+<\/text>/g, `<text x="0" y="28" class="stat-hero">${count}+</text>`);
    writeFileSync("assets/metrics.svg", m, "utf-8");
  }
}

updateLiveMetrics();
