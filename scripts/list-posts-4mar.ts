import "dotenv/config";
import { getConfig, getPostizApiBase } from "../src/config.js";
import { createPostizClient } from "../src/postiz/client.js";

async function main() {
  const config = getConfig();
  const client = createPostizClient(getPostizApiBase(config), config.POSTIZ_API_KEY);
  const { posts } = await client.listPosts({
    startDate: "2026-03-04T00:00:00.000Z",
    endDate: "2026-03-04T23:59:59.999Z",
  });
  console.log(JSON.stringify(posts, null, 2));
}

main().catch((e) => { console.error(e); process.exit(1); });
