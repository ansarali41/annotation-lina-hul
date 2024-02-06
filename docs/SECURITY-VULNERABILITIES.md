# Huldra Security Vulnerability Management

This Github repository uses [Dependabot](https://github.com/dependabot) for resolving potential security vulnerabilities in the node packages that are being used. If a vulnerability is detected, Dependabot will automatically look for a patched version and create a Pull Request (PR) accordingly. In the PR, Dependabot will try to resolve any conflict that might arise while merging.

Once Dependabot creates a PR, developers are advised to: 
- Read the release notes of the particular package 
- Check if any breaking changes are introduced 
- Checkout the branch to a local environment, and thoroughly check if everything is working correctly (with special care if any major version changes are suggested)

To enable/disable [Dependabot security updates](https://docs.github.com/en/code-security/dependabot/dependabot-security-updates/about-dependabot-security-updates): 
- Go to repository "Settings"
- Click "Code security and analysis"
- Enable/disable "Dependabot security updates"

Alternatively:
- Go to repository "Security"
- Click "Dependabot"
- Click "Configure" and select "Manage repository vulnerability settings" from the dropdown menu
- Enable/disable "Dependabot security updates"
