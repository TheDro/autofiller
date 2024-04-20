# Autofiller ✨

Adds auto-completion to the web.

## How to install

- Clone the project with `git clone https://github.com/TheDro/autofiller.git`
- In the terminal, run `npm install`
- Copy the contents of `.env.template.js` into `.env.js`
- Fill in your OpenAI API key
- Run `npm run build`
- In chrome, go to manage extensions.
- Enable developer mode.
- Click on "Load unpacked"
- Select the project's `dist` folder
- Enable the Autofiller extension

## How to use

When you focus on a textarea element, the element should become yellow. In this mode, it will only autocomplete from a static list of words. If you press "Ctrl+Q", it will enable autocompletions from OpenAI and the textarea element will become green.

## Upcoming features

- Support for input tags
- A menu to configure the list of static completions
- Fuzzy search for static completions
- A menu to configure your OpenAI API key
- Better support for dark mode

## How to develop

- Follow the steps above
- Run `npm run start`
