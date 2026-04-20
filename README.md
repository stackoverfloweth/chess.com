# Stackoverfloweth's Chess.com

This is [@stackoverfloweth](https://github.com/stackoverfloweth)'s solution to the [Chess.com](https://chess.com) front end programming challenge.

## Requirements

- [x] Create a page with a chessboard and a sidebar.
- [x] On desktop devices the sidebar should be positioned to the right of the chessboard.
- [x] On mobile devices the sidebar should be positioned below the chessboard.
- [x] The chessboard should resize to always fill available space both vertically and horizontally. It should always be fully visible in the viewport, down to a minimum size of 264x264px
- [x] Clicking a chessboard square should highlight the square. Multiple squares can appear as highlighted at once.
- [x] The sidebar should display a log of which squares have been clicked and the order in which they're clicked.
- [x] Clicking a highlighted square should un-highlight the square but not modify the sidebar. Re-highlighting the square again adds a new entry to the sidebar.
- [x] Include tests.

## Installation

this project uses [nvm](https://github.com/nvm-sh/nvm) to manage Node.js versions. Alternatively, set node to v24.14.0 in your shell.

```bash
nvm use
npm install
```

## Running the app

this project uses [Vite](https://vite.dev/) for development.

```bash
npm run dev
```

## Running the tests

this project uses [Vitest](https://vitest.dev/) for testing. It uses [Playwright](https://playwright.dev/) for browser testing.

```bash
npm run test
```

## Linting & formatting

this project uses [oxlint](https://github.com/oxlint/oxlint) for linting and [oxfmt](https://github.com/oxlint/oxfmt) for formatting.

```bash
npm run lint
npm run format
```

## Questions & Feedback

Please free to contact me, Evan Sutheland (<ev@nsuther.land>), with any questions or feedback.
