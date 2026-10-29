# Gym Master CLI

`gymmaster` brings Gym Master AI and the Gym Master developer platform to your terminal.

- **Chat** with Gym Master AI on your real workspace data: type `gymmaster`.
- **Script it**: `gymmaster -p "question" --json`, stream with `--output-format stream-json`.
- **Developer tools**: call the API, AI tools, API keys, webhooks (`gymmaster webhooks listen --forward-to localhost:3000`), MCP setup for other assistants.

Documentation: https://developers.gymmaster.vn/docs/cli

## Install

macOS / Linux:

```bash
curl -fsSL https://developers.gymmaster.vn/install.sh | sh
```

Windows (PowerShell):

```powershell
irm https://developers.gymmaster.vn/install.ps1 | iex
```

Homebrew:

```bash
brew install nextx-organization/tap/gymmaster
```

npm (Node 20+):

```bash
npm install -g @gymmasterai/cli
```

## Quick start

```bash
gymmaster login          # browser, or --qr over SSH
gymmaster                # open the chat
gymmaster -p "members expiring this week"
gymmaster doctor
```

In CI, use an API key (`GYMMASTER_API_KEY`) or `gymmaster login --ci` with GitHub Actions OIDC.

## Security

Tokens are kept in the operating system keychain when available. Writes proposed by the assistant are never applied without your confirmation in an interactive terminal. Report vulnerabilities as described in [SECURITY.md](SECURITY.md).

## License

MIT
