import { HUB_BASE_URL } from "@lib/hub-url";

/** Discord drops component-embed payloads larger than this (in bytes). */
const MAX_PAYLOAD_BYTES = 3000;

const ACCENT_COLOR = 0x4f46e5;

/**
 * JSON for Discord's `discord:component-embed` script tag: a container with
 * text and three link buttons. Throws if the payload exceeds Discord's size cap
 * so an oversize embed can't ship silently.
 */
export function buildDiscordComponentEmbed(siteCount: number): string {
  const hub = HUB_BASE_URL;
  const noun = siteCount === 1 ? "site" : "sites";
  const discordInviteUrl = "https://discord.gg/mtmBNsjdeK";

  const payload = {
    component: {
      type: 17,
      accent_color: ACCENT_COLOR,
      components: [
        {
          type: 10,
          content: `# Web dev & web design webring\nDiscover personal and studio sites focused on web development and web design.\n-# ${siteCount} ${noun} in the ring`,
        },
        {
          type: 1,
          components: [
            { type: 2, style: 5, label: "View webring", url: `${hub}/` },
            {
              type: 2,
              style: 5,
              label: "View random site",
              url: `${hub}/visit-random`,
            },
            {
              type: 2,
              style: 5,
              label: "Join Discord",
              url: discordInviteUrl,
            },
          ],
        },
      ],
    },
  };

  // Escape "<" so the JSON can't close the surrounding <script> tag. Escape
  // sequences count toward Discord's limit at full length, so measure after.
  const json = JSON.stringify(payload).replace(/</g, "\\u003c");
  const bytes = new TextEncoder().encode(json).length;
  if (bytes > MAX_PAYLOAD_BYTES) {
    throw new Error(
      `Discord component embed is ${bytes} bytes; limit is ${MAX_PAYLOAD_BYTES}.`,
    );
  }
  return json;
}
