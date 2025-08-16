# Contributing to Personal Expense Tracker

Thank you for considering contributing to the Personal Expense Tracker project! This document provides guidelines for contributing to the project.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct:
- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the community
- Show empathy towards other contributors

## How to Contribute

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates.

**Bug Report Template:**
- **Description**: A clear description of what the bug is
- **Steps to Reproduce**: Detailed steps to reproduce the issue
- **Expected Behavior**: What you expected to happen
- **Actual Behavior**: What actually happened
- **Environment**: OS, browser, Node.js version
- **Screenshots**: If applicable

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:
- **Clear title and description**
- **Use case**: Why would this enhancement be useful?
- **Alternatives considered**: Other solutions you've considered
- **Implementation ideas**: If you have ideas on how to implement

### Pull Requests

1. **Fork** the repository
2. **Clone** your fork locally
3. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
4. **Make** your changes
5. **Test** your changes thoroughly
6. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
7. **Push** to the branch (`git push origin feature/AmazingFeature`)
8. **Open** a Pull Request

### Development Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/expense-tracker.git
cd expense-tracker

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

### Coding Standards

#### TypeScript
- Use TypeScript for all new code
- Provide proper type definitions
- Avoid `any` types when possible

#### React/Next.js
- Use functional components with hooks
- Follow React best practices
- Use proper component naming (PascalCase)

#### Styling
- Use Tailwind CSS for styling
- Follow mobile-first responsive design
- Use semantic class names

#### API Design
- Follow RESTful conventions
- Use proper HTTP status codes
- Implement proper error handling
- Document API endpoints

### Commit Messages

Use conventional commit format:
```
type(scope): description

body (optional)

footer (optional)
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(auth): add password reset functionality
fix(api): handle database connection errors
docs(readme): update installation instructions
```

### Testing

- Write tests for new features
- Ensure existing tests pass
- Test in multiple browsers
- Verify mobile responsiveness

### Documentation

- Update README.md if needed
- Add JSDoc comments for functions
- Update API documentation
- Include examples in documentation

## Project Structure

```
expense-tracker/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   └── ...
├── components/            # React components
├── lib/                   # Utility functions
├── contexts/             # React contexts
├── hooks/               # Custom hooks
├── types/               # TypeScript type definitions
└── ...
```

## Review Process

1. **Automated checks** must pass (linting, tests)
2. **Code review** by maintainers
3. **Testing** on different browsers/devices
4. **Documentation** review if applicable

## Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes for significant contributions
- GitHub contributors page

## Questions?

Feel free to open an issue with the `question` label or contact the maintainers directly.

## License

By contributing to this project, you agree that your contributions will be licensed under the same license as the project (MIT License).

---

Thank you for contributing! 🚀
