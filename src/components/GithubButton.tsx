'use client';

import GitHubButton from 'react-github-btn';

export function GithubButton() {
  return (
    <GitHubButton
      href="https://github.com/zdenham/scripts"
      data-size="large"
      data-show-count="true"
      aria-label="Star zdenham/scripts on GitHub"
    >
      Github
    </GitHubButton>
  );
}
