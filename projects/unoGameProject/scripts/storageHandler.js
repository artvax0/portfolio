export const saveSettings = (settings) => {
    localStorage.setItem('settings', JSON.stringify(settings));
}

export const loadSettings = () => {
    return localStorage.getItem('settings');
}