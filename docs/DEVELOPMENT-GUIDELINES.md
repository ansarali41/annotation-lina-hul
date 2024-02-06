# Huldra Development Guidelines

## General Information

### Software Repository

- In consistency with other Simula Metropolitan Center for Digital Engineering (SimulaMet) Department of Holistic Systems (HOST) internal repositories, we are currently using the name `huldra-internal` for the software repository, the codebase has no dependency on the name/address of the repository
- Those who have access to the repository and project board: members of the SimulaMet-HOST GitHub organization (admin access), Huldra master students (write access), and Huldra interns (write access)

### Documentation

- This repository includes a [README.md](../README.md) file, which refers to all other relevant documentation
- Format cheat sheets for all documentation can be found [here](https://help.github.com/en/github/writing-on-github/basic-writing-and-formatting-syntax) and [here](https://guides.github.com/features/mastering-markdown/)

## Development

### Issue Tracking

- We use the [Huldra Project Board](https://github.com/orgs/simulamet-host/projects/4/views/1) for issue tracking
- You can find the list of all labels [here](https://github.com/simulamet/host/huldra-internal/labels)
- We use [milestones](https://github.com/simulamet-host/huldra-internal/milestones) to associate all our issues with planned releases or completion dates

### Use of Branches

- We use the `dev` branch for development (protected branch: merge possible only after PR with at least 1 review)
- We use the `main` branch for releases (protected branch: merge possible only by selected users)
- We currently employ no staging or release candidate branch
- The development branch `dev` should always compile and pass all tests
- All development should begin in branches created from `dev`
- Feature branches should be named according to the issue or feature they target, e.g., `release-guidelines`, `bugfix/issue-123`, `new-feature/multiple-uuids`, `improvement/db-analysis`
- Regularly merge `dev` into your feature branch to avoid conflicts later on, especially if you take multiple days to complete your task
- Check the [full list of branches](https://github.com/simulamet-host/huldra-internal/branches/all) from time to time to delete unused/stale branches that you have created

### Code Syntax, Logging, Styling and Requirements

- This project uses [lint](<https://en.wikipedia.org/wiki/Lint_(software)>) for syntax and style checks on our codebase: we use [ESLint](https://eslint.org/) as the linter, [Prettier](https://prettier.io/) as the formatting tool, and [Husky](https://typicode.github.io/husky/) pre-commit hook
  - [Prettier](https://prettier.io/), the formatting tool, will format the code according to defined rules (all available [options](https://prettier.io/docs/en/options.html) for formatting rules are included in the configuration file `.prettierrc` in the root directory[^1])
  - [ESLint](https://eslint.org/), the linter, will identify, warn, and in some cases throw errors if any portion of the code goes against the defined rules (all available options for lint rules, including [general](https://eslint.org/docs/latest/rules/), as well as [specific](https://www.npmjs.com/package/eslint-plugin-react) for the plugin **eslint-plugin-react**, are included in the configuration file `.eslintrc.json` in the root directory[^2][^3])
  - [Husky](https://typicode.github.io/husky/) pre-commit hook will execute `eslint --fix .` and `prettier --write .` commands to format the staged files according to the styling configuration and lint them for any potential errors (in case of errors that cannot be fixed by the linter, the commit process will be terminated and the errors have to be fixed manually)
- It is possible to lint the code with the commands `npm run lint` and `npm run lint:fix`, and to format the code with the command `npm run format` anytime
- Try to resolve all warnings from the linter before you make a commit
- Document your code as well as possible, including inline comments as well as updates to existing documents if any
- Never commit code containing hardcoded credentials or confidential information to a remote branch

<!---
- All try-catch blocks should have accompanying log messages indicating the values assigned to critical variables, as well as exception messages (if any)
- Use the Huldra uniform logging framework as frequently as appropriate for your code
- Update requirements and guideline documents whenever your code introduces new dependencies
  -->

[^1]: Note that default values are used for some of the options
[^2]: Note that `indent` is an exception, and is not included in `.eslintrc.json`, as it might conflict with **Prettier**
[^3]: Note that default values are used, or the rule is inactive, for some of the options

### Testing

- All code should work for all multimedia modalities (image, video, audio, text), and all storage (local, cloud) and deployment (local, cloud) options
- As this project uses Create React App, we use the built-in Jest as the testing framework (see the documentation from [Create React App](https://create-react-app.dev/docs/running-tests) and [Jest](https://jestjs.io/docs/tutorial-react) for further details)
- We put test files in a `__tests__` folder in the same directory as the code they are testing, with the suffix `.test.js` (e.g., for `src/components/MyComponent.js`, we create `src/components/__tests__/MyComponent.test.js`)
  - The only exception is for `src/App.js`, which is tested in `src/App.test.js`
- Running tests:
  - Use `npm test -- --watchAll=false` to run all the tests once
  - If you run `npm test`[^4], Jest will launch in an interactive watch mode, and it will re-run the tests automatically every time you save a file - Note that by default it only runs the tests related to files that were changed since the last commit (this is the designed behavior of Jest and CRA) - In the interactive watch mode, you can press `a` to trigger all tests to run, and you can also press `p` to filter tests by filename
  <!---
  - All unit tests must pass on a feature branch before creating a PR towards `dev`
  - A Continuous Integration (CI) framework is being developed for the purpose of automated branch testing
    -->

[^4]: Note that `npm t`, `npm test`, and `npm run test` are equivalent commands

### Commits

- Commits should be as atomic as possible (i.e., make minimal changes per commit)
- Use common tense, e.g., [imperative mood](https://en.wikipedia.org/wiki/Imperative_mood) in all your commit messages
- You can commit freely in issue/feature branches as long as your proposed changes do not break the development branch when merged
- Never push breaking commits to `dev`

### Pull Requests

- All production-ready branches must be merged to the development branch with a pull request (PR)
- Make sure that your branch passes all tests before creating a PR
- Add a comment while creating the PR, summarizing all changes made by the branch (can be more detailed than the sum of commit messages)
- Assign at least one reviewer for every PR you open (confirm the availability of reviewers beforehand)
- If the PR is addressing a tracked issue, you can use keywords `fixes` or `closes` to associate it to the relevant issue (it is also possible to connect the PR with an existing issue using the GitHub web interface)
- Remind reviewers of the PR if they fail to provide a review in more than 2 days
- Merge the PR into the development branch as soon as you get an approval from all reviewers
- Close the branch associated with the PR after the PR is merged

### Reviews

- If you are assigned as a reviewer, try to provide your review within 2 days
- Provide an assesment of the code as diligently as possible, and feel free to ask for as many changes as necessary
- It is the responsibility of the developer who is making the PR to merge it into the development branch, however if you merge the PR, make sure to delete the associated branch afterwards (and inform the developer)

### Continuous Integration / Continuous Deployment

- See [GITHUB-ACTIONS.md](GITHUB-ACTIONS.md) for details

### Resolving Problems Post-Merge

- If you need to comment further on a merged and closed PR (with code comments referring to the diff), do so using the relevant PR page (even though the feature branch might not exist anymore, and the PR is merged and closed, this page is accessible under ["Closed"](https://github.com/simulamet-host/huldra-internal/pulls?q=is%3Apr+is%3Aclosed))
- Do not touch the merged PR and the (deleted) feature branch, keep them as they are
- Discuss potentially problematic (but merged and closed) PRs in GitHub/Discord, if the need for changes is agreed upon:
  - The corresponding issue should be reopened
  - The assignee of the issue should start working on the issue again, by starting a new feature branch from `dev`
  - When the assignee is ready, they should make a new PR towards `dev` from the new feature branch
- Never revert a merged and closed PR

### Security Vulnerabilities

- See `SECURITY-VULNERABILITIES.md` for details

### Versioning and Releases

- We use [software versioning](https://en.wikipedia.org/wiki/Software_versioning) on our releases
- All releases must include sufficient documentation
- See [RELEASE-GUIDELINES.md](RELEASE-GUIDELINES.md) for further details

## Additional Notes

- Never hesitate to contact other members of the Huldra team for questions, comments, and assistance!
