export function generateToken() {
    const crypto = window.crypto || window.msCrypto;
    const hash = crypto.getRandomValues(new Uint32Array(4)).join('-');

    return hash;
}