# Huldra Release Guidelines

## Introduction and Terminology

- A (pre-/regular/patch) release is only made when the code is “production-ready”
- The code is considered "production-ready" whenever it can also be shared publicly [in the public repo](https://github.com/simula/huldra)
- We adhere to [Semantic Versioning](https://semver.org/spec/v2.0.0.html), and use numeric values[^1] for all major, minor, patch, and pre-release identifiers

[^1]: We do not use "alpha", "beta", etc. strings in pre-release versions, and instead use numeric values after the hyphen

### Pre-Releases

- A "pre-release" can be used when a regular release is not ready (i.e., updates to the codebase are not necessarily aligned with planned milestones and associated issues)
- **Source branch:** pre-releases are made from `main`
- **Version tag:** pre-releases use version tags in `vX.Y.Z-T` format[^2]

[^2]: Releases are referred to in `[X.Y.Z(-T)] - yyyy-mm-dd` format in `CHANGELOG.md`, where `yyyy`, `mm`, and `dd` are the year, month, day of release respectively

### Regular Releases

- **Source branch:** regular releases are made from `main`.
- **Version tag:** regular releases use version tags in `vX.Y.Z` format[^2]

### Hotfix and Patch Releases

- **Source branch:** patch releases can be made from `dev` as well as `main` (changes do not need to be deployed in `main` at the time of release).
- **Version tag:** patch releases use version tags in `vX.Y.Z` format, where only `Z` should be updated compared to an **existing** tag `vX.Y.-`[^2]

## Checklist

1. [If applicable] Go through the PRs tagged with the milestone(s) associated with the release, make sure all are closed
2. [If applicable] Go through the issues tagged with the milestone(s) associated with the release, make sure all are closed
3. Check and update `VERSION.md`
4. Check and update `CHANGELOG.md`
5. Update internal notes on dependencies and/or installation and/or configuration if necessary
6. Check GitHub actions and see if all workflows are completed successfully (if any workflow fails, resolve the errors and push again)
7. Confirm that both local and cloud deployment works for the `dev` branch
8. [If source branch is `main`] Merge `dev` into `main`[^3]
9. Make the release from the source branch using an appropriate version tag
10. [If applicable] Close the relevant milestone
11. Inform the team about the new release

[^3]: You can use "squash and merge" to combine all commits into one

<!---- [If necessary] make further changes in `main`-->
<!---If necessary, leave out features-->
