import { NextRequest, NextResponse } from "next/server";

const GITHUB_GRAPHQL = "https://api.github.com/graphql";

type RepoContribution = {
  repository: { nameWithOwner: string; url: string };
  contributions: { totalCount: number };
};

type ResponseData = {
  totalCommitContributions: number;
  repos: Array<{
    nameWithOwner: string;
    url: string;
    totalCount: number;
  }>;
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username") || "rzkir";
    const from = searchParams.get("from"); // ISO date YYYY-MM-DD
    const to = searchParams.get("to");

    if (!from || !to) {
      return NextResponse.json(
        { error: "Missing from or to (YYYY-MM-DD)" },
        { status: 400 }
      );
    }

    const query = `
      query($username: String!, $from: DateTime!, $to: DateTime!) {
        user(login: $username) {
          contributionsCollection(from: $from, to: $to) {
            totalCommitContributions
            commitContributionsByRepository(maxRepositories: 100) {
              repository {
                nameWithOwner
                url
              }
              contributions {
                totalCount
              }
            }
          }
        }
      }
    `;

    const token = process.env.GITHUB_TOKEN;
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(GITHUB_GRAPHQL, {
      method: "POST",
      headers,
      body: JSON.stringify({
        query,
        variables: {
          username,
          from: `${from}T00:00:00Z`,
          to: `${to}T23:59:59Z`,
        },
      }),
      next: { revalidate: 3600 },
    });

    const json = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { error: json?.message || "GitHub API error" },
        { status: res.status }
      );
    }

    if (json.errors) {
      const msg = json.errors[0]?.message || "GraphQL error";
      return NextResponse.json({ error: msg }, { status: 400 });
    }

    const collection =
      json?.data?.user?.contributionsCollection;
    if (!collection) {
      return NextResponse.json(
        { totalCommitContributions: 0, repos: [] } satisfies ResponseData,
        { status: 200 }
      );
    }

    const repos = (
      (collection.commitContributionsByRepository || []) as RepoContribution[]
    ).map((r) => ({
      nameWithOwner: r.repository.nameWithOwner,
      url: r.repository.url,
      totalCount: r.contributions.totalCount,
    }));

    const data: ResponseData = {
      totalCommitContributions: collection.totalCommitContributions ?? 0,
      repos,
    };

    return NextResponse.json(data);
  } catch (e) {
    console.error("[github-contributions]", e);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
