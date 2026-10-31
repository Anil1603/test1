# Salesforce  - Test Automation

End‑to‑end test automation framework for **Salesforce Lead Management** using **Playwright + TypeScript** built on the **Page Object Model (POM)** and enhanced with **AI-Driven Automation Agents**.

**Highlights**
- **Salesforce-Specific**: Optimized for Salesforce Lightning UI, Shadow DOM, and complex picklist interactions.
- **AI-Powered**: Integrates AI agents for story review, test planning, DOM analysis, and test healing.
- **Dual POM Structure**: Supports both legacy (`pages/`) and modern (`tests/pages/`) page object implementations.
- **Data-Driven**: Centralized JSON-based locators and environment-specific test data.
- **Surgical Refinement**: AI-driven refactor and maintenance agents for stable, high-quality code.
- **CI/CD Integrated**: Automated validation via GitHub Actions workflows.

---

## Table of Contents
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [AI-Driven Automation](#ai-driven-automation)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Page Object Model](#page-object-model)
- [Locators & Test Data](#locators--test-data-json)
- [Fixtures & Hooks](#fixtures--hooks)
- [Running Tests](#running-tests)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## Tech Stack
- **Playwright** v1.58.2 (Test Runner + Browser automation)
- **TypeScript** (Language)
- **Salesforce** (Target Platform)
- **Node.js** (>= 18.x), **npm** (>= 9.x)
- **dotenv** (Environment management)

---

## Folder Structure
```text
.
├─ .github/                              # AI-Driven Automation Layer
│  ├─ agents/                            # Task-specific AI agents (Planner, Generator, etc.)
│  ├─ instructions/                      # Domain rules (Salesforce, Lightning, etc.)
│  ├─ skills/                            # Testing toolkits (API, E2E, Visual)
│  └─ hooks/                             # Agent lifecycle scripts
│
├─ tests/                                # Modern Automation Structure
│  ├─ specs/                             # Test specifications (SF-XX_story.spec.ts)
│  ├─ data/                              # Story-specific test data
│  ├─ pages/                             # Page objects with self-healing locators
│  └─ handlers/                          # Complex workflow handlers
│
├─ pages/                                # Legacy Page Objects
├─ utils/                                # Core Utilities
│  ├─ base/                              # playWrightBase and common methods
│  ├─ fixtures/                          # Custom Playwright fixtures
│  ├─ pageLocators/                      # JSON selector stores
│  └─ testData/                          # Scenario-based test data
│
├─ confluence-pages/                     # Business context and documentation
├─ dom-analysis/                         # AI exploration results and snapshots
├─ user-stories/                         # INVEST-reviewed user stories
├─ test-cases/                           # Documented test scenarios
│
├─ playwright.config.ts                  # Framework configuration
├─ package.json                          # Dependencies and project metadata
└─ README.md
```

---

## AI-Driven Automation

This framework utilizes a specialized AI-driven layer located in the `.github/` directory to accelerate the development of stable, high-coverage tests.

### Specialized Agents (`.github/agents/`)
- **Reviewer Agent**: Analyzes user stories for INVEST criteria and QA testability.
- **Planner Agent**: Generates comprehensive test plans and executable test steps.
- **Explorer Agent (Salesforce)**: Performs Salesforce-optimized DOM analysis, traversing Shadow DOM and Lightning components.
- **Generator Agent**: Produces Page Objects, Handlers, Specs, and Test Data based on exploration snapshots.
- **Healer Agent**: Automatically debugs and repairs failing Playwright tests.
- **Refactor Agent**: Transforms legacy or brittle tests into production-quality automation.

### Testing Skills (`.github/skills/`)
Pre-defined playbooks and toolkits for various testing disciplines:
- **E2E Testing**: User flow, navigation, and page object orchestration patterns.
- **API Testing**: REST API validation, schema verification, and authentication handling.
- **Visual Testing**: Automated UI regression detection and baseline management.
- **Component Testing**: Isolated validation of UI components (React/Vue/Svelte).
- **Test Fixtures**: Shared state, resource management, and fixture composition.

### Domain-Specific Instructions (`.github/instructions/`)
Rules and guidelines used by AI agents to ensure high-quality automation:
- **Salesforce-Specific**: Lightning locator strategies, Shadow DOM handling, and Lightning-aware wait strategies.
- **Coding Guidelines**: Behavioral guidelines to reduce common automation mistakes.
- **Test Planning**: Structured approach to BVA, EP, and Decision Table design.

---

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Setup environment**
   Create a `.env` file with your credentials:
   ```env
   USER_NAME=your_salesforce_username
   PASSWORD=your_salesforce_password
   ```

3. **Run tests**
   ```bash
   npx playwright test
   ```

---

## Configuration

### Environment Variables
| Variable | Description | Default |
|----------|-------------|---------|
| `USER_NAME` | Salesforce Username | Required |
| `PASSWORD` | Salesforce Password | Required |
| `BASE_URL` | Application URL | `https://test.salesforce.com/` |

---

## Page Object Model

The framework supports two architectural styles:

### 1. Modern POM (`tests/pages/`)
Uses self-healing locators derived from AI exploration. Recommended for new stories.

**Example: `tests/pages/home-page.ts`**
```ts
export class HomePage {
  constructor(private page: Page) {}
  async navigateToLeads() {
    await this.page.getByRole('link', { name: 'Leads' }).click();
  }
}
```

### 2. Base-Class POM (`pages/`)
Traditional POM extending `playWrightBase` and using JSON-based locators.

**Example: `pages/leadPage.ts`**
```ts
import leadPageLoc from "../utils/pageLocators/leadPageLoc.json";
export default class leadPage extends playwrightBase {
  async clickNew() {
    await this.click(leadPageLoc.newLeadCreation);
  }
}
```

---

## Locators & Test Data (JSON)

- **Locators**: Stored in `utils/pageLocators/` to decouple selectors from code.
- **Test Data**: Stored in `utils/testData/` (global) or `tests/data/` (story-specific).

---

## Fixtures & Hooks

**`utils/fixtures/pageFixtures.ts`** provides:
- **Auto-Login**: Handles Salesforce authentication before tests.
- **Page Instances**: Automatically initializes Page Objects for your test.
- **Clean Sessions**: Ensures an isolated browser context for every test run.

---

## Running Tests

```bash
# Run all tests
npx playwright test

# Run specific story
npx playwright test tests/specs/lead/SF-02-create-lead.spec.ts

# Debug mode
npx playwright test --ui
```

---

## Troubleshooting

### Salesforce UI Issues
- **Shadow DOM**: Use AI Explorer to identify deep locators or preferred Playwright ARIA roles.
- **Lightning Waits**: Inherit from `playWrightBase` to use `waitForElementLoad`.
- **Unique Data**: Use `enterTextLastName` helper to append timestamps to unique fields.

