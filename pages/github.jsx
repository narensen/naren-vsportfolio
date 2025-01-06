import React from 'react';
import Image from 'next/image';
import GitHubCalendar from 'react-github-calendar';

const GithubPage = ({ repos, user, error }) => {
  const theme = {
    level0: '#161B22',
    level1: '#0e4429',
    level2: '#006d32',
    level3: '#26a641',
    level4: '#39d353',
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <h2 className="text-red-700 text-lg font-semibold mb-2">Error Loading GitHub Data</h2>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 px-4">
      {/* Profile Header */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-4 mb-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative" style={{ width: '60px', height: '60px' }}>
              <Image
                src={user.avatar_url}
                alt={user.login}
                width={60}
                height={60}
                className="rounded-full"
                priority
                unoptimized
              />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">{user.name || user.login}</h1>
              <p className="text-sm text-gray-600">@{user.login}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-center">
              <p className="text-base font-semibold text-gray-900">{user.public_repos}</p>
              <p className="text-xs text-gray-600">Repos</p>
            </div>
            <div className="text-center">
              <p className="text-base font-semibold text-gray-900">{user.followers}</p>
              <p className="text-xs text-gray-600">Followers</p>
            </div>
            <div className="text-center">
              <p className="text-base font-semibold text-gray-900">{user.following}</p>
              <p className="text-xs text-gray-600">Following</p>
            </div>
          </div>
        </div>
      </div>

      {/* Top Repositories */}
      <div className="max-w-4xl mx-auto mb-4">
        <h2 className="text-base font-semibold text-gray-900 mb-2">Top Repositories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {repos.map((repo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white rounded-lg shadow-sm p-3 hover:shadow-md transition-shadow"
            >
              <h3 className="text-sm font-semibold text-gray-900 mb-1">{repo.name}</h3>
              <p className="text-xs text-gray-600 mb-2 line-clamp-2">{repo.description}</p>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-xs text-gray-600">{repo.stargazers_count}</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-3 h-3 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs text-gray-600">{repo.forks_count}</span>
                </div>
                {repo.language && (
                  <span className="text-xs text-gray-500">{repo.language}</span>
                )}
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Contributions Calendar */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-4">
        <h2 className="text-base font-semibold text-gray-900 mb-2">Contributions</h2>
        <div className="overflow-x-auto">
          <GitHubCalendar
            username={user.login}
            theme={theme}
            hideColorLegend
            hideMonthLabels
            blockSize={8}
            blockMargin={3}
            fontSize={12}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const username = 'narensen'; // Replace with your GitHub username

  try {
    const userRes = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `token ${process.env.GITHUB_API_KEY}`
      },
    });

    if (!userRes.ok) {
      const errorData = await userRes.json();
      console.error('User API Error:', {
        status: userRes.status,
        statusText: userRes.statusText,
        error: errorData
      });
      return {
        props: {
          error: `Failed to fetch user data: ${userRes.status} ${userRes.statusText}`
        }
      };
    }

    const user = await userRes.json();

    const repoRes = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
      {
        headers: {
          Authorization: `token ${process.env.GITHUB_API_KEY}`
        },
      }
    );

    if (!repoRes.ok) {
      const errorData = await repoRes.json();
      console.error('Repos API Error:', {
        status: repoRes.status,
        statusText: repoRes.statusText,
        error: errorData
      });
      return {
        props: {
          error: `Failed to fetch repositories: ${repoRes.status} ${repoRes.statusText}`
        }
      };
    }

    let repos = await repoRes.json();
    repos = repos
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 6);

    return {
      props: {
        title: 'GitHub',
        repos,
        user,
      },
      revalidate: 10,
    };
  } catch (error) {
    console.error('Failed to fetch GitHub data:', error);
    return {
      props: {
        error: 'Failed to fetch GitHub data. Please try again later.'
      }
    };
  }
}

export default GithubPage;
