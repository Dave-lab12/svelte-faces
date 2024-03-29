> [!WARNING]  
> This package highly experimental it needs a lot of work PR is appriciated :)

## Svelte face
**This library provides functionalities for generating and manipulating avatars in Svelte applications.**
It is heavly inspired by [notion avatar](https://notion-avatar.vercel.app/)
## Demo
![Screen Recording Mar 13](https://github.com/Dave-lab12/svelte-faces/assets/56738450/58f46d63-4e4c-4a11-960b-687d9e28a8af)


### Installation

To install the library, run:

```bash
npm install svelte-faces
```

```bash
yarn add svelte-faces
```
**or**

```bash
pnpm add svelte-faces
```

### Usage

1. **Import the library:**

```svelte
import { avatarGenerator } from 'svelte-faces';
```

2. **Initialize the avatar generator:**

It's recommended to initialize the library once in your application, potentially in a top-level component or a dedicated initialization service.

```svelte
await avatarGenerator.initialize();
```

3. **Generate feature options:**

- This retrieves options for customizing specific parts of the avatar.

```svelte
const featureOptions = avatarGenerator.getFeatureOptions(['hair', 'eyes', 'mouth']);
```

- `featureOptions` will be an array of objects, each containing:
    - `max`: The maximum number of styles available for that feature.
    - `parts`: An array of available options for that feature, including their SVG content and path information.

4. **Generate random avatar:**

```svelte
const randomConfig = await avatarGenerator.generateRandomAvatar();
```

- `randomConfig` will contain an object with keys corresponding to avatar parts and their corresponding chosen styles.

5. **Generate avatar preview:**

```svelte
const previewSvg = avatarGenerator.generatePreview(randomConfig);
```

- Replace `randomConfig` with your desired avatar configuration object.
- `previewSvg` will be a string containing the SVG code for the generated avatar preview.

6. **Get PNG of avatar:**

```svelte
const avatarElement = document.getElementById('my-avatar'); // Replace with your element ID
const pngDataUrl = await avatarGenerator.getPng({ element: avatarElement, width: 150, height: 175 });
```

- `pngDataUrl` will be a string containing the base64 encoded data URL of the avatar PNG image.

## Assets

- Illustration designer: [@Felix Wong](https://www.producthunt.com/@felix12777) on ProductHunt
- Pack of illustrations: [Noto avatar](https://abstractlab.gumroad.com/l/noto-avatar)
- Assets licensed under [CC0](https://creativecommons.org/publicdomain/zero/1.0/) <img src="./public/icon/cc0.svg" width="50"/>

### Additional Notes

- Refer to the library code for detailed information about available functions and their parameters.
- This is a basic overview of usage. Consider exploring the library's source code and experimenting for a more comprehensive understanding of its capabilities.
