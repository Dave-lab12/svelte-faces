> [!WARNING]  
> This package is not yet published and it needs a lot of work PR is appriciated ;).

## Svelte face
**This library provides functionalities for generating and manipulating avatars in Svelte applications.**

### Installation

To install the library, run:

```bash
npm install svelte-face
```

**or**

```bash
yarn add svelte-face
```

### Usage

1. **Import the library:**

```svelte
import { avatarGenerator } from 'svelte-face';
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
const pngDataUrl = await avatarGenerator.getPng(avatarElement);
```

- `pngDataUrl` will be a string containing the base64 encoded data URL of the avatar PNG image.

### Additional Notes

- Refer to the library code for detailed information about available functions and their parameters.
- This is a basic overview of usage. Consider exploring the library's source code and experimenting for a more comprehensive understanding of its capabilities.
