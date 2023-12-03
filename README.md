# OpenPress

OpenPress is a web application designed to enhance note-taking and article writing experiences. With a user-friendly interface and powerful features, OpenPress aims to provide a seamless platform for users to organize their thoughts, create detailed notes, and write compelling articles.

## Key Features

- **Intuitive Note Taking**: OpenPress offers a simple and intuitive note-taking interface, allowing users to quickly jot down their ideas and thoughts.
- **Rich Text Editing**: With OpenPress, users can format their notes and articles using a variety of styling options, including bold, italic, headings, lists, and more.
- **Collaboration**: OpenPress supports collaboration, enabling multiple users to work together on the same document in real-time, making it ideal for team projects or group discussions.
- **Tagging and Categorization**: Users can easily organize their notes and articles by assigning tags and categories, making it effortless to find and retrieve information later.

## Getting Started

To start using OpenPress, follow these steps:

1. Install the necessary dependencies by running `npm install` in the project directory.
2. Launch the development server by running `npm run dev`.
3. Access OpenPress in your web browser at `http://localhost:5173`.

For more information and customization options, refer to the [Vite Configuration Reference](https://vitejs.dev/config/).

## Requirements

- Node.js (v14 or higher)
- npm (v6 or higher)

## Contributing

We welcome contributions from the community! If you'd like to contribute to OpenPress, please refer to our [contribution guidelines](CONTRIBUTING.md) for more information.

## License

OpenPress is released under the [MIT License](LICENSE).

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
