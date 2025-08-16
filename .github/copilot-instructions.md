# Copilot Instructions pour Portfolio Three.js

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Contexte du Projet

Ce portfolio utilise la stack moderne suivante :

- **React 18** avec TypeScript
- **Vite** pour le build rapide
- **Three.js** pour les effets 3D et shaders
- **Styled Components** pour le CSS-in-JS
- **GSAP** pour les animations performantes

## Guidelines de Développement

### Architecture

- Utiliser des composants fonctionnels React avec hooks
- Privilégier Styled Components pour tous les styles
- Organiser les shaders Three.js dans des fichiers séparés
- Utiliser GSAP pour toutes les animations UI

### Conventions

- Types TypeScript stricts pour Three.js et les props
- Nommage en PascalCase pour les composants
- Nommage en camelCase pour les hooks et variables
- Performance : optimiser les re-renders et les animations

### Three.js

- Utiliser `useFrame` de @react-three/fiber si disponible, sinon RAF
- Shaders en GLSL avec syntaxe moderne
- Gérer la mémoire GPU correctement (dispose des géométries/matériaux)

### Animations

- GSAP pour les timelines complexes
- Utiliser `gsap.set()` pour les états initiaux
- Préférer `transform` aux propriétés géométriques pour les performances
