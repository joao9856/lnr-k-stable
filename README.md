# Personal LNReader Kavita plugin - stable chapter IDs

This is a personal test build of the LNReader Kavita plugin.

## What it changes

- Keeps the existing Kavita plugin ID: `kavita-api`
- Version `0.0.9`
- Does NOT use Kavita's transient Book ID as the LNReader chapter identity.
- Uses a stable key derived from series + book identity + page number.
- Resolves that stable chapter back to the current Kavita Book ID when downloading.
- Keeps backward compatibility with old `bookId:page` chapter paths.
- Chapter display names use the Kavita TOC title instead of the old `1 / N - Book - Chapter` format.

## Install as a personal repo

1. Create a GitHub repository and upload the files in this repository to its root.
2. Replace `YOUR-GITHUB-USERNAME` and `YOUR-REPO` in both `plugins.json` and `plugins.min.json`.
3. In LNReader: Settings -> Repos -> Add repository.
4. Add:
   `https://raw.githubusercontent.com/YOUR-GITHUB-USERNAME/YOUR-REPO/main/plugins.min.json`
5. Refresh sources and enable the `Multi` language/source group.
6. Install/update the Kavita plugin.

## Test

Use a disposable test novel. Start with the 183-chapter version, download a few chapters, then update the monolithic EPUB to 185 chapters in Kavita and refresh LNReader.

Expected: the original 183 chapters keep their identities and only the 2 new chapters appear as new.

Back up LNReader data before testing.
