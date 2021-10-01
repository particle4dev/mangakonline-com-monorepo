const createSymbol = (name: string) => `components/BrowseContext/${name}`;

export const UPDATE_PATH = createSymbol('UPDATE_PATH');
export const INITIALIZING = createSymbol('INITIALIZING');
export const INITIALIZED = createSymbol('INITIALIZED');
